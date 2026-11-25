# Lab 2 — Dependency caching and artifacts

**Goal:** speed up repeated runs with a cache and pass files between jobs with artifacts.

**Workflow:** `.github/workflows/01-matrix-ci.yml` (same as Lab 1)

## 1. Cache keys

Find the **Cache pip downloads** step:

```yaml
key: pip-${{ runner.os }}-py${{ matrix.python-version }}-${{ hashFiles('requirements-dev.txt') }}
restore-keys: |
  pip-${{ runner.os }}-py${{ matrix.python-version }}-
```

- The key changes whenever `requirements-dev.txt` changes.
- `restore-keys` allows a partial match, so an older cache can still be reused.

## 2. Miss, then hit

1. Open the logs of your previous Lab 1 run. **Cache pip downloads** reports that no cache was found,
   and **Post Cache pip downloads** saves a new one.
2. Run the workflow again. The step now reports **Cache restored from key**.
3. Open **Actions → Caches** to see one cache per OS/Python combination.

## 3. Artifacts between jobs

1. Open the run summary and scroll to **Artifacts**. Download `junit-report`.
2. Open the `report` job. It uses `actions/download-artifact` to read the file
   produced by another job, then writes a table to the job summary.

**Cache or artifact?** A cache reuses files across runs to save time.
An artifact keeps a file produced by a run so that later jobs or people can use it.

References:
[Dependency caching reference](https://docs.github.com/actions/reference/workflows-and-actions/dependency-caching) ·
[Store and share data with workflow artifacts](https://docs.github.com/actions/tutorials/store-and-share-data)
