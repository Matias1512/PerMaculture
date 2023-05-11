# Rust as the base image
FROM rust:latest AS builder
# 1. Create a new empty shell project
RUN USER=root cargo new --bin api
WORKDIR /api
# 2. Copy over your manifests
COPY ./Cargo.toml ./Cargo.toml
COPY ./Cargo.lock ./Cargo.lock
# 3. Build the project to cache dependencies
RUN cargo build --release
RUN rm src/*.rs
# 4. Copy your source tree
COPY ./src ./src
# 5. Build for release
RUN cargo build --release
EXPOSE 3000
# 6. Copy the build artifact to the production image
FROM debian:buster-slim AS runtime
RUN apt-get update && apt-get install -y libpq-dev libpq5
COPY --from=builder /api/target/release/api /usr/local/bin/api
# 7. Run the api binary
CMD ["api"]
# Path: backend/Dockerfile