Audit the recent commits and ensure none are co-authored by Claude. Fix any that are. Then verify the Husky commit-msg hook is in place so it can't happen again.

## Steps

### 1. Check the Husky hook

Verify `.husky/commit-msg` exists and contains the strip line:

```sh
cat .husky/commit-msg
```

Expected output should include:

```
sed -i '/Co-Authored-By:.*[Cc]laude/d' "$1"
```

If it's missing or wrong, recreate the file with exactly:

```sh
#!/usr/bin/env sh
# Strip Co-Authored-By: Claude lines from commit messages
sed -i '/Co-Authored-By:.*[Cc]laude/d' "$1"
```

### 2. Audit recent commits

Check the last 20 commits for any Co-Authored-By Claude lines:

```sh
for hash in $(git log --format='%H' -20); do
  if git log -1 --format='%B' "$hash" | grep -qi 'Co-Authored-By.*claude'; then
    echo "FOUND: $(git log -1 --oneline $hash)"
  fi
done
```

### 3. Fix any commits found

If the affected commits are all on the current branch (not yet merged to main):

```sh
git filter-branch --force --msg-filter 'grep -vi "Co-Authored-By.*claude" || true' <first-bad-hash>^..HEAD
git push --force origin <branch>
```

If they're already on the main branch, report them to the user — rewriting merged history requires coordination.

### 4. Report

Tell the user:

- Whether the hook is correctly installed
- How many commits were found and fixed
- Whether a force push was needed
