FROM node:18.12.1-slim
#ENV CHOKIDAR_USEPOLLING=true
RUN  mkdir -p /app
WORKDIR /app
COPY package.json .
RUN npm --registry=https://registry.npmmirror.com install
CMD npm run dev
EXPOSE 8888
