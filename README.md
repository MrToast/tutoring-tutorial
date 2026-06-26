# Tutoring Tutorial

Chapter 0 of a microservices and Kubernetes tutorial site.

This app runs on **Java 17+** and uses a Spring Boot backend with a TypeScript frontend.
The chapter content lives in `src/main/resources/tutorial/guide.json`.
It is meant for self-paced, step-by-step recreation from a clone of the repository.
Chapter 0 is complete when the page renders, the roadmap and tags are visible, and `make dev` works from a fresh clone.
Chapter 1 is the next step and introduces the first real service boundary.

## Requirements

- Linux or macOS
- Git
- Java 17+
- Node.js with npm
- Docker
- make

Windows is left as an exercise to the reader.

## What it shows

- the full chapter roadmap
- reference Git, Docker, and Kubernetes tags for each chapter
- semantic version checkpoints that advance by chapter
- comparison guidance so you can line up your own work against the tutorial checkpoints
- a clone-first workflow for learners who want to rebuild each checkpoint locally

## Run locally

```bash
make dev
```

Or run the steps manually:

```bash
cd /Users/jsandy/jsandy-projects/tutoring-tutorial/frontend
npm install
npm run build
```

```bash
cd /Users/jsandy/jsandy-projects/tutoring-tutorial
./gradlew bootRun
```

Open http://localhost:8080

## Build from source

Each chapter can be recreated from source by cloning the repo and rebuilding locally:

```bash
git clone <repo-url>
git checkout -b ch0 ch0-v0.1.0
make dev
```

If you want to push your own chapter work to GitHub, fork the repository first and point your clone at the fork. From there, create each later chapter branch from the previous chapter tag and tag your own checkpoint before moving on.

## Docker

```bash
docker compose up --build
```

## Chapter tags

Each chapter includes three reference tags:

- `git`: source checkpoint
- `docker`: container image checkpoint
- `kubernetes`: deployment checkpoint

The API also exposes a semver baseline so future chapters can bump versions without breaking the comparison model.
