FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm ci
COPY tsconfig.base.json ./
COPY packages/shared packages/shared
COPY apps/api apps/api
RUN npm run build -w @kvarta/api

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=build --chown=node:node /app/apps/api/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/api/.next/static ./apps/api/.next/static
COPY --from=build --chown=node:node /app/apps/api/scripts ./apps/api/scripts
COPY --from=build --chown=node:node /app/apps/api/migrations ./apps/api/migrations
USER node
EXPOSE 3000
CMD ["sh","-c","node apps/api/scripts/migrate.mjs && node apps/api/server.js"]
