---
tags:
 - Bar
---

daily:: [2023-05-28](Daily_Note/2023-05-28.md)
up:: [AI_local](../Bar/AI/AI_local.md)


目標、条件、ゴールを与えると自律的に動作するAIアプリケーション。OpenAIのAPIで動作するのが前提。
Langchainで構築されている。

似てるものにAGiXTがあるが、これは複数のAIプロバイダー間で指示を管理するものらしい。

[GitHub - Josh-XT/AGiXT: AGiXT is a dynamic AI Automation Platform that seamlessly orchestrates instruction management and complex task execution across diverse AI providers. Combining adaptive memory, smart features, and a versatile plugin system, AGiXT delivers efficient and comprehensive AI solutions.](https://github.com/Josh-XT/AGiXT)

```bing
**AGiXT** is an Artificial Intelligence Automation Platform that seamlessly orchestrates instruction management and complex task execution across diverse AI providers. It combines adaptive memory, smart features, and a versatile plugin system with many commands including web browsing .

**Auto-GPT** is an experimental open-source Python application that can act autonomously without prompts (instructions) from the user. It is based on GPT-4 and can self-prompt, allowing it to perform actions such as internet searches while operating completely independently on a computer .

**LangChain** is a framework for developing applications powered by language models. It provides modular abstractions for the components necessary to work with language models and has collections of implementations for all these abstractions. The components are designed to be easy to use, regardless of whether you are using the rest of the LangChain framework or not .

In summary, AGiXT is an AI automation platform that can manage instructions and execute complex tasks across multiple AI providers. Auto-GPT is an experimental AI application that can act autonomously without user prompts. LangChain is a framework for developing applications powered by language models.

Would you like more information on any specific aspect of these projects?
```

これを動かすためにOpenAPIに合わせてAPI作ろうとしてるのがLocalAIとFree-Auto-GPT。

[GitHub - go-skynet/LocalAI: Self-hosted, community-driven, local OpenAI-compatible API. Drop-in replacement for OpenAI running LLMs on consumer-grade hardware. No GPU required. LocalAI is a RESTful API to run ggml compatible models: llama.cpp, alpaca.cpp, gpt4all.cpp, rwkv.cpp, whisper.cpp, vicuna, koala, gpt4all-j, cerebras and many others!](https://github.com/go-skynet/LocalAI)
[GitHub - IntelligenzaArtificiale/Free-Auto-GPT: Free Auto GPT with NO paids API is a repository that offers a simple version of Auto GPT, an autonomous AI agent capable of performing tasks independently. Unlike other versions, our implementation does not rely on any paid OpenAI API, making it accessible to anyone.](https://github.com/IntelligenzaArtificiale/Free-Auto-GPT)