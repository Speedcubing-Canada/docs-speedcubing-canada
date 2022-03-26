const markdownpdf = require("markdown-pdf");

const documents = [
  {
    type: "public",
    documents: ["by-laws"],
  },
  {
    type: "internal",
    documents: [],
  },
];

documents.forEach(({ type, documents }) => {
  const fromPaths = documents.map((d) => `./${type}/src/${d}.md`);
  const toPaths = documents.map((d) => `./${type}/pdf/${d}.pdf`);
  markdownpdf({
    remarkable: {
      html: true,
    },
  })
    .from(fromPaths)
    .to(toPaths);
});
