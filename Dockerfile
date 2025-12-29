# ---------- Stage 1: Builder ----------
FROM node:18-alpine AS builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/ .

# ---------- Stage 2: Production ----------
FROM node:18-alpine

WORKDIR /app

# Copy backend from builder
COPY --from=builder /app/backend ./backend

# Copy frontend static files
COPY index.html ./
COPY css ./css
COPY js ./js
COPY images ./images
COPY fonts ./fonts
COPY lib ./lib
COPY scss ./scss

EXPOSE 5000

# Start backend server
CMD ["node", "backend/server.js"]

