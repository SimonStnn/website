# Docker Compose Guide

**Navigation:** [Home](../README.md) → [Deployment](./README.md) → Docker Compose

---

## Overview

Docker Compose simplifies multi-container Docker applications by defining services, networks, and volumes in a single YAML file. This guide covers the docker-compose.yml configuration for the Simon Stijnen Portfolio and explores advanced multi-service setups.

## Table of Contents

- [Quick Start](#quick-start)
- [Configuration Breakdown](#configuration-breakdown)
- [Common Operations](#common-operations)
- [Advanced Configurations](#advanced-configurations)
- [Multi-Service Examples](#multi-service-examples)
- [Environment Management](#environment-management)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

- Docker Compose v2.0+ (bundled with Docker Desktop)
- Docker Engine 20.10+

```bash
# Check Docker Compose version
docker compose version

# Legacy command (v1)
docker-compose version
```

### One-Command Deployment

```bash
# Start services in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild and restart
docker compose up -d --build
```

---

## Configuration Breakdown

### Current Configuration

```yaml
name: personal-website

services:
  website:
    container_name: personal-website
    build:
      context: .
    restart: unless-stopped
    ports:
      - "3000:3000"
```

### Line-by-Line Explanation

#### Project Name

```yaml
name: personal-website
```

**Purpose:**

- Sets project name for all resources
- Prefixes network, volume, and container names
- Used by `docker compose` commands

**Effect:**

```bash
# Without name: directory-based prefix
docker compose up
# Creates: website-website-1

# With name: explicit prefix
docker compose up
# Creates: personal-website
```

#### Service Definition

```yaml
services:
  website:
```

- Defines a service named `website`
- Can have multiple services (web, database, cache, etc.)
- Each service represents a container

#### Container Name

```yaml
container_name: personal-website
```

**Purpose:**

- Sets explicit container name
- Overrides default naming (`<project>-<service>-<number>`)
- Makes container easier to reference

**With vs Without:**

| Configuration                | Container Name               |
| ---------------------------- | ---------------------------- |
| **Without** `container_name` | `personal-website-website-1` |
| **With** `container_name`    | `personal-website`           |

**Note:** Cannot scale service with explicit container name:

```bash
docker compose up -d --scale website=3  # ❌ Fails with container_name
```

#### Build Configuration

```yaml
build:
  context: .
```

**Simple Form:**

```yaml
build: . # Build from current directory
```

**Extended Form:**

```yaml
build:
  context: . # Build context directory
  dockerfile: Dockerfile # Dockerfile path (optional, defaults to Dockerfile)
  args: # Build arguments (optional)
    NODE_VERSION: 24
  target: runner # Target stage in multi-stage build (optional)
  cache_from: # Cache sources (optional)
    - personal-website:latest
```

**Build Context:**

- `.` = current directory
- Path relative to docker-compose.yml location
- Contains Dockerfile and source code

#### Restart Policy

```yaml
restart: unless-stopped
```

**Available Policies:**

| Policy           | Behavior                                         | Use Case                       |
| ---------------- | ------------------------------------------------ | ------------------------------ |
| `no`             | Never restart                                    | Development, debugging         |
| `always`         | Always restart, even after Docker daemon restart | Critical services              |
| `unless-stopped` | Restart unless manually stopped                  | **Recommended for production** |
| `on-failure`     | Restart only on non-zero exit code               | Retry on errors                |
| `on-failure:3`   | Restart maximum 3 times                          | Prevent restart loops          |

**Examples:**

```yaml
# Always restart (even if manually stopped)
restart: always

# Restart only on failure, max 5 times
restart: on-failure:5

# Never restart (development)
restart: "no"  # Quotes required for 'no'
```

#### Port Mapping

```yaml
ports:
  - "3000:3000"
```

**Format:** `"HOST:CONTAINER"` or `"HOST_IP:HOST_PORT:CONTAINER_PORT"`

**Examples:**

```yaml
# Map different host port
ports:
  - "8080:3000"  # Access at http://localhost:8080

# Bind to specific interface
ports:
  - "127.0.0.1:3000:3000"  # Only localhost access

# Multiple ports
ports:
  - "3000:3000"   # HTTP
  - "9229:9229"   # Node.js debugger

# Random host port
ports:
  - "3000"  # Docker assigns random port

# Port range
ports:
  - "3000-3002:3000-3002"
```

**Security Note:**

```yaml
# ❌ Exposed to internet (if server has public IP)
ports:
  - "3000:3000"

# ✅ Local only
ports:
  - "127.0.0.1:3000:3000"
```

---

## Common Operations

### Starting Services

```bash
# Start in background (detached)
docker compose up -d

# Start with logs visible
docker compose up

# Start specific service
docker compose up -d website

# Force recreate containers
docker compose up -d --force-recreate

# Rebuild images before starting
docker compose up -d --build

# Pull latest images before starting
docker compose up -d --pull always
```

### Stopping Services

```bash
# Stop containers (preserves containers)
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove with volumes
docker compose down -v

# Stop and remove with images
docker compose down --rmi all

# Stop specific service
docker compose stop website
```

### Viewing Logs

```bash
# Follow all logs
docker compose logs -f

# Follow specific service
docker compose logs -f website

# Last 100 lines
docker compose logs --tail=100

# Since timestamp
docker compose logs --since 2024-01-01T00:00:00

# With timestamps
docker compose logs -t -f
```

### Executing Commands

```bash
# Execute command in running service
docker compose exec website sh

# Run as root
docker compose exec -u root website sh

# Execute one-off command
docker compose exec website node --version

# Run command in new container
docker compose run --rm website npm test
```

### Service Management

```bash
# List running services
docker compose ps

# List all containers (including stopped)
docker compose ps -a

# View service configuration
docker compose config

# Validate configuration
docker compose config --quiet

# View service logs
docker compose logs website

# Restart service
docker compose restart website

# Pause/Unpause (suspend execution)
docker compose pause website
docker compose unpause website
```

### Building Images

```bash
# Build all services
docker compose build

# Build specific service
docker compose build website

# Build with no cache
docker compose build --no-cache

# Build with progress
docker compose build --progress plain

# Pull base images before building
docker compose build --pull
```

---

## Advanced Configurations

### Complete Configuration Example

```yaml
name: personal-website

services:
  website:
    container_name: personal-website
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_VERSION: 24
      target: runner
    image: personal-website:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - NEXT_PUBLIC_SITE_URL=${SITE_URL}
    env_file:
      - .env.production
    volumes:
      - ./logs:/app/logs
      - website-cache:/app/.next/cache
    networks:
      - web
    depends_on:
      database:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: "2"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

networks:
  web:
    driver: bridge

volumes:
  website-cache:
    driver: local
```

### Environment Variables

#### Inline Environment

```yaml
services:
  website:
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DEBUG=false
```

#### Environment File

```yaml
services:
  website:
    env_file:
      - .env
      - .env.production
```

**.env file:**

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://simonstijnen.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Variable Substitution

```yaml
services:
  website:
    environment:
      - SITE_URL=${SITE_URL:-https://localhost:3000}
      - VERSION=${VERSION}
    ports:
      - "${HOST_PORT:-3000}:3000"
```

**Usage:**

```bash
# Use default values
docker compose up -d

# Override with environment variables
HOST_PORT=8080 SITE_URL=https://example.com docker compose up -d

# Use .env file
echo "HOST_PORT=8080" > .env
docker compose up -d
```

### Volumes

#### Named Volumes

```yaml
services:
  website:
    volumes:
      - website-data:/app/data
      - logs:/app/logs

volumes:
  website-data:
    driver: local
  logs:
    driver: local
```

#### Bind Mounts

```yaml
services:
  website:
    volumes:
      # Absolute path
      - /host/path:/container/path

      # Relative path
      - ./local/path:/app/data

      # Read-only mount
      - ./config:/app/config:ro

      # Named volume
      - data-volume:/app/data
```

#### Volume Options

```yaml
volumes:
  website-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /path/on/host

  postgres-data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=10.0.0.1,rw
      device: ":/exported/path"
```

### Networks

#### Multiple Networks

```yaml
services:
  website:
    networks:
      - frontend
      - backend

  database:
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true # No external access
```

#### Network Aliases

```yaml
services:
  website:
    networks:
      web:
        aliases:
          - portfolio
          - www
```

#### External Networks

```yaml
networks:
  existing-network:
    external: true
    name: actual-network-name
```

### Health Checks

```yaml
services:
  website:
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--spider", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  database:
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

### Dependencies

```yaml
services:
  website:
    depends_on:
      database:
        condition: service_healthy
      redis:
        condition: service_started

  database:
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 5s
```

**Conditions:**

- `service_started`: Wait for container to start (default)
- `service_healthy`: Wait for health check to pass
- `service_completed_successfully`: Wait for one-off task

---

## Multi-Service Examples

### Website + PostgreSQL

```yaml
name: personal-website

services:
  website:
    container_name: personal-website
    build: .
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@database:5432/portfolio
    depends_on:
      database:
        condition: service_healthy
    networks:
      - app-network

  database:
    container_name: personal-website-db
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=portfolio
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
```

### Website + Redis Cache

```yaml
name: personal-website

services:
  website:
    container_name: personal-website
    build: .
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - REDIS_URL=redis://cache:6379
    depends_on:
      - cache
    networks:
      - app-network

  cache:
    container_name: personal-website-cache
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  redis-data:
```

### Full Stack with Reverse Proxy

```yaml
name: personal-website

services:
  nginx:
    container_name: nginx-proxy
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - website
    networks:
      - web

  website:
    container_name: personal-website
    build: .
    restart: unless-stopped
    expose:
      - "3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@database:5432/portfolio
      - REDIS_URL=redis://cache:6379
    depends_on:
      database:
        condition: service_healthy
      cache:
        condition: service_healthy
    networks:
      - web
      - backend

  database:
    container_name: postgres-db
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=portfolio
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - backend

  cache:
    container_name: redis-cache
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - backend

networks:
  web:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  postgres-data:
  redis-data:
```

---

## Environment Management

### Multiple Environment Files

```bash
# Directory structure
.
├── docker-compose.yml          # Base configuration
├── docker-compose.dev.yml      # Development overrides
├── docker-compose.prod.yml     # Production overrides
├── .env.development            # Dev environment variables
└── .env.production             # Prod environment variables
```

#### Base Configuration

**docker-compose.yml:**

```yaml
name: personal-website

services:
  website:
    build: .
    ports:
      - "3000:3000"
```

#### Development Override

**docker-compose.dev.yml:**

```yaml
services:
  website:
    build:
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

**Usage:**

```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Shorthand with COMPOSE_FILE
export COMPOSE_FILE=docker-compose.yml:docker-compose.dev.yml
docker compose up -d
```

#### Production Override

**docker-compose.prod.yml:**

```yaml
services:
  website:
    restart: always
    environment:
      - NODE_ENV=production
    deploy:
      resources:
        limits:
          cpus: "2"
          memory: 1G
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**Usage:**

```bash
# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Profile-Based Configuration

```yaml
name: personal-website

services:
  website:
    build: .
    ports:
      - "3000:3000"

  database:
    image: postgres:16-alpine
    profiles:
      - full-stack

  cache:
    image: redis:7-alpine
    profiles:
      - full-stack
```

**Usage:**

```bash
# Start only website
docker compose up -d

# Start website + database + cache
docker compose --profile full-stack up -d
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Error: "port is already allocated"

# Find process using port
lsof -i :3000

# Use different port
docker compose up -d
# Edit docker-compose.yml:
# ports:
#   - "8080:3000"
```

#### Service Won't Start

```bash
# View detailed logs
docker compose logs website

# Check service status
docker compose ps

# View configuration
docker compose config

# Validate syntax
docker compose config --quiet
```

#### Build Failures

```bash
# Rebuild without cache
docker compose build --no-cache

# View build output
docker compose build --progress plain

# Build specific service
docker compose build website
```

#### Network Issues

```bash
# Recreate networks
docker compose down
docker compose up -d

# Inspect network
docker network inspect personal-website_default

# Test connectivity between services
docker compose exec website ping database
```

### Debugging Commands

```bash
# View all containers (including stopped)
docker compose ps -a

# View resource usage
docker compose stats

# Execute shell in container
docker compose exec website sh

# View service configuration
docker compose config --services

# View volumes
docker compose config --volumes

# View networks
docker compose config --networks
```

### Logs and Monitoring

```bash
# Follow logs with timestamps
docker compose logs -f -t

# Filter logs by service
docker compose logs -f website

# Last N lines
docker compose logs --tail=50 website

# Since specific time
docker compose logs --since="2024-01-01T00:00:00"

# Export logs
docker compose logs --no-color > logs.txt
```

---

## See Also

- [Docker Guide](./01-docker-guide.md) - Comprehensive Docker reference
- [Dockerfile Documentation](./02-dockerfile.md) - Multi-stage build details
- [CI/CD Pipeline](./04-ci-cd.md) - Automated deployments
- [Production Configuration](./06-production-config.md) - Production best practices

---

## Next Steps

1. **Set Up Multi-Service**: Add database or cache using [examples above](#multi-service-examples)
2. **Environment Management**: Configure [development and production](#environment-management) overrides
3. **Automation**: Integrate with [CI/CD Pipeline](./04-ci-cd.md)
4. **Production Deploy**: Review [Deployment Strategies](./05-deployment-strategies.md)

---

**Last Updated:** February 2026  
**Docker Compose Version:** v2.24+  
**Compose File Version:** 3.8 (implied, version key removed in v2)  
**Compatibility:** Docker Compose v2.0+
