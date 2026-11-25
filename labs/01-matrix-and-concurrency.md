# Lab 1 — Matrix builds, conditionals, and concurrency

**Goal:** run the same tests across several operating systems and Python versions,
control which combinations run, and prevent redundant runs.

**Workflow:** `.github/workflows/01-matrix-ci.yml`

## 1. Read the matrix

Open the workflow and find `strategy.matrix`:

- `os` × `python-version` creates 6 combinations.
- `exclude` removes `windows-latest` + `3.12`, leaving 5 jobs.
- `include` adds the `publish-report: true` property to the existing `ubuntu-latest` + `3.14` job.
  It does not create a new job, because that combination already exists.
- `fail-fast: false` keeps the other jobs running when one fails.

## 2. Run it

1. Go to **Actions → Lab 1-2 · Matrix CI with cache and artifacts → Run workflow**.
2. Confirm that 5 `test` jobs appear, each named after its matrix values.

## 3. Observe a matrix failure

1. Create a branch named `lab1-failure`.
2. In `inventory/stock.py`, change `<=` to `<` in `low_stock`.
3. Commit and open a pull request into `main`.
4. All 5 jobs fail on `test_low_stock_uses_reorder_level`, and the others still finish because `fail-fast` is `false`.
5. Revert the change and push. A new run passes.

## 4. Observe concurrency

1. Push two commits to the same pull request branch within a few seconds.
2. The first run is **cancelled** because both runs share the group
   `${{ github.workflow }}-${{ github.ref }}` and `cancel-in-progress: true`.

## 5. Conditionals

Find the two `if:` expressions in the workflow:

- `if: ${{ always() && matrix.publish-report }}` uploads the report even after failed tests, but only from one job.
- `if: ${{ always() }}` on the `report` job runs the summary even when a matrix job fails.

**Check your understanding:** what would happen to the `report` job without `always()` after a failed test?

References:
[Running variations of jobs in a workflow](https://docs.github.com/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations) ·
[Control the concurrency of workflows and jobs](https://docs.github.com/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency) ·
[Expressions](https://docs.github.com/actions/reference/workflows-and-actions/expressions)
