FROM node:23.1-alpine3.20 AS base
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Copiar package.json y lock para cache
COPY package.json package-lock.json ./

# Instalar dependencias según entorno
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --omit=dev; \
    else \
      npm ci; \
    fi

# Copiar código
COPY . .

# Si es producción, hacer build
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# === Etapa final para producción ===
FROM nginx:1.25.3-alpine AS production
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/common.conf /etc/nginx/conf.d/common.conf
COPY ./nginx/ssl_common.conf /etc/nginx/conf.d/ssl_common.conf
COPY --from=base /app/build /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

# === Etapa final para desarrollo ===
FROM node:23.1-alpine3.20 AS development
WORKDIR /app
COPY --from=base /app /app
EXPOSE 3000
CMD ["npm", "start"]

# === Selección final de imagen según NODE_ENV ===
FROM production AS final
ARG NODE_ENV=production
RUN echo "Selected build for NODE_ENV=$NODE_ENV"
