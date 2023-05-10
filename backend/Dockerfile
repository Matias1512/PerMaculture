FROM rust:1.69

ENV ROCKET_ADDRESS=0.0.0.0
ENV ROCKET_PORT=8000

EXPOSE 8000

WORKDIR /app
COPY . .

RUN rustup default nightly
RUN cargo build

CMD ["cargo", "run"]