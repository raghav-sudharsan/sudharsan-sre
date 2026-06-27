# Multi-stage Dockerfile for Enterprise deployment of SRE Portfolio
# Stage 1: Build & Optimize Assets (Optional step for linting/audits)
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
# If there are node build scripts, they would run here (e.g. npm run build).
# Since it's a pure static website, we just pass assets to the production stage.

# Stage 2: Production Web Server
FROM nginx:1.25-alpine

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy application static files to NGINX default html directory
COPY index.html /usr/share/nginx/html/index.html
COPY Sudharsan_SRE.jpeg /usr/share/nginx/html/Sudharsan_SRE.jpeg
COPY styles/ /usr/share/nginx/html/styles/
COPY scripts/ /usr/share/nginx/html/scripts/
COPY content/ /usr/share/nginx/html/content/
COPY assets/ /usr/share/nginx/html/assets/

# Expose HTTP port
EXPOSE 80

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
