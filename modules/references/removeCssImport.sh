#!/bin/sh

DATA=$(tail -n +2 "./dist/index.js")

echo $DATA > dist/index.js

unset DATA
