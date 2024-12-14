# Base image
FROM denoland/deno:latest

# Set working directory
WORKDIR /app

# Install netcat (nc) with the correct package
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy all files
COPY . .

# Cache dependencies
RUN deno cache deps.ts

# Expose port
EXPOSE 8000

# Command to run the application with read permission
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "app.ts"]