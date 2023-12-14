# Docker Compose React, Nodejs and MySQL example

Install docker desktop 

Git clone repo : 

Run following commands : 

## Run the System
We can easily run the whole with only a single command:
```bash
docker compose up
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker compose down
```

## To stop all running containers and remove all stopped containers
If you need to remove all containers, use the command:
```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```


## Stop the System and removing everything
If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker compose down --rmi all
```

