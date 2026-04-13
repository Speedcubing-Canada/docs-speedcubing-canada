# docs-speedcubing-canada

Source repository for Speedcubing Canada governance and policy documents.

Markdown files are stored in `public/src` and generated PDFs are stored in `public/pdf`.

## How this works

When a markdown document is updated in GitHub, the workflow in `.github/workflows/generate-pdfs.yml` automatically:

1. Detects which files changed in `public/src`.
2. Regenerates only the matching PDFs in `public/pdf`.
3. Commits the updated PDF files back to the same branch.

This means board members can edit documents directly in the GitHub web interface and do not need to use a terminal.

## Board member guide (no command line)

1. Open the file to edit in `public/src`.
2. Click the pencil icon in GitHub to edit.
3. Make your changes in markdown.
4. Scroll down and choose to commit directly to the current branch, or create a new branch and open a pull request.
5. Save your commit.

After the commit, GitHub Actions will run and update the corresponding PDF file(s) in `public/pdf` automatically.

## Checking that PDF generation completed

1. Open the repository `Actions` tab.
2. Open the latest run named `Generate PDFs`.
3. Confirm the job completed successfully.

If no markdown files changed, the workflow will skip PDF commits.

## Notes for maintainers

- The workflow runs on pushes that modify `public/src/**/*.md`.
- You can also run it manually from the `Actions` tab using `workflow_dispatch`.
- PDF generation is powered by `md-to-pdf` with HTML5 Boilerplate styling.
