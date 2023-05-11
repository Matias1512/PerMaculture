# Rust as the base image
FROM rust:1.69 as builder
WORKDIR /app
COPY . .
RUN cargo build --release
# Copy the build artifact to the production image
FROM debian:buster-slim AS runtime
# Install dependencies
RUN apt-get update && apt-get install -y libpq-dev libpq5
COPY --from=builder /app/target/release/plantera-api-v1 .
COPY --from=builder /app/Rocket.toml .
# Run the api binary
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["./plantera-api-v1"]
# Path: backend/Dockerfile
