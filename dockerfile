# Construir aplicativo de producción
FROM node:20.17.0-slim as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Instalar dependencias de producción
FROM node:20.17.0-slim as prod-deps

WORKDIR /app
COPY . .
RUN npm install --prod

# Ejecutar aplicación de producción
FROM node:20.17.0-slim as prod

WORKDIR /app
EXPOSE 3000
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN npm install --prod

CMD ["node", "dist/main.js"]
