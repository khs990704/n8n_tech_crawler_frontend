# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22 AS builder

WORKDIR /app

# 네이티브 모듈 빌드 도구 설치 (@swc/core 등)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# SPA 라우팅 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
