FROM node:21-alpine3.19 as builder
WORKDIR /app
COPY package.json /app
RUN npm i

FROM builder AS backend
COPY --from=builder /app/node_modules /app/node_modules
COPY . /app
ENTRYPOINT npm run start
