# Development Dockerfile for Movie Discovery App
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Default to development
ENV NODE_ENV=development

# Start development server
CMD ["npm", "run", "dev"]
