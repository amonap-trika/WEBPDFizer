# Docker Compose React, Nodejs and MySQL example

Install docker desktop :
    Depending on your laptop OS (windows, linux, mac), install docker destop.
    Link : https://docs.docker.com/desktop/install/windows-install/

Git clone repo : https://github.com/trikatechnologies/WEBPDFizer.git

## ********************************************** For Local setup *******************************************************

## Run the System
We can easily run the whole with only a single command:
```bash
docker compose up
```

## ********************************************** Stop / Start project *******************************************************


## check running containers 
```bash
docker ps
```

## Stop running containers 
```bash
docker stop $(docker ps -a -q)
```


## Start containers 
```bash
docker ps -a
docker start webpdfizer-frontend-1 webpdfizer-phpmyadmin-1 webpdfizer-backend-1 webpdfizer-mysqldb-1
```

## ********************************************** For removing the containers & images *******************************************************

## To stop all running containers and remove all stopped containers
If you need to remove all containers, use the command:
```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```


## Removing Everything
If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker compose down --rmi all
```



