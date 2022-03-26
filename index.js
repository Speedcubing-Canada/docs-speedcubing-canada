const markdownpdf = require("markdown-pdf");

const type = process.argv[2];
const file = process.argv[3];

const fromPath = `./${type}/src/${file}.md`;
const toPath = `./${type}/pdf/${file}.pdf`;

markdownpdf({
  remarkable: {
    html: true,
  },
})
  .from(fromPath)
  .to(toPath);
