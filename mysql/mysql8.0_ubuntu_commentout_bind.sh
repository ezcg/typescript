#!/bin/bash

# this has been moved to mysql8.0_ubuntu24_Dockerfile

# ERROR 2003 (HY000): Can't connect to MySQL server on 'db:3306'
# comment out  bind-address = 127.0.0.1 in /etc/mysql/mysql.conf.d/mysqld.cnf
# change   bind-address = 127.0.0.1
# to      #bind-address = 127.0.0.1

# this has been moved to mysql8.0_ubuntu24_Dockerfile

match=$(cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep "^bind-address[^=].*$");
if [ -z "${match}" ]; then
  printf "\n\nDid not find a bind-address that was not uncommented.\n\n"
  match2=$(cat /etc/mysql/mysql.conf.d/mysqld.cnf | grep "bind-address[^=].*$");
  printf "\n\nHowever, this was found:"
  echo "${match2}"
  printf "\n\nDid not uncomment anything new.\n\n"
else
  sed -i "s/${match}/#${match}/g" /etc/mysql/mysql.conf.d/mysqld.cnf
  printf "\n\ncommented out  bind-address = 127.0.0.1 in /etc/mysql/mysql.conf.d/mysqld.cnf\n\n"
fi

service mysql restart
