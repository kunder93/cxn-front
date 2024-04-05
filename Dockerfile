FROM node as build
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx
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
