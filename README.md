[![LinkedIn](https://img.shields.io/badge/LinkedIn-devmuniz-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/devmuniz)
[![GitHub Profile](https://img.shields.io/badge/GitHub-devMuniz02-181717?logo=github&logoColor=white)](https://github.com/devMuniz02)
[![Portfolio](https://img.shields.io/badge/Portfolio-devmuniz02.github.io-0F172A?logo=googlechrome&logoColor=white)](https://devmuniz02.github.io/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-manu02-FFD21E?logoColor=black)](https://huggingface.co/manu02)

# devMuniz02.github.io

This repository contains the source for my personal GitHub Pages portfolio:

https://devmuniz02.github.io/

It is not a reusable package, application framework, or ML training project. Its job is to present selected projects from my GitHub profile in a polished static portfolio page.

## What This Repo Does

- Hosts the static portfolio page through GitHub Pages.
- Renders project sections for research, trading, robotics, and active work.
- Loads generated project metadata from `data.json`.
- Uses `.github/workflows/update_data.yml` to refresh repository data from GitHub.
- Displays preview media from other repos when those repos expose supported files in a top-level `assets/` directory.

## Main Files

| Path | Description |
| --- | --- |
| `index.html` | The complete static portfolio page: markup, styles, and client-side rendering logic. |
| `data.json` | Generated project metadata consumed by the portfolio. |
| `config.local.json` | Portfolio configuration, repo filters, and project skill mappings. |
| `.github/workflows/update_data.yml` | GitHub Actions workflow that refreshes `data.json`. |
| `assets/` | Optional portfolio-only media. Project previews should usually live in each project repo. |

## Project Media Contract

The update workflow currently scans each public, non-fork GitHub repo for media in:

```text
assets/
```

Supported media extensions:

```text
.png
.jpg
.jpeg
.gif
.webp
.mp4
.webm
```

The portfolio displays the first fetched asset for each listed project. For predictable previews, project repos should name their primary media first, for example:

```text
assets/
  00-preview.mp4
  01-screenshot.png
```

Videos are rendered muted, inline, autoplaying, and looping.

## Local Preview

Because the page fetches local JSON and media, preview it with a static server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Data Refresh

The GitHub Action can be run manually from the Actions tab, or automatically on its schedule. It uses `GH_PAT` to call the GitHub API, fetch repositories for `devMuniz02`, collect topics and supported media from `assets/`, then commit the refreshed `data.json`.

## Notes

- Keep this repo focused on the portfolio page itself.
- Do not commit private datasets, model weights, credentials, or large generated artifacts.
- Put project-specific code, experiments, and training assets in their own repositories, then expose only small portfolio preview media through each repo's `assets/` folder.
