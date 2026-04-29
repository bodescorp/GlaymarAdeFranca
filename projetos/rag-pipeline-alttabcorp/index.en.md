# Local RAG Pipeline — AlttabCorp

A complete AI system running in production on on-premises hardware, with zero cloud inference cost. It integrates a local LLM, vector database, voice transcription, workflow automation, and a web interface.

---

## Context & Problem

AlttabCorp needed an intelligent document querying system for its corporate documents — manuals, technical specifications, and business context — without relying on external APIs with per-token costs or the risk of exposing sensitive data.

An additional challenge: the available hardware was a local server with an **Intel i3 2nd gen and 8GB of RAM**, requiring an architecture optimized for limited resources. Any cloud-based solution would generate ongoing costs and expose internal data to third parties.

---

## Technical Solution

A complete RAG (Retrieval-Augmented Generation) pipeline:

1. **Ingestion** — documents are loaded and split into semantic chunks
2. **Embedding** — each chunk is converted to a vector via `all-minilm:l6-v2` (lightweight and efficient)
3. **Storage** — vectors persisted in `pgvector` (PostgreSQL extension)
4. **Query** — the user's question goes through the same embedding process
5. **Retrieval** — cosine similarity search returns the most relevant chunks
6. **Generation** — chunks are injected into `Ollama + Qwen2.5:1.5B` context for response generation

Voice is supported via **Whisper** integrated into the Telegram bot, with local transcription before entering the pipeline. **n8n** orchestrates the workflows and **Groq/OpenRouter** serve as fallback for larger models when needed.

---

## Architecture

```
Telegram Bot (text or voice)
        ↓
Whisper STT — local transcription
        ↓
n8n — workflow orchestration
        ↓
pgvector — similarity search
        ↓
Ollama + Qwen2.5 — local inference
        ↓
OpenWebUI — web interface
```

---

## Stack

| Layer | Technology |
|---|---|
| Local LLM | Ollama + Qwen2.5:1.5B |
| Embeddings | all-minilm:l6-v2 |
| Vector store | pgvector (PostgreSQL) |
| Orchestration | n8n |
| Voice | Whisper (local STT) |
| Interface | OpenWebUI |
| Bot | Telegram Bot API |
| Fallback | Groq / OpenRouter |
| Infra | Docker + Uptime-Kuma |

---

## Challenges & Decisions

**Limited hardware** — Qwen2.5:1.5B was chosen because it runs with acceptable quality on 8GB of RAM, while larger models (7B+) crash the server. The `all-minilm:l6-v2` embedding model is lightweight enough to run in parallel.

**Response quality** — For queries that require more complex reasoning, n8n automatically detects and falls back to Groq (Llama 3.1 70B) without user intervention.

**Privacy** — No corporate data leaves the local server. The Groq fallback is only triggered for generic queries, never for internal documents.

---

## Results

- 💰 **Zero inference cost** — LLM running 100% locally
- 🔒 **Corporate data never leaves the server**
- 🎙 **Voice support** via Whisper integrated with Telegram
- 📊 **Uptime monitoring** with alerts via Uptime-Kuma
- ⚡ **Smart fallback** to Groq/OpenRouter for complex queries
- 🌐 **Web interface** via OpenWebUI for use without Telegram