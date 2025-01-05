# Sistema de Locação de Carros

Este é um sistema de locação de carros desenvolvido utilizando tecnologias modernas e infraestrutura da AWS.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express, containerizado com Docker.
- **Frontend**: Desenvolvido e containerizado com Docker.
- **Banco de Dados**: Amazon RDS MySQL.
- **Armazenamento de Arquivos**: Amazon S3 com URLs assinadas para uploads seguros.
- **Integração Serverless**: AWS Lambda e API Gateway.
- **Notificação**: Amazon SES para envio de e-mails automatizados.

## Funcionalidades

- CRUD completo para gerenciar carros (criar, ler, atualizar e deletar).
- Upload de imagens de carros com armazenamento seguro no S3.
- Integração entre Lambda e API Gateway para gerenciar operações serverless.
- Envio de e-mails automáticos ao cadastrar ou atualizar veículos.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

