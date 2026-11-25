# Lab 3 — Reusable workflows

**Goal:** call a workflow from another workflow, pass inputs, and read its outputs.

**Files:** `.github/workflows/reusable-python-tests.yml` (called) and
`.github/workflows/03-call-reusable.yml` (caller)

## 1. Read the called workflow

- `on: workflow_call` makes it reusable.
- `inputs` declares `python-version` and `test-path` with defaults.
- `outputs.result-line` maps a **job** output to a **workflow** output:
  step output → job output → workflow output.

## 2. Call it

1. Go to **Actions → Lab 3-4 · Call a reusable workflow → Run workflow** and pick a Python version.
2. In the run graph, the job appears as `run-tests / tests`, which shows a reusable workflow call.
3. Open the `use-output` job. It prints the last pytest line received from the reusable workflow.

## 3. Change an input

Edit the caller to pass `test-path: tests` explicitly, then run it again.
Try a folder that does not exist and read the error in the logs.

**Remember:** a caller job that uses `uses:` cannot also have `steps` or `runs-on`.
Secrets are not passed automatically; use `secrets: inherit` or declare them under `workflow_call.secrets`.

Reference: [Reuse workflows](https://docs.github.com/actions/how-tos/reuse-automations/reuse-workflows)
