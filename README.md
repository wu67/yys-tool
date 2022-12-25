# yys-tool

## Project setup
```bash
yarn
# or
npm i
```

### Compiles and hot-reloads for development
```
yarn dev
# or
npm run dev
```

### Compiles and minifies for production
```
yarn build
# or
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## or use docker
```bash
docker pull node:18.12.1-slim
```

```bash
docker build -t yys_tool:dev .
```

```bash
docker run -d -p 8888:8888 -v ${PWD}:/app -v /app/node_modules --name yys_tool yys_tool:dev
```

