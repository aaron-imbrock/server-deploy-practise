# Repo Setup

## Github

Create a new repository at GitHub.
  - Select the “Add a README” option
  - Select the “Add a .gitignore” option, and choose Node.js
  - Opt for the MIT license

Clone this repo to your local machine.

Immediately create a “dev” branch to do your work in git checkout -b dev

## Build out project

```
npm init
npm install cors dotenv express jest supertest
mkdir -p .github/workflows _tests handlers middleware
touch .github/workflows/javascript-tests.yaml _tests/server.tests.js dotenv
touch handlers/{404.js,500.js} middleware/{proof.js,timestamp.js}
cp dotenv .env
```
### .env file contents

The `dotenv` should already have this.

```.env
PORT=3000
```
