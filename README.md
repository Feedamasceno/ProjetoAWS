Sistema de Locação de Carros

Este projeto é uma aplicação para locação de carros, desenvolvida utilizando tecnologias modernas e infraestrutura na AWS.

Tecnologias Utilizadas

Backend: Node.js com Express, containerizado com Docker.

Frontend: Desenvolvido e executado em Docker.

Banco de Dados: Amazon RDS MySQL.

Armazenamento de Arquivos: Amazon S3 com URLs assinadas.

Integração Serverless: AWS Lambda e API Gateway.

Notificação: Amazon SES para envio de e-mails.

Funcionalidades

CRUD de Carros: Gerenciamento completo de veículos (criar, ler, atualizar e excluir).

Upload de Arquivos: Envio seguro de imagens de carros para o S3 via URLs assinadas.

Notificações por E-mail: Envio automático de e-mails ao cadastrar novos veículos ou realizar atualizações importantes.

Integração Serverless: Utilização de AWS Lambda para gerenciar requisições entre o S3 e o API Gateway.
