# Use a imagem oficial do Node.js como base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Exponha a porta que o aplicativo vai usar
EXPOSE 25000

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]
