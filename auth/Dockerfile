# ------------------------------------------------------------------------------
# Cargo Build Stage
# ------------------------------------------------------------------------------

FROM rust:latest AS builder

WORKDIR /usr/src/wcauth

RUN rustup override set nightly

COPY Cargo.toml Cargo.toml

RUN mkdir src/

RUN echo "fn main() {println!(\"Man you fucked up so damm bad, this shit doesn't even build!!!\")}" > src/main.rs

RUN cargo build --release

RUN rm -f target/release/deps/wcauth*

COPY ./src ./src

RUN cargo build --release

# ------------------------------------------------------------------------------
# Final Stage
# ------------------------------------------------------------------------------

FROM debian:bookworm-slim

RUN adduser --disabled-password --shell /bin/sh wcauthuser

WORKDIR /home/wcauthuser/bin/

COPY --from=builder /usr/src/wcauth/target/release/wcauth .

RUN chown wcauthuser:wcauthuser wcauth

USER wcauthuser

CMD ["./wcauth"]
