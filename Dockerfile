# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM --platform=linux/arm64 node:22-slim AS builder

WORKDIR /app

# Yarn 4 (yarnPath 방식) 사용 — .yarn/releases 포함
COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock ./

RUN node .yarn/releases/yarn-4.9.4.cjs install

COPY . .

RUN node .yarn/releases/yarn-4.9.4.cjs run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM --platform=linux/arm64 nginx:1.27-alpine

# SPA 라우팅 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
