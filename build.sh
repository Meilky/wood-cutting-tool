#!/bin/bash

docker compose build

cd ./ui
npm run clean
npm run build
cd ..

cd ./modules/references
npm run clean
npm run build
cd ../..

cd ./modules/wood-cutting-tool
npm run clean
npm run build
cd ../..
