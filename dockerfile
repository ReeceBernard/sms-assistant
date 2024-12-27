FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "-r", "tsconfig-paths/register", "dist/app.js"]
