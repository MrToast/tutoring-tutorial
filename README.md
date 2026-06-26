# Tutoring Tutorial

Chapter 0 of a microservices and Kubernetes tutorial site.

This app runs on **Java 17+** and uses a Spring Boot backend with a TypeScript frontend.
The chapter content lives in `src/main/resources/tutorial/guide.json`.

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

Each chapter can be recreated from source by checking out its Git tag and rebuilding locally:

```bash
git checkout chapter-0-launch
make dev
```

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
