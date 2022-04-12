# ------------------------------------------------------------------------------
# Cargo Build Stage
# ------------------------------------------------------------------------------

FROM rust:latest AS builder

WORKDIR /usr/src/wcapi

RUN rustup override set nightly

COPY Cargo.toml Cargo.toml

RUN mkdir src/

RUN echo "fn main() {println!(\"Man you fucked up so damm bad, this shit doesn't even build!!!\")}" > src/main.rs

RUN cargo build --release

RUN rm -f target/release/deps/wcapi*

COPY ./src ./src

RUN cargo build --release

# ------------------------------------------------------------------------------
# Final Stage
# ------------------------------------------------------------------------------

FROM debian:bookworm-slim

RUN adduser --disabled-password --shell /bin/sh wcapiuser

WORKDIR /home/wcapiuser/bin/

COPY --from=builder /usr/src/wcapi/target/release/wcapi .

RUN chown wcapiuser:wcapiuser wcapi

USER wcapiuser

CMD ["./wcapi"]
