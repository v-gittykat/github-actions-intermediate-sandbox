# Lab 6 — Automate a repository task

**Goal:** replace a manual triage task with a workflow that uses `GITHUB_TOKEN` and the GitHub CLI.

**Workflow:** `.github/workflows/06-issue-triage.yml`

## 1. Read the workflow

- Triggered by `issues: opened`, and manually through `workflow_dispatch` for re-triage.
- `permissions: issues: write` is the only permission granted. Every other scope is `none`.
- `GH_TOKEN: ${{ github.token }}` lets `gh` authenticate with the job's `GITHUB_TOKEN`,
  a GitHub App installation token that expires when the job finishes. It is **not** a personal access token.
- The issue title is passed through `env` (`TITLE`) instead of being inserted into the script.
  This prevents script injection from untrusted input.

## 2. Run it

1. Open a new issue titled `Low stock on KB-01`.
2. Within a minute, the issue receives the `needs-triage` and `stock` labels and a comment from `github-actions[bot]`.
3. Open another issue titled `Typo in README`. It only receives `needs-triage`.

## 3. Least privilege in practice

Change `issues: write` to `issues: read` and open another issue.
The **Label and acknowledge** step fails with `Resource not accessible by integration`.
Restore `issues: write`, then use **Run workflow** with that issue number to triage it again.

References:
[GITHUB_TOKEN](https://docs.github.com/actions/concepts/security/github_token) ·
[Script injections](https://docs.github.com/actions/concepts/security/script-injections)
