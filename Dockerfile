FROM node:lts
RUN  mkdir -p /app
WORKDIR /app
COPY package.json .
CMD (npm --registry=https://registry.npmmirror.com i) && npm run dev
EXPOSE 8888
