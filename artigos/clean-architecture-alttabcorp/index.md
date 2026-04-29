# Clean Architecture na pratica: como estruturei o backend da AlttabCorp

Este artigo documenta as decisoes de arquitetura que usei para evoluir o backend da AlttabCorp com foco em manutenibilidade, testes e escala.

## Contexto
O sistema cresceu rapido e passou a exigir separacao clara de responsabilidades, isolamento de regras de negocio e dependencia minima de frameworks.

## O que apliquei
- Camadas bem definidas (use cases, dominio, interfaces).
- Contratos explicitos para gateways e repositorios.
- Dependencias sempre apontando para o dominio.

## Observacoes finais
O modelo reduziu acoplamento e deixou a base mais previsivel para evoluir. O restante do artigo traz exemplos praticos e trade-offs.
