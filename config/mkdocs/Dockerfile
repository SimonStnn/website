# Build stage
FROM python:3.11-alpine AS builder

# Install system dependencies and clean up apk cache
RUN apk add --no-cache pngquant

# Install python dependencies
RUN pip install --no-cache-dir \
  mkdocs-material \
  mkdocs-pdf

# Set working directory
WORKDIR /docs

# Copy MkDocs configuration file to default location
COPY config/mkdocs/mkdocs.yml .

# Copy custom stylesheets into docs_dir
COPY config/mkdocs/stylesheets ./docs/stylesheets

# Copy documentation files to default docs/ subdirectory
COPY docs ./docs

# Build static site using default locations
RUN mkdocs build

# Production stage
FROM nginx:alpine

# Copy built static files from builder stage
COPY --from=builder /docs/site /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80

# nginx runs in foreground by default
CMD ["nginx", "-g", "daemon off;"]
