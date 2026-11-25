# GitHub Actions Intermediate — Delivery Sandbox

Hands-on sandbox for the **GitHub Actions Intermediate** Expert Services offering.
It builds on GitHub Actions Fundamentals: learners already know how to write a single-job
CI workflow, read logs, and fix a failed step.

> Training material only. The deployments in Lab 7 are simulated and the `DEPLOY_TOKEN`
> secret must hold a dummy value. Never store real credentials in this repository.

## Get started

1. Select **Use this template → Create a new repository** and create a copy in your own account
   (public, so that environments work on every plan).
2. Open the **Actions** tab and enable workflows if prompted.
3. Follow the labs in order.

## Labs

| Lab | Topic | Workflow / action |
|---|---|---|
| [1](labs/01-matrix-and-concurrency.md) | Matrix builds, conditionals, concurrency | `.github/workflows/01-matrix-ci.yml` |
| [2](labs/02-cache-and-artifacts.md) | Dependency caching and artifacts between jobs | `.github/workflows/01-matrix-ci.yml` |
| [3](labs/03-reusable-workflows.md) | Reusable workflows with inputs and outputs | `.github/workflows/reusable-python-tests.yml`, `03-call-reusable.yml` |
| [4](labs/04-composite-action.md) | Composite actions | `.github/actions/setup-and-test/` |
| [5](labs/05-javascript-action.md) | JavaScript actions | `.github/actions/job-summary/`, `05-javascript-action.yml` |
| [6](labs/06-automate-issue-triage.md) | Automating repository tasks with `GITHUB_TOKEN` | `.github/workflows/06-issue-triage.yml` |
| [7](labs/07-environments-and-secrets.md) | Environments, secrets, approvals, least privilege | `.github/workflows/07-deploy-environments.yml` |

## Project layout

```text
inventory/            Small Python package used by every lab
tests/                pytest suite
data/inventory.json   Input for the JavaScript action
.github/workflows/    Lab workflows
.github/actions/      Local composite and JavaScript actions
```

Run the tests locally with:

```bash
python -m pip install -r requirements-dev.txt
python -m pytest -v
```

## Security conventions used in every workflow

- Third-party actions are pinned to a full commit SHA with the version in a comment.
- `permissions` is set explicitly and kept to the minimum each workflow needs.
- `actions/checkout` uses `persist-credentials: false` when the job does not push.
- Untrusted values (for example issue titles) are passed through `env`, never interpolated into `run` scripts.
- Dependabot keeps action and pip versions up to date.

## Reset the sandbox

Delete your copy and create a new one from the template. To clean up only Lab 6 and 7
artifacts, close the test issues and delete the `staging` and `production` environments.
