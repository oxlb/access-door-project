# Access Door Control Program

## Overview

This document outlines the functionality of an Access Door Control Program. The program is designed to manage access to a secure door, determining whether individuals are allowed to enter based on specific access rules.

## Functionality

The program performs the following key functions:

1.  **Access Check**:

    - Determines whether a person is allowed to enter.
    - Checks if the access request includes an identification parameter (ID).

2.  **Error Handling**:

    - If a person is not allowed to enter, the program throws an appropriate error, indicating access denial.

3.  **Logging**:

    - If access is granted, the program logs a record in the database detailing the access event.

## Access Rules

The program operates under the following rule for granting access:

- A person is allowed to enter if:
  - The access request includes an identification parameter (ID).
  - The name of the person is "Joe".

## Code Coverage

![Code Coverage](https://github.com/oxlb/access-door-project/blob/F-Stage-2/coverage-2.png)

## Use Case

#### Use Case 1

![Use Case 1](https://github.com/oxlb/access-door-project/blob/F-Stage-2/case-1.png)

#### Use Case 2

![Use Case 2](https://github.com/oxlb/access-door-project/blob/F-Stage-2/case-2.png)

#### Use Case 3
![Use Case 3](https://github.com/oxlb/access-door-project/blob/F-Stage-2/case-3.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 16 or NVM
- npm
- PostgreSQL

### Installing

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/oxlb/access-door-project.git
    ```

    ```bash
    cd access-door-project
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**

    - Create a `.env` file in the root directory.
    - Copy data from sample file `.env` created under `env` folder

### Database Setup

You have two options for running `PostgreSQL`:

1.  **Local Installation:** You can install `PostgreSQL` directly on your local machine.
2.  **Docker Installation:** Alternatively, you can use [Docker Desktop](https://www.docker.com/products/docker-desktop/) to run `PostgreSQL` as a Docker container.
    Desktop](https://www.docker.com/products/docker-desktop/)

#### Start the Docker Containers

Use Docker Compose to build and start the Docker `Postgres` containers defined in the `docker-compose.yml` file:

```bash
docker-compose up -d
```

The `-d` flag runs the containers in the background.

1.  **Run Knex Migrations:**

    - To set up your database schema:

      `npx knex migrate:latest`

2.  **Rollback Migrations (if needed):**

    - To revert the latest migration:

      `npx knex migrate:rollback`

### Running the Application

- **Start the application in local environment:**

  ```bash
  npm run start
  ```

- **Start the application in staging environment:**

  ```bash
  npm run start:stage
  ```

- **Start the application in production environment:**

  ```bash
  npm run start:prod
  ```

### Running Tests

- **Run tests with Jest:**

  ```bash
  npm test
  ```

### Linting and Formatting

- **Run ESLint to identify issues:**

  ```bash
  npm run lint
  ```

- **Automatically fix ESLint issues:**

  ```bash
  npm run lint:fix
  ```

- **Format code using Prettier:**

  ```Bash
  npm run format
  ```

### Stop and Remove the Containers

To stop and remove the Docker containers when you are done, run:

bashCopy code

```Bash
docker-compose down
```

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Knex.js](http://knexjs.org/) - SQL query builder
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Jest](https://jestjs.io/) - Testing Framework

## Author

- **Munish Kapoor**

## License

This project is licensed under the ISC License.
