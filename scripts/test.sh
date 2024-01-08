#!/bin/bash

if [[ $CI == "true" ]]; then
  npm i --silent
fi

npm run test -- --ci --watchAll=false