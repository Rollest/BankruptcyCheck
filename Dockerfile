FROM node:21-alpine3.19 as builder
WORKDIR /app
COPY . /app
RUN npm i

FROM builder AS backend
COPY --from=builder /app/node_modules /app/node_modules
ENTRYPOINT npm run start
