FROM rust:latest AS builder

RUN update-ca-certificates

ENV USER=wcapi
ENV UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nothing" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"


WORKDIR /usr/src/wood-cutting-api

RUN rustup override set nightly

RUN echo "fn main() {}" > dummy.rs
COPY ./Cargo.toml .
RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml
RUN cargo build --release
RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml

COPY ./src ./src
COPY ./Cargo.lock .
COPY ./Cargo.toml .


RUN cargo install --path . --root . --force

FROM debian:bookworm-slim

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

WORKDIR /home/wcapi

COPY --from=builder /usr/src/wood-cutting-api/bin/wcapi /usr/local/bin/wcapi

USER wcapi:wcapi

CMD ["wcapi"]
