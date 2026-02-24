## Release Process

This document describes the steps required to create a new release of ESN.  Releases are tagged versions of the codebase accompanied by release notes and built artifacts (Docker images, compiled apps).

### Versioning Scheme

ESN uses [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH) for all published packages and services.  Pre‑1.0.0 versions may increment the minor version for breaking changes.

### Release Steps

1. **Prepare a Release Branch**
   - Create a branch off `main` named `release/x.y.z`.
   - Update the `CHANGELOG.md` with a new section for the version, summarizing features, fixes, and breaking changes.
   - Bump version numbers in `pyproject.toml`, `package.json`, and any other relevant files.

2. **Run Full Test Suite**
   - Ensure the CI pipeline passes on the release branch.
   - Run additional manual checks if necessary (e.g., verifying the dashboard builds correctly in production mode).

3. **Tag the Release**
   - Once tests pass and approvals are obtained, create an annotated Git tag:

     ```bash
     git tag -a vX.Y.Z -m "Release X.Y.Z"
     git push origin vX.Y.Z
     ```

4. **Build and Publish Artifacts**
   - Use the `build-and-push.yml` GitHub Action to build Docker images and publish them to the container registry.
   - Publish NPM packages or Python packages if applicable.

5. **Create a GitHub Release**
   - Draft a release on GitHub with the tag created above.
   - Include the same release notes from `CHANGELOG.md`.
   - Attach any compiled assets (e.g., Android APK, iOS IPA) as release binaries.

6. **Update Documentation**
   - Ensure that `docs` references the new version where applicable.
   - Close or merge the release branch back into `main` once finished.

### Hotfixes

For critical bug fixes, branch off the tag you need to patch (e.g., `vX.Y.Z`) and release a new patch version (e.g., `vX.Y.(Z+1)`).  Only include the necessary fixes and update the changelog accordingly.