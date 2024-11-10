# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos
COPY . .

# Construa a aplicação
RUN npm run build

# Instale o NGINX
RUN npm install -g serve

# Exponha a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["serve", "-s", "build"]
