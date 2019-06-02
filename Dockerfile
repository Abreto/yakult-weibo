FROM node:lts

LABEL maintainer="Yakult YANG"

ENV CLIENT_ROOT /client

COPY ./client ${CLIENT_ROOT}

WORKDIR ${CLIENT_ROOT}
RUN yarn \
    && yarn build

FROM node:lts

ENV APP_ROOT /app
ENV NODE_ENV production

COPY . ${APP_ROOT}
COPY --from=0 /client/build ${APP_ROOT}/client/build

WORKDIR ${APP_ROOT}

RUN yarn

RUN ls && ls ${APP_ROOT}/client/build

ENTRYPOINT [ "yarn", "start" ]
