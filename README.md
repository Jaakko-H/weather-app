# Weatherapp

This is a simple web application which reports the current weather and forecasts the upcoming weather in the user's location (or Helsinki if the user does not allow the use of location data) within a few hours from the current time, based on the [OpenWeatherMap](https://openweathermap.org/).

This was an exercise to practise and demonstrate the use of ReactJS, NodeJS, Docker & Docker-compose, Vagrant and some other technologies. It uses ReactJS on the front end and NodeJS on the back end. The app can be run with either Docker & Docker-compose on your own machine or with Vagrant which builds a virtual machine and installs everything for you automatically.

## Prerequisites

* An [OpenWeatherMap](http://openweathermap.org/) API key.
* [Docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/) installed
 OR [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/) or alternative provider.

## Getting Started

Create a file named `api_keys.env` in the `docker/` directory at the project root and place your OpenWeatherMap API key there. The file content should be as follows: `APPID=<Place your API key here>`.

## Running The Application

### With Vagrant

1. Open a new command line terminal and cd to the `vagrant/` directory of the project root, where the file called `Vagrantfile` is located.

2. Execute the command `vagrant up`. This will create + start a new virtual machine for you, an isolated and identical development environment for any developer in which to run applications with ease. It will install all the prerequisite technologies like Docker & docker-compose, build Docker images from both back end- and front end-applications and start them up for you.

NOTE: Executing the command on the first time always takes a little more time as Vagrant builds the machine from scratch and executes each stage, but will speed up on subsequent times as the machine and the Docker containers only need to start up.

3. Verify that the machine and the Docker containers started properly by checking that the console logged `done` on both weatherapp_frontend and weatherapp_backend containers. After this the application should be ready to use within 15 seconds.

NOTE: If something failed, try to resolve the issue from the console log and refer to the [Vagrant](https://www.vagrantup.com/) documentation. You may try to debug and run commands in the virtual machine manually by executing the command `vagrant ssh` in the same directory where you executed `vagrant up`.

4. Open the address `localhost:8000` in your internet browser of choice.

### With Docker & Docker-compose

1. Start your Docker service, refer to the [Docker](https://www.docker.com/) documentation.

2. Make sure you have [Node](https://nodejs.org/en/) installed on your computer. Execute `npm install` in both `backend/` and `frontend/` directories. This is executed also in case in the Docker image build, but it may lead to errors about missing packages like webpack-dev-server if not first executed on the host machine. TODO: The reason why it happens is currently unknown, find out why it happens.

3. Build your application images by executing command in the `backend/` directory: `docker build -t weatherapp_backend .` (Include the dot at the end of the command). Then execute command in the `frontend/` directory `docker build -t weatherapp_frontend .` (Include the dot at the end of the command).

4. Go to the `docker/` directory and execute command `docker-compose up -d`. After this the application should be ready to use within 15 seconds.

5. Open the address `localhost:8000` in your internet browser of choice.

## About The Development Environment

Once you have your docker containers up and running, all the files located in your local `backend/` and `frontend/` directories will be fully synced with the containers, meaning that when you make changes to the application source files, the applications running in the containers will reload automatically (Hot reload).

## Running tests

This application has been partially covered with unit tests to demonstrate the use [Mocha](https://mochajs.org/) and [Nock](https://github.com/nock/nock). No integration tests were made due to time limitations.

To run the tests, execute the command `npm test` in either `backend/` or `frontend/` directory or find your way to execute the tests in your IDE.

## Running linters

This application should be currently clear of any linter errors.

To run the ESLint, execute the command `npm run lint` in either `backend/` or `frontend/` directory or enable a linter in your IDE.
