FROM node:14.2.0-alpine AS base
WORKDIR /app
COPY package.json ./

#
# ----- Dependencies ----- #
FROM base AS dependencies
RUN yarn install --production
RUN cp -R node_modules production_node_modules
RUN yarn install

#
# ----- Builder ----- #
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY babel.config.js ./
COPY src ./src
RUN yarn run build

#
# ----- Release ----- #
FROM base AS release
COPY --from=dependencies /app/production_node_modules ./node_modules
COPY --from=builder /app/.dist/ ./
RUN echo -e "#!/usr/local/bin/node\n$(cat main.js)" > main.js
COPY data ./data
CMD ["time", "./main.js"]