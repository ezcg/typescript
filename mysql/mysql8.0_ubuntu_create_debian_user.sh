#!/bin/bash

#service mysql status
#mysqladmin: connect to server at 'localhost' failed
#error: 'Access denied for user 'debian-sys-maint'@'localhost' (using password: YES)'
debianPassword=$(grep -m 1 -oP "(?<=password =).*$" /etc/mysql/debian.cnf | tr -d ' ')
printf "\n"
echo "debian password from /etc/mysql/debian.cnf: ${debianPassword}"
printf "\n"
#mysql -uroot -proot -e "CREATE USER 'debian-sys-maint'@'localhost' IDENTIFIED BY '${debianPassword}'"
#mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'debian-sys-maint'@'localhost' WITH GRANT OPTION";
#mysql -uroot -proot -e "FLUSH PRIVILEGES";
#mysql -uroot -proot -e "select Host, User from mysql.user where user='debian-sys-maint'\G"

#Starting with MySQL 8 you no longer can (implicitly) create a user using the GRANT command. Use CREATE USER instead, followed by the GRANT statement
printf "\n"
echo "CREATE USER 'debian-sys-maint'@'%' IDENTIFIED BY '${debianPassword}';"
printf "\n"
mysql -uroot -proot -e "CREATE USER 'debian-sys-maint'@'%' IDENTIFIED BY '${debianPassword}';"

printf "\n"
echo "GRANT ALL PRIVILEGES ON *.* TO 'debian-sys-maint'@'%' WITH GRANT OPTION;"
printf "\n"
mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'debian-sys-maint'@'%' WITH GRANT OPTION;"

printf "\nFLUSH PRIVILEGES;\n"
mysql -uroot -proot -e "FLUSH PRIVILEGES;"

# I was getting error after running service mysql status:
# mysqladmin: connect to server at 'localhost' failed
# error: 'Access denied for user 'debian-sys-maint'@'localhost' (using password: YES)'
# and adding localhost even though the wildcard % is used for debian-sys-main user enables service mysql status to run
mysql -uroot -proot -e "CREATE USER 'debian-sys-maint'@'localhost' IDENTIFIED BY '${debianPassword}';"
mysql -uroot -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'debian-sys-maint'@'localhost' WITH GRANT OPTION;"
mysql -uroot -proot -e "FLUSH PRIVILEGES;"

printf "\nselect Host, User from mysql.user where user='debian-sys-maint'\G\n"
mysql -uroot -proot -e "select Host, User from mysql.user where user='debian-sys-maint'\G"

printf "\n\n========Run: service mysql status============\n\n"
service mysql status

