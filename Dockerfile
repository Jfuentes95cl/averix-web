# Usa una imagen base oficial de Nginx optimizada (alpine es ligera)
FROM nginx:stable-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/share/nginx/html

# Elimina el contenido por defecto de Nginx para evitar conflictos
RUN rm -rf ./*

# Copia los archivos de tu proyecto (HTML, CSS, JS, imágenes)
# desde tu repositorio a la carpeta web de Nginx dentro del contenedor.
# El primer '.' se refiere al contenido de tu repositorio donde está el Dockerfile.
# El segundo '.' se refiere al directorio de trabajo actual dentro del contenedor (/usr/share/nginx/html).
COPY . .

# Expone el puerto 80 (el puerto estándar HTTP que Nginx escucha por defecto)
EXPOSE 80

# Comando para iniciar Nginx en primer plano cuando el contenedor arranque
# '-g daemon off;' asegura que Nginx se ejecute como proceso principal,
# lo cual es necesario para que Railway mantenga el contenedor activo.
CMD ["nginx", "-g", "daemon off;"]