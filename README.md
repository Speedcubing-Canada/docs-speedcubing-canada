# docs-speedcubing-canada

Source repository for Speedcubing Canada governance and policy documents.

Markdown files are stored in `public/src` and generated PDFs are stored in `public/pdf`.

## How this works

When a markdown document is updated in GitHub, two workflows run automatically:

### PDF Generation (`.github/workflows/generate-pdfs.yml`)
1. Detects which files changed in `public/src`.
2. Regenerates only the matching PDFs in `public/pdf`.
3. Commits the updated PDF files back to the repository.

### PDF Sync to Website (`.github/workflows/sync-pdf.yml`)
After PDF generation completes successfully, this workflow automatically:
1. Detects which PDFs were updated.
2. Copies them to the [speedcubing-canada-web](https://github.com/Speedcubing-Canada/speedcubing-canada-web) repository.
3. Updates the documents registry (`documents.ts`) with any new documents.
4. Opens a pull request on the website repository for review and merging.

This means board members can edit documents directly in the GitHub web interface, and changes automatically propagate to the public website—no terminal needed.


## Board member guide (no command line)

1. Open the file to edit in `public/src`.
2. Click the pencil icon in GitHub to edit.
3. Make your changes in markdown.
4. Scroll down and choose to commit directly to the current branch, or create a new branch and open a pull request.
5. Save your commit.

After the commit, GitHub Actions will run and update the corresponding PDF file(s) in `public/pdf` automatically.

## Checking that workflows completed

### PDF Generation
1. Open the repository `Actions` tab.
2. Open the latest run named `Generate PDFs`.
3. Confirm the job completed successfully.

If no markdown files changed, the workflow will skip PDF commits.

### Website Sync
After `Generate PDFs` succeeds, `Sync PDFs to website` will automatically run:
1. In the `Actions` tab, look for the `Sync PDFs to website` run.
2. Confirm it completed successfully.
3. Check the [speedcubing-canada-web](https://github.com/Speedcubing-Canada/speedcubing-canada-web) repository for a new pull request with the updated documents.


## Notes for maintainers

### PDF Generation Workflow (`.github/workflows/generate-pdfs.yml`)
- Runs on pushes that modify `public/src/**/*.md`, `styles/**/*.css`, or workflow/config files.
- Can be run manually from the `Actions` tab using `workflow_dispatch`.
- PDF generation is powered by `md-to-pdf` with HTML5 Boilerplate styling.
- Skips execution if the committer is the bot (to avoid infinite loops).

### Website Sync Workflow (`.github/workflows/sync-pdf.yml`)
- Triggered automatically after `Generate PDFs` completes successfully.
- Requires `BOT_PAT` secret (GitHub Personal Access Token with repo and workflow permissions).
- Opens pull requests on the website repository; new documents are added to `minutes` by default and should be recategorized before merging.
- If no PDFs changed, the sync workflow is skipped automatically.
