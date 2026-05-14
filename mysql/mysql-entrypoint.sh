#!/bin/bash
set -eu

mkdir -p /var/run/mysqld
chown -R mysql:mysql /var/run/mysqld /var/lib/mysql

if [ ! -d /var/lib/mysql/mysql ]; then
  echo "Initializing MySQL datadir at /var/lib/mysql"
  mysqld --initialize --user=mysql --datadir=/var/lib/mysql
fi

exec su -s /bin/bash mysql -c "exec mysqld --console"
