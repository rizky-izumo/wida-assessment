## Description

Wida task for Invoice APIs

## Pre-requisite

Ensure Node v22 or above is installed in your system with npm package manager along with Docker.

## Project setup

```bash
# Clone and install libraries
$ git clone https://github.com/rizky-izumo/wida-assessment.git
$ cd wida-assessment
$ cd Express
$ npm install

# Install knex as global to run knex command
$ npm install -g knex
```

## Compile and run the project

```bash
# Environment prep
$ cp .env.example .env
$ docker compose --env-file .env up -d

# Setup PostgreSQL
$ knex migrate:latest

# Optional (but recommend) step to insert seed data. Data can also be used for Postman collection APIs
$ docker compose --env-file .env run --rm db-seed

# Run server
$ npm run dev

```

## To run Section 3 of the assessment
```bash
$ cd Algorithm
$ node algorithm.js
```

## Write-up

- The `npm run dev` is to only be executed within `Express` folder.
- Algorithm/algorithm.js is for Section 3 of Problem solving.
- Postman collection `Wida-APIs.postman_collection.json` file can be imported in Postman to call the APIs in this repository.