---
date: {{date}}
time: {{time}}
tags:
 - Daily
---
<% await tp.file.include("[[defFXEnvAnalysis]]") %>
現状把握、利確予想まで落ち耐え

---

```meta-bind-button
style: default
label: 明日分
actions:
  - type: "insertIntoNote"
    line: selfEnd+1
    value: "Temp/defFXEnvAnalysis.md"
    templater: true
  - type: "replaceSelf"
    replacement: ""
```
