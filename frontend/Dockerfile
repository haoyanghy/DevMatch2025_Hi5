# Use the official Node.js 18 LTS image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Vite project
RUN npm run build

# Use a lightweight Node.js image for serving
FROM node:18-alpine

# Install serve to run the built app
RUN npm install -g serve

# Set working directory
WORKDIR /frontend

# Copy the built files from the builder stage
COPY --from=builder /frontend/dist ./dist

# Expose the port the app will run on
EXPOSE 3000

# Command to serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]