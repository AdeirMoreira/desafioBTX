#!/bin/bash

export TERM=xterm-256color

npm i
npm run migration:run
# npm run dev
npm run dev

# tail -f /dev/null 