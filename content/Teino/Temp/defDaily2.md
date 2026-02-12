---
date: {{date}}
time: {{time}}
tags:
 - Daily
---
<%* if (["0","6"].includes(tp.date.now("d"))) { tR += await tp.file.include("[[defFXWeekly]]"); }-%>

<% await tp.file.include("[[defFXEnvAnalysis]]") %>