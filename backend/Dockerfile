FROM rust

RUN apt update && apt install -y libpq-dev

RUN cargo install diesel_cli --no-default-features --features postgres

WORKDIR /usr/src/plantera-backend


COPY . .

RUN cargo install --path .

EXPOSE 8081

CMD ["plantera-backend"]