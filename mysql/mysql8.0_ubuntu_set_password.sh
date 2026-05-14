#!/bin/bash

printf "\n\nThis script should be executed manually inside the db container after mysql has been initialized and only done once.\n\n"


###
# the file in directory is docker.env, not sure why it is ./dockerenv in this code
###

if [ -f /.dockerenv ]; then
  echo "Running inside a container"
else
  echo "Running outside a container"
  exit 1
fi

if [ -f /mysql/is_initialized ]; then
  echo "mysql appears to have been initialized"
else
  echo "mysql does NOT appear to have been initialized. When mysql is intialized a file /mysql/is_initialized is created and that file is not found."
  exit 1
fi

# get temporary password from error.log
# 2024-08-22T21:25:07.447596Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@    localhost: Zo8Plk#y/lUp
str=$(cat /var/log/mysql/error.log | grep -o "A temporary password is generated for .*: .*$")
printf "\n\n"
echo "${str}"
printf "\n\n"
str2=$(echo "${str}" | grep -o ": .*$")

# remove : and any spaces
password=$(echo "${str2:1}" | tr -d ' ')
printf "The password for root user is:\n"
echo "${password}"
printf "\nThe root user's password will be changed to root.\n"

#change the root user's password to root
mysql --connect-expired-password -uroot -p"${password}" -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'";
#Starting with MySQL 8 you no longer can (implicitly) create a user using the GRANT command. Use CREATE USER instead, followed by the GRANT statement:
mysql -uroot -proot -e "CREATE USER 'root'@'%' IDENTIFIED BY 'root';"
mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;"
mysql -uroot -proot -e "FLUSH PRIVILEGES;"

printf "\n\nCreate, grant and flush done\n\n"
printf "Run: select Host, User from mysql.user where user='root'\G\n\n"
mysql -uroot -proot -e "select Host, User from mysql.user where user='root'\G"
