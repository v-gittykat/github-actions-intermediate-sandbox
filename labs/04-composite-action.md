# Lab 4 — Composite actions

**Goal:** package several steps as one action with inputs, outputs, and conditional steps.

**Action:** `.github/actions/setup-and-test/action.yml` (used by the reusable workflow in Lab 3)

## 1. Read the action

- `runs.using: composite` defines a composite action.
- Every `run` step must declare `shell`.
- The **Install test dependencies** step uses
  `if: ${{ inputs.install-dependencies == 'true' }}`. Composite steps support `if` conditionals.
- The action output `result-line` reads the output of the step with `id: pytest`.

## 2. Use the conditional

1. In `.github/workflows/reusable-python-tests.yml`, add `install-dependencies: "false"`
   under the composite action's `with:`.
2. Run **Lab 3-4** again. The install step is skipped, and pytest fails because it is not installed.
3. Remove the line and run again to recover.

## 3. Composite action or reusable workflow?

| | Composite action | Reusable workflow |
|---|---|---|
| Unit | Steps inside a job | Whole jobs |
| Choose the runner | No (runs in the caller's job) | Yes |
| Use environments and secrets directly | No, pass them as inputs | Yes |
| Shows separate jobs in the run graph | No | Yes |

References:
[Creating a composite action](https://docs.github.com/actions/tutorials/create-actions/create-a-composite-action) ·
[Metadata syntax — `runs.steps[*].if`](https://docs.github.com/actions/reference/workflows-and-actions/metadata-syntax)
