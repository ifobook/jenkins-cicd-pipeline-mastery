# Jenkins CI/CD Pipeline Mastery

A DevOps learning project demonstrating Continuous Integration and pipeline-as-code using Jenkins, GitHub, Node.js 24 LTS, Express.js, and Docker.

## Project Overview

This project automates application checkout, dependency installation, build validation, automated testing, security auditing, and artifact packaging.

## Technology Stack

- Jenkins 2.580.2
- Docker and Docker Compose
- Node.js 24 LTS
- Express.js
- Git and GitHub
- npm

## Project Structure

- `src/app.js` - Express application
- `tests/app.test.js` - Automated tests
- `Jenkinsfile` - Declarative CI/CD pipeline
- `compose.yaml` - Jenkins Docker configuration
- `package.json` - Application metadata and scripts
- `package-lock.json` - Locked dependencies
- `.nvmrc` - Node.js version
- `screenshots/` - Execution evidence
- `docs/` - Additional documentation

## Jenkins Installation

Jenkins was installed locally using Docker Compose.

Start Jenkins:

    docker compose up -d

Verify Jenkins:

    docker compose ps

View logs:

    docker compose logs --tail=50 jenkins

Access Jenkins at:

http://localhost:8080

A persistent Docker volume stores Jenkins configuration and build history.

## Jenkins Plugins and Tools

The following plugins support the pipeline:

- Pipeline
- Git
- GitHub
- Credentials
- NodeJS

Node.js 24 LTS was configured under Manage Jenkins > Tools with the name `NodeJS-24`.

The NodeJS plugin automatically installs the required Node.js runtime for pipeline execution.

## GitHub Integration

Repository:

https://github.com/ifobook/jenkins-cicd-pipeline-mastery

Jenkins job configuration:

- Job type: Pipeline
- Definition: Pipeline script from SCM
- SCM: Git
- Branch: `*/main`
- Script path: `Jenkinsfile`
- Repository access: Public HTTPS

Automatic build triggering uses SCM polling:

    H/5 * * * *

Jenkins checks for changes and starts a build when new commits are detected.

## Pipeline Stages

### Checkout

Retrieves the application source code from GitHub.

### Build

Runs:

    npm ci
    npm run build

### Test

Runs:

    npm test

Three automated tests validate the homepage, health endpoint, and HTTP 404 handling.

The pipeline fails if tests fail.

### Security Audit

Runs:

    npm audit --audit-level=high

The pipeline fails for dependency vulnerabilities meeting the configured severity threshold.

### Deploy / Artifact

Runs:

    npm pack --pack-destination artifacts

Jenkins archives the generated npm package for download.

This stage simulates deployment through artifact generation rather than deploying to a production server.

## Local Development

Activate Node.js 24:

    nvm use

Install dependencies:

    npm ci

Run the application:

    npm start

Build validation:

    npm run build

Run tests:

    npm test

Application URL:

http://localhost:3000

Health endpoint:

http://localhost:3000/health

## Verification Results

- Jenkins successfully installed and configured
- GitHub repository integrated with Jenkins
- Declarative Jenkinsfile executed successfully
- Build stage passed
- Three automated tests passed
- Security audit passed
- Deploy/artifact stage passed
- Jenkins Build #1 completed successfully
- Jenkins Build #2 completed successfully
- Artifact generated: `jenkins-cicd-pipeline-mastery-1.0.0.tgz`

## Challenges and Solutions

### Node.js Version Selection

Node.js 24 LTS was selected for its long-term support and stability.

The local development environment was updated to Node.js 24, matching the Jenkins tool configuration.

### Jenkins Running Inside Docker

The Jenkins container cannot automatically access Node.js installed on the MacBook.

The Jenkins NodeJS plugin was configured to provide the runtime inside Jenkins.

### Automatic GitHub Integration

Because Jenkins runs locally, GitHub cannot directly deliver webhooks without additional network configuration.

SCM polling was configured as the automatic build trigger.

## Screenshots

- [Jenkins Dashboard](screenshots/jenkins-dashboard.png)
- [Successful Pipeline](screenshots/jenkins-pipeline-success.png)
- [Automatic SCM Trigger](screenshots/jenkins-scm-trigger.png)
- [Archived Artifact](screenshots/jenkins-artifact.png)

## Conclusion

This project demonstrates a working Jenkins CI/CD pipeline integrating source control, automated builds, testing, security checks, and artifact packaging.
