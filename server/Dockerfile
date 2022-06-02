# Build image
FROM rust:1.60 as builder

# Run dummy build to build and cache dependencies that only depends on Cargo.toml and Cargo.lock
WORKDIR /usr/src
RUN USER=root cargo new server
COPY Cargo.toml Cargo.lock /usr/src/server/
WORKDIR /usr/src/server
RUN cargo build --release

# Run actual build
COPY ./src ./src
RUN cargo build --release

# Run image
FROM debian:buster-slim
RUN apt-get update \
    && apt-get -y install libpq-dev \
    && apt-get install -y --no-install-recommends ca-certificates

RUN update-ca-certificates
# RUN apt-get update && apt-get install -y extra-runtime-dependencies && rm -rf /var/lib/apt/lists/*
COPY --from=builder  /usr/src/server/target/release/server /usr/local/bin/server

WORKDIR /app/server

EXPOSE 3030

CMD ["server"]