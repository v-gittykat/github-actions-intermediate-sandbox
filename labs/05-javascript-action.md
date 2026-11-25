# Lab 5 — JavaScript actions

**Goal:** understand how a JavaScript action reads inputs, writes outputs, adds annotations, and fails a step.

**Files:** `.github/actions/job-summary/` and `.github/workflows/05-javascript-action.yml`

## 1. Read the action

- `runs.using: node24` and `main: index.js` tell the runner to execute the file with Node.js.
- Inputs arrive as `INPUT_<NAME>` environment variables. This action reads them directly,
  so it has no dependencies and no `node_modules` to commit.
  Larger actions usually use the [`@actions/core`](https://github.com/actions/toolkit) package.
- Outputs and the job summary are written to the files in `GITHUB_OUTPUT` and `GITHUB_STEP_SUMMARY`.
- `::warning::` and `::error::` lines become annotations.
- Setting `process.exitCode = 1` fails the step.

## 2. Run it

1. Go to **Actions → Lab 5 · JavaScript action → Run workflow** with `fail-on-low-stock` unchecked.
2. The run passes with a **Low stock** warning annotation and an inventory table in the summary.
3. The **React to the action output** step runs because `low-stock-count` is not `0`.

## 3. Make it fail

1. Run the workflow again with `fail-on-low-stock` checked.
2. The step fails with a **Low stock** error annotation that lists `KB-01`.
3. Edit `data/inventory.json` so that `KB-01` has `quantity` 10 and commit to `main`.
   The `push` trigger starts a new run, which passes with no annotations.

Reference: [Creating a JavaScript action](https://docs.github.com/actions/tutorials/create-actions/create-a-javascript-action)
