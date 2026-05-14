When docker spins mysql up, this mysql directory becomes /mysql directory 
in the docker container (as set in docker-compose.yml 'working directory').

After build (bash dcBuild.sh) in db docker container run in this order:

bash mysql8.0_ubuntu_initialize.sh
service mysql start
bash mysql8.0_ubuntu_set_password.sh
bash mysql8.0_ubuntu_create_debian_user.sh
bash mysql8.0_ubuntu_commentout_bind.sh
mysql -uroot -proot -e "create database s3onlysite;"



import data as needed
mysql -uroot -proot --host=db s3onlysite < file.sql

