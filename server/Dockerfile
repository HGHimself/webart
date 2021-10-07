FROM rust:latest

WORKDIR "/app"

COPY . .

RUN cargo build --release

EXPOSE 3030

CMD ["./target/release/server"]
