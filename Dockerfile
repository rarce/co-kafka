FROM mhart/alpine-node:8
LABEL Name="ComparaOnline co-kafka" Version="1.0"

ARG ENVIRONMENT="production"
ENV NODE_ENV=${ENVIRONMENT}
EXPOSE 4000
WORKDIR /code

RUN \ 
  # librdkafka binaries and dev libraries
  apk add --no-cache librdkafka-dev --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/community \
    libressl --repository http://dl-cdn.alpinelinux.org/alpine/v3.7/main

COPY package.json yarn.lock ./

RUN \
  # Build packages are not included in the final Docker image.
  apk add --no-cache --virtual .build-packages \
    bash \
    make \
    g++ \
    python \
    && \
  # Install node packages
  BUILD_LIBRDKAFKA=0 yarn install \
    && \
  # Clean up build packages.
  apk del --purge .build-packages \
    && \
  # Cleanup yarn
  yarn cache clean

COPY build config ./code/

CMD ["tail", "-f", "/dev/null"]
