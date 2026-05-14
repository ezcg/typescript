#!/bin/bash

#For Windows, remove trailing \r character by running on the cmd line:
#sed -i 's/\r$//' docker_init.sh

printf "\n\n===============================running docker_init.sh\n\n"

touch /root/.bashrc
echo "alias ll='ls -ltra'" > /root/.bashrc
echo "set statusline=%f
set pastetoggle=<F2>
set smartcase
set number
set tabstop=4
set shiftwidth=4
set softtabstop=4
set smartindent
set autoindent
hi apacheComment guifg=white
set syntax=php
au BufRead,BufNewFile *.html,*.php,*.phtml,*.inc setfiletype php " > /root/.vimrc

printf "\n\nRunning 'npm run-script startdev'\n\n"
# the "depends on" in docker-compose doesn't give enough time for mysql to start and
# only seems to ensure container
# is created, so wait 5 seconds before starting node server otherwise
# connection refused from db error
sleep 5
if [ ! -d node_modules ]; then
  npm install
fi
exec npm run-script startdev
