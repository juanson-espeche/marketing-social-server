FROM denoland/deno:latest

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY src ./src
COPY src/deps.ts ./src/deps.ts

RUN deno cache src/deps.ts

EXPOSE 8000

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "src/main.ts"]