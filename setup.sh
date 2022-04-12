GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

DB_ROOT_PASSWORD="$(openssl rand -base64 32 | sed "s/[^a-zA-Z0-9]//g")"
DB_USER="wcuser"
DB_PASSWORD="$(openssl rand -base64 32 | sed "s/[^a-zA-Z0-9]//g")"
DB_NAME="wcdb"
DB_HOST="wcdb"

echo "${GREEN}Generation lib symlinks ..."

if [ -L "modules/wood-cutting-tool/lib" ]; then
	echo "${RED}Symlink for wood-cutting-tool module already exist${NC}"
else
	ln -rs ./ui/lib ./modules/wood-cutting-tool/lib
fi;

if [ -L "modules/references/lib" ]; then
	echo "${RED}Symlink for references module already exist${NC}"
else
	ln -rs ./ui/lib ./modules/references/lib
fi;

echo "${GREEN}Installing npm modules ...${NC}"

cd ./modules/wood-cutting-tool
npm install
cd ../..

cd ./modules/references
npm install
cd ../..

echo "${GREEN}Creating mariadb folder ...${NC}"

mkdir -p ./mariadb

echo "${GREEN}Creating dist folders ...${NC}"

mkdir -p ./modules/wood-cutting-tool/dist
mkdir -p ./modules/references/dist

echo "${GREEN}Generating keys folder ...${NC}"

if [ -d "keys" ]; then
	echo "${RED}Keys folder already exist${NC}"
else
	mkdir -p keys
fi

echo "${GREEN}Generating private key ...${NC}"

if [ -f "keys/private-key.pem" ]; then
	echo "${RED}Private key already exist${NC}"
else
	openssl genrsa -out keys/private-key.pem 2048
fi

echo "${GREEN}Generating public key ...${NC}"

if [ -f "keys/public-key.pem" ]; then
	echo "${RED}Public key already exist${NC}"
else
	openssl rsa -in keys/private-key.pem -pubout -out keys/public-key.pem
fi

echo "${GREEN}Generating mariadb folder ...${NC}"

if [ -d "mariadb" ]; then
	echo "${RED}Mariadb folder already exist${NC}"
else
	mkdir -p mariadb
fi

echo "${GREEN}Generating .env file ...${NC}"

if [ -f ".env" ]; then
	echo "${RED}.env file already exist${NC}"

	echo "${YELLOW}Overwriting current env value with the ones in the .env file${NC}"

	DB_ROOT_PASSWORD="$(sed -nr "s/^DB_ROOT_PASSWORD=(.*)$/\1/p" .env)"
	DB_USER="$(sed -nr "s/^DB_USER=(.*)$/\1/p" .env)"
	DB_PASSWORD="$(sed -nr "s/^DB_PASSWORD=(.*)$/\1/p" .env)"
	DB_NAME="$(sed -nr "s/^DB_NAME=(.*)$/\1/p" .env)"
else
	touch .env

	echo "DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}" >> .env
	echo "DB_USER=${DB_USER}" >> .env
	echo "DB_PASSWORD=${DB_PASSWORD}" >> .env
	echo "DB_NAME=${DB_NAME}" >> .env
fi

echo "${GREEN}Generating envs folder ...${NC}"

mkdir -p ./envs

echo "${GREEN}Generating envs/.env.services file ...${NC}"

if [ -f "envs/.env.services" ]; then
	echo "${YELLOW}Removing old envs/.env.services file${NC}"

	rm ./envs/.env.services
fi

touch ./envs/.env.services

echo "DB_USER=${DB_USER}" >> ./envs/.env.services
echo "DB_PASSWORD=${DB_PASSWORD}" >> ./envs/.env.services
echo "DB_NAME=${DB_NAME}" >> ./envs/.env.services
echo "DB_HOST=${DB_HOST}" >> ./envs/.env.services

unset GREEN
unset RED
unset NC
unset YELLOW

unset DB_ROOT_PASSWORD
unset DB_USER
unset DB_PASSWORD
unset DB_NAME
unset DB_HOST
