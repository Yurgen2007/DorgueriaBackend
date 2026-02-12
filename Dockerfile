FROM node:22.9.0-alpine3.19

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Run migrations and seed, then start production
CMD ["sh", "-c", "npm run migration:run && npx ts-node src/cli.ts seed:database && npm run start:prod"]
