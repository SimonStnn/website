Review the current git diff and update any documentation that has become stale.

## Steps

1. Run `git diff HEAD~1 --name-only` (or `git diff --name-only` for unstaged) to identify which source files changed.

2. For each changed source file, determine which docs are affected using this mapping:

   | Changed area                               | Docs to check                                                                                                                    |
   | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
   | `components/consent/`                      | `docs/02-features/16-consent-system.md`, `docs/06-guides/07-privacy-compliance.md`, `docs/02-features/01-components-overview.md` |
   | `components/meta/analytics.tsx`            | `docs/06-guides/seo/04-analytics.md`, `AGENTS.md`                                                                                |
   | `components/layout/`                       | `docs/02-features/13-layout-components.md`                                                                                       |
   | `app/layout.tsx`                           | `docs/02-features/01-components-overview.md`, `docs/06-guides/seo/04-analytics.md`                                               |
   | `lib/config.ts`                            | `docs/04-development/03-environment-variables.md`, `docs/06-guides/utilities/02-config-library.md`                               |
   | `lib/projects.ts` or `lib/achievements.ts` | `docs/03-content/04-data-fetching.md`                                                                                            |
   | `content/` schemas                         | `docs/03-content/02-json-schema.md`, `docs/03-content/03-typescript-interfaces.md`                                               |
   | `app/` new page                            | `docs/01-architecture/04-routing-navigation.md`                                                                                  |
   | `components/` new component                | `docs/02-features/01-components-overview.md`                                                                                     |
   | `Dockerfile` or `docker-compose.yml`       | `docs/05-deployment/`                                                                                                            |
   | `.github/workflows/`                       | `docs/05-deployment/04-ci-cd.md`                                                                                                 |
   | `AGENTS.md`                                | Verify it still accurately describes all key patterns                                                                            |

3. Read each affected doc and compare it against the current source code.

4. For each doc that is out of date:
   - Update code examples to match current implementation
   - Update directory trees to include new files
   - Update description text to reflect actual behaviour
   - Update the **Last Updated** date at the bottom

5. If a new component directory, feature, or guide is added with no existing doc, create one following the format of a nearby existing doc (same breadcrumb header, table of contents, and footer pattern).

6. After all edits, run a final check: does `AGENTS.md` still accurately describe the key patterns listed under "Code Patterns"? Update if not.

## Rules

- Only update what is actually stale — do not rewrite docs that are still accurate.
- Keep code examples in docs in sync with real code, not illustrative pseudocode.
- Do not add hypothetical future sections; document what exists now.
- If you add a new doc file, also add a link to it from `docs/02-features/01-components-overview.md` or the appropriate index.
