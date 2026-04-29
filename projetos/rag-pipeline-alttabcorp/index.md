# Pipeline RAG Local — AlttabCorp

Sistema completo de IA em produção rodando em servidor próprio, sem custo de inferência em cloud. Integra LLM local, banco vetorial, transcrição de voz, automação de fluxos e interface web.

---

## Contexto & Problema

A AlttabCorp precisava de um sistema de consulta inteligente para seus documentos corporativos — manuais, especificações técnicas e contexto de negócio — sem depender de APIs externas com custo por token ou risco de exposição de dados sensíveis.

O desafio adicional: o hardware disponível era um servidor local com **i3 2ª geração e 8GB de RAM**, exigindo uma arquitetura otimizada para recursos limitados. Qualquer solução baseada em cloud geraria custos contínuos e exporia dados internos a terceiros.

---

## Solução Técnica

Pipeline RAG (Retrieval-Augmented Generation) completo:

1. **Ingestão** — documentos são carregados e divididos em chunks semânticos
2. **Embedding** — cada chunk é convertido em vetor via `all-minilm:l6-v2` (modelo leve e eficiente)
3. **Armazenamento** — vetores persistidos no `pgvector` (extensão do PostgreSQL)
4. **Query** — a pergunta do usuário passa pelo mesmo processo de embedding
5. **Recuperação** — busca por similaridade coseno retorna os chunks mais relevantes
6. **Geração** — chunks injetados no contexto do `Ollama + Qwen2.5:1.5B` para geração da resposta

Voz é suportada via **Whisper** integrado ao bot Telegram, com transcrição local antes de entrar no pipeline. O **n8n** orquestra os fluxos e o **Groq/OpenRouter** servem como fallback para modelos maiores quando necessário.

---

## Arquitetura

```
Telegram Bot (texto ou voz)
        ↓
Whisper STT — transcrição local
        ↓
n8n — orquestração de fluxos
        ↓
pgvector — busca por similaridade
        ↓
Ollama + Qwen2.5 — inferência local
        ↓
OpenWebUI — interface web
```

---

## Stack

| Camada | Tecnologia |
|---|---|
| LLM local | Ollama + Qwen2.5:1.5B |
| Embeddings | all-minilm:l6-v2 |
| Banco vetorial | pgvector (PostgreSQL) |
| Orquestração | n8n |
| Voz | Whisper (STT local) |
| Interface | OpenWebUI |
| Bot | Telegram Bot API |
| Fallback | Groq / OpenRouter |
| Infra | Docker + Uptime-Kuma |

---

## Desafios e Decisões

**Hardware limitado** — O Qwen2.5:1.5B foi escolhido por rodar com qualidade aceitável em 8GB de RAM, enquanto modelos maiores (7B+) travam o servidor. O modelo de embedding `all-minilm:l6-v2` é leve o suficiente para rodar em paralelo.

**Qualidade das respostas** — Para queries que exigem raciocínio mais complexo, o n8n detecta automaticamente e faz fallback para Groq (Llama 3.1 70B) sem intervenção do usuário.

**Privacidade** — Nenhum dado corporativo sai do servidor local. O fallback para Groq só é ativado para queries genéricas, nunca para documentos internos.

---

## Resultados

- 💰 **Custo de inferência zero** — LLM rodando 100% local
- 🔒 **Dados corporativos nunca saem do servidor**
- 🎙 **Suporte a voz** via Whisper integrado ao Telegram
- 📊 **Monitoramento de uptime** com alertas via Uptime-Kuma
- ⚡ **Fallback inteligente** para Groq/OpenRouter em queries complexas
- 🌐 **Interface web** via OpenWebUI para uso sem Telegram