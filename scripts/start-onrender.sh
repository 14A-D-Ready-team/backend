#!/bin/bash
if [[ -n $RESET_SCHEMA ]]; then
    ./node_modules/.bin/mikro-orm schema:fresh -r --seed
fi

npm run start:prod