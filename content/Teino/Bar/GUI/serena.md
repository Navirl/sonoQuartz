---
date: 2025-10-21
time: 19:38
tags:
  - Bar
---

up:: [claude_code](<../CLI/claude_code.md>)

## --fromのエラーでmcpが登録できない
cmd経由なら登録できる。
```powershell
cmd /c claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena start-mcp-server --context ide-assistant --project $(pwd)
```

[\`uvx --from\` option not recognized when used with Claude Code using PowerShell · Issue #323 · oraios/serena](https://github.com/oraios/serena/issues/323)