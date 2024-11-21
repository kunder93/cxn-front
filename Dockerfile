FROM node:23.1-alpine3.20 AS build
WORKDIR /app
# Copy only the package files first for caching `npm install` step
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the source files
COPY . .
RUN npm run build

FROM nginx:stable-alpine
EXPOSE 80
EXPOSE 443
# Copia el archivo de configuración de Nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/common.conf /etc/nginx/conf.d/common.conf
COPY ./nginx/ssl_common.conf /etc/nginx/conf.d/ssl_common.conf
# Copia los certificados SSL/TLS solo si la variable de entorno COPY_CERTIFICATES está establecida en "true"
ARG COPY_CERTIFICATES=false
RUN if [ "$COPY_CERTIFICATES" = "true" ]; then \
  mkdir -p /etc/nginx/certs/xadreznaron.es /etc/nginx/certs/www.xadreznaron.es && \
  cp /certificates/xadreznaron.es/fullchain.pem /etc/nginx/certs/xadreznaron.es/ && \
  cp /certificates/xadreznaron.es/privkey.pem /etc/nginx/certs/xadreznaron.es/ && \
  cp /certificates/www.xadreznaron.es/fullchain.pem /etc/nginx/certs/www.xadreznaron.es/ && \
  cp /certificates/www.xadreznaron.es/privkey.pem /etc/nginx/certs/www.xadreznaron.es/; \
  fi

COPY --from=build /app/build /usr/share/nginx/html
