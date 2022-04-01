FROM rust:latest AS builder

RUN update-ca-certificates

ENV USER=wcauth
ENV UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nothing" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"


WORKDIR /usr/src/wood-cutting-auth

RUN rustup override set nightly

RUN echo "fn main() {}" > dummy.rs
COPY ./Cargo.toml .
RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml
RUN cargo build --release
RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml

COPY ./src ./src
COPY ./Cargo.toml .

RUN cargo install --path . --root . --force

FROM debian:bookworm-slim

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /home/wcauth

COPY --from=builder /usr/src/wood-cutting-auth/bin/wcauth /usr/local/bin/wcauth

USER wcauth:wcauth

CMD ["wcauth"]
