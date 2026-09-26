# YGO / HUB - Comunidade Yu-Gi-Oh! de Cajazeiras

Plataforma full-stack em produção que organiza a comunidade de Yu-Gi-Oh! de Cajazeiras-PB. É o principal produto da AlttabCorp, e eu desenvolvi tudo, do banco de dados ao deploy.

- Produção: [yugiohcz.alttabcorp.com.br](https://yugiohcz.alttabcorp.com.br/)
- Uso: 12 usuários ativos e um evento presencial toda semana, aos sábados

---

## O que a plataforma faz

- **Eventos:** confirmação de presença (RSVP) no encontro semanal e mural de encontros
- **Decks e coleção:** cada jogador monta e mostra seus decks
- **Mercado:** anúncios de venda e troca, com chat e reputação
- **Partidas e ranking:** registro de duelos e classificação da comunidade
- **Campeonatos:** inscrição com decklist, chaveamento e pódio
- **Painel administrativo:** gerenciamento da plataforma por organizadores e administradores
- **Captação:** páginas públicas de convite (`/e` e `/c`) com Open Graph dinâmico, pensadas para circular no WhatsApp e no Instagram, com RSVP logo após o cadastro

---

## Arquitetura e stack

| Camada | Tecnologia |
|---|---|
| Aplicação | Next.js (App Router), React, TypeScript, API Routes |
| Dados | Prisma, PostgreSQL |
| Serviços | Redis |
| Filas | RabbitMQ |
| Arquivos | MinIO (compatível com S3) |
| Autenticação | Better Auth: e-mail, Google e Discord (OAuth) |
| Autorização | Papéis de jogador, organizador e administrador, com checagem por recurso |
| Deploy | Docker |
| Front | PWA instalável, layout pensado para celular |
| SEO | sitemap, robots, JSON-LD, Google Search Console |

---

## Decisões

**Regras de negócio no banco.** RSVP, anúncios, inscrição com decklist, chaveamento e pódio foram modelados com Prisma e PostgreSQL, para que as regras do campeonato fiquem consistentes independentemente da tela.

**Autorização por recurso.** Não basta o papel do usuário: cada ação confere se ele é dono do anúncio, organizador do evento ou administrador.

**Trabalho assíncrono fora da requisição.** E-mails e notificações passam por filas no RabbitMQ, e os arquivos enviados pelos usuários vão para o MinIO.

**Convites que funcionam no WhatsApp.** As páginas públicas de convite geram prévia com Open Graph dinâmico ao serem compartilhadas e levam direto à confirmação de presença.

---

## Resultado

- Plataforma em produção, usada toda semana pela comunidade
- 12 usuários ativos
- Um produto real, de ponta a ponta, mantido por um único desenvolvedor
