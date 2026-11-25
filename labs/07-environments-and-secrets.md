# Lab 7 — Environments, secrets, and approvals

**Goal:** gate a simulated deployment with environments, environment secrets and variables, and a required reviewer.

**Workflow:** `.github/workflows/07-deploy-environments.yml`

> Use dummy values only. This lab never deploys anything.

## 1. Run before configuring anything

Go to **Actions → Lab 7 · Deploy with environments → Run workflow**.
GitHub creates the `staging` environment automatically, and `deploy-staging` fails with
`DEPLOY_TOKEN is not set for the staging environment`.

## 2. Configure the environments

In **Settings → Environments**:

1. **staging**
   - Add the secret `DEPLOY_TOKEN` = `staging-dummy-token`.
   - Add the variable `TARGET_NAME` = `staging-cluster`.
2. **production** (create it with **New environment**)
   - Add the secret `DEPLOY_TOKEN` = `production-dummy-token`.
   - Add the variable `TARGET_NAME` = `production-cluster`.
   - Enable **Required reviewers** and add yourself.
   - Optionally, under **Deployment branches and tags**, allow only `main`.

## 3. Run again

1. Start a new run. `deploy-staging` passes. In its log, the token appears as `***` because GitHub masks secrets.
2. `deploy-production` waits with **Review deployments**. Approve it and the job runs.
3. Open the repository home page and select **Deployments** to see both environments and their URLs.

## 4. Discuss

- Why does the same secret name resolve to different values in each job?
- Why is `cancel-in-progress` set to `false` for deployments?
- What does the workflow-level `permissions: contents: read` prevent?

Reference: [Managing environments for deployment](https://docs.github.com/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
