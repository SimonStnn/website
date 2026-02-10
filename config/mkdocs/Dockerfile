FROM python:3.11-alpine AS builder

# Install system dependencies and clean up apk cache
RUN apk add --no-cache pngquant

# Install python dependencies
RUN pip install --no-cache-dir \
  mkdocs-material \
  mkdocs-pdf

# Set working directory
WORKDIR /app

# Copy MkDocs configuration and stylesheets
COPY config/mkdocs /app/config/mkdocs

# Copy documentation files
COPY docs /app/docs

# Copy stylesheets to docs directory
COPY config/mkdocs/stylesheets /app/docs/stylesheets

# Change to MkDocs config directory
WORKDIR /app/config/mkdocs

# Build static site
RUN mkdocs build

# Production stage
FROM nginx:alpine

# Copy built static files from builder stage
COPY --from=builder /app/config/mkdocs/site /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80

# nginx runs in foreground by default
CMD ["nginx", "-g", "daemon off;"]
