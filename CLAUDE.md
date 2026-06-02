# Claude Notes

## Deployed previews

After pushing to a PR branch, the changes are deployed (after a short delay) at:

```
https://tools.bobwhitelock.co.uk/pr-<PR_NUMBER>/tools/<tool-filename>
```

For example, PR #16 with `tools/d2-editor.html` is at:
`https://tools.bobwhitelock.co.uk/pr-16/tools/d2-editor.html`

Use this to inspect deployed code and debug issues when working on any tool.

After pushing, wait for CI to pass, then wait a further ~1 minute for the deploy
to complete before loading the preview URL.
