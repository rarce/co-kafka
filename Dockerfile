FROM mhart/alpine-node:8
LABEL Name="ComparaOnline co-kafka" Version="1.0"

ARG ENVIRONMENT="production"
ENV NODE_ENV=${ENVIRONMENT}
EXPOSE 4000
WORKDIR /code

COPY package.json yarn.lock ./

RUN \
  # Build packages are not included in the final Docker image.
  apk add --no-cache --virtual .build-packages \
    bash \
    make \
    g++ \
    python \
    libressl --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/main \
    librdkafka-dev --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/community \
    && \
  # Install node packages
  BUILD_LIBRDKAFKA=0 yarn install \
    && \
  # Clean up build packages.
  apk del --purge .build-packages \
    && \
  yarn cache clean

COPY build config ./code/

CMD ["yarn", "start"]
