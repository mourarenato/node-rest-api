# Installation

Steps to run this project:

1. Copy `.env.example` to `.env` 
2. Copy `docker-compose.yml.example` to `docker-compose.yml`
3. Edit the `docker-compose.yml` with your Docker information
4. Setup database settings inside `.env` file
4. Run `docker-compose up --build` command
5. Run `sudo chmod 777 -R /dist` command
6. Run `yarn typeorm migration:run` in Docker container

# Project information

This project is a simple Rest API for register of users. Here is used Typescript, a statically compiled language to write clear and simple Javascript code.

- When starting the server, the tables are created automatically 
- Create migrations with `yarn typeorm migration:create -n MigrateName` in Docker container
- If for some reason you want to revert the changes, you can run: `yarn typeorm migration:revert` in Docker container
- To get help about the TypeORM, run `yarn typeorm --help` in Docker container

# Using the project

Example of request (POST): 

    {
        username: myname;
        email: myemail@email.com;
        password: mypassword;
        firstName: myfristname;
        lastName: mylastname;
    }

`To register a user`, send request (POST) to URL http://10.10.0.22:4000/api/auth/signup in Postman (or another).

`To login with user`, send request (POST) to URL http://10.10.0.22:4000/api/auth/signin. You will receive a JWT token in request header as soon as you enter.

`To get a registered user`, send request (GET) to URL http://10.10.0.22:4000/api/auth/profile?API_KEY=Your-JWT-Token

