# Stage A: Build the app

FROM node:20-alpine AS builder

WORKDIR /_app/ui

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build


# Stage B: Create runtime ( TEST #1 FAILED )

FROM node:20-alpine as runner

WORKDIR /_app/ui 

COPY --from=builder /_app/ui/.next ./.next
COPY --from=builder /_app/ui/public ./public
COPY --from=builder /_app/ui/package.json ./package.json

RUN yarn install --production --frozen-lockfile
RUN yarn add tsc

EXPOSE 4001
ENV PORT=4001

ENTRYPOINT ["yarn", "start"]
