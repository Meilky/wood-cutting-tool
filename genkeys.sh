mkdir -p keys

openssl genrsa -out keys/private-key.pem 2048

openssl rsa -in keys/private-key.pem -pubout -out keys/public-key.pem
