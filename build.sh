#!/bin/bash

docker compose build

cd ./ui
npm run build
cd ..

cd ./modules/references
npm run build
cd ../..

cd ./modules/wood-cutting-tool
npm run build
cd ../..
