const { mdToPdf } = require("md-to-pdf");
const fs = require("fs");
const path = require("path");

const type = process.argv[2];
const file = process.argv[3];

const fromPath = `./${type}/src/${file}.md`;
const toPath = `./${type}/pdf/${file}.pdf`;

if (!type || !file) {
  console.error("Usage: node index.js <type> <file-name-without-extension>");
  process.exit(1);
}

function documentTitle() {
  const [, heading, date] =
    fs.readFileSync(fromPath, "utf8").match(/^# (.+)\s*(?:Date: (.+))?/m) || [];
  if (!heading) return file[0].toUpperCase() + file.slice(1);
  const title = date ? `${heading.trim()} (${date.trim()})` : heading.trim();
  return title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

async function generatePdf() {
  const result = await mdToPdf(
    { path: fromPath },
    {
      dest: toPath,
      // Without an explicit title, md-to-pdf titles the PDF with a localhost URL
      document_title: documentTitle(),
      marked_options: {
        gfm: true,
        breaks: true,
      },
      stylesheet: [
        path.resolve("node_modules/html5-boilerplate/dist/css/style.css"),
        path.resolve("styles/pdf-markdown-h5bp.css"),
      ],
      page_media_type: "screen",
      pdf_options: {
        format: "a4",
        printBackground: true,
        margin: {
          top: "21mm",
          right: "20mm",
          bottom: "20mm",
          left: "19mm",
        },
      },
      launch_options: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    }
  );

  if (!result) {
    throw new Error(`Failed to generate PDF for ${fromPath}`);
  }
}

generatePdf().catch((error) => {
  console.error(error);
  process.exit(1);
});
