# Modelo de projeto

1. Copie esta pasta `_modelo` para `projetos/nome-do-projeto`.
2. O nome da pasta vira o endereço: `projetos.html?project=nome-do-projeto`.
3. Preencha `index.json` (obrigatório). O `slug` deve ser igual ao nome da pasta.
4. Escreva o relato em `index.md`. Sem esse arquivo o projeto entra em "Outros sistemas".
5. Coloque capturas em `fotos/` e referencie no relato:

```md
![Tela inicial](fotos/tela.jpg)
```

6. Faça o push. A pasta `_modelo` não aparece no portfólio.

Campos úteis no `index.json`:

- `tags`: `ai`, `api`, `research`, `product`, `automation`
- `badge.class`: `badge-ai`, `badge-api`, `badge-research`, `badge-product`, `badge-automation`
- `status.class`: `status-prod`, `status-delivered`, `status-research`
- `lane`: `site` só para página de presença da Alttab
