# RAG local com Ollama e pgvector: guia pratico

Um passo a passo de como montei um pipeline RAG 100% local, sem API externa, com foco em custo zero e dados protegidos.

## Componentes
- Ollama com modelo leve para inferencia local.
- pgvector no PostgreSQL para busca semantica.
- Ingestao de documentos com chunking e embeddings.

## Resultado
A experiencia final foi rapida, barata e segura, com possibilidade de fallback para modelos maiores quando necessario.
