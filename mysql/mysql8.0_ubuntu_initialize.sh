#!/bin/bash

#this is needed at build by ubuntu22 and ubuntu24 and fixes error:
#ERROR mysqld: File './binlog.index' not found (OS errno 13 - Permission denied)
# https://stackoverflow.com/questions/52719378/failed-to-find-valid-data-directory-mysql-generic-binary-installion/65214867#65214867

printf "\n\nThis script should be executed manually inside the db container and only done once.\n\n"

if [ -f /.dockerenv ]; then
  echo "Running inside a container"
else
  echo "Running outside a container"
  exit 1
fi

numFiles=$(ls -1q /mysql/dbdata | wc -l)
printf "\nnum files found in /mysql/dbdata: ${numFiles}"

if [ "${numFiles}" -lt 1 ]; then
  printf "\nNot finding any files in mysql/dbdata \n"
fi
if [ ! -f /mysql/is_initialized ]; then
  printf "\nnot finding /mysql/is_initialized file so mysql has not been initialized, so initializing it...\n\n"
  touch /mysql/is_initialized
  mysqld --initialize --user=mysql;
else
    printf "\nFound /mysql/is_initialized file so mysql has been initialized, so NOT initializing it...\n\n"
fi;

#. mysql8.0_ubuntu_commentout_bind.sh
