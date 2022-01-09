# Installation

Get started with Makefile:

1. Run `make fileMode`
2. Run `make files`
3. Run `make install`
4. Run `make up`
4. Run `make migration`
5. Run `make start`

Get started without Makefile:

1. Copy `.env.example` to `.env` 
2. Copy `docker-compose.yml.example` to `docker-compose.yml`
3. Edit the `docker-compose.yml` with your Docker information
4. Checks database settings in `.env` file
5. Run `docker-compose up -d` command
6. Run `sudo chmod 777 -R dist/;sudo chmod 777 -R node_modules/` command
7. Run `sudo mkdir logs;sudo chmod 777 -R logs/` command
8. Run `yarn typeorm migration:run` in Docker container to run all migrations
9. Run `docker exec -it node-rest bash -c "npm start"` to start server

# Project information

This project is a simple Rest API for register of users. Here is used Typescript, a statically compiled language to write clear and simple Javascript code.

- When starting the server, the tables are created automatically 
- Create migrations with `yarn typeorm migration:create -n MigrateName` in Docker container
- If for some reason you want to revert the changes, you can run: `yarn typeorm migration:revert` in Docker container
- To get help about the TypeORM, run `yarn typeorm --help` in Docker container

# Using the project

Example of request (POST): 

    {
        "username": "myname",
        "email": "myemail@email.com",
        "password": "mypassword",
        "firstName": "myfristname",
        "lastName": "mylastname"
    }

`To register a user`, send request (POST) to URL http://10.10.0.22:4000/api/auth/signup in Postman (or another).

`To login with user`, send request (POST) to URL http://10.10.0.22:4000/api/auth/signin. You will receive a JWT token in request header (auth-token) as soon as you enter.

`To get a registered user`, send request (GET) to URL http://10.10.0.22:4000/api/auth/profile?API_KEY=Your-JWT-Token

