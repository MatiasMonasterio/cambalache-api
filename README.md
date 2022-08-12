## Get Started
### Prerequisites
You need to be using:

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node - [Download & Install Node](https://nodejs.org/es/download/)
- Node Version Manager - [Dowload & Install NVM](https://github.com/nvm-sh/nvm)
- Yarn - [Dowliad & Intall Yarn](https://yarnpkg.com/)
- Docker Compose - [Dowload & Install Docker](https://docs.docker.com/compose/)

### Docker Compose
This project is ready to work with docker-compose to initalize the needed stack during development process.
To start working, run the following commands:

```bash
docker-compose build
docker-compose up
```

### Environment Variables
Create an `.env` file in the root project and provide the following values:

```bash
PORT=3001

DATABASE_URL=postgresql://develop:develop@127.0.0.1:5432/develop
REDIS_URL=redis://127.0.0.1:63

JWT_SECRET=somevaluetouse
```

### Run locally
You need Node v16.15.0 Set versions manually or with nvm:
```bash
nvm use
```

Install the required libraries and packages dependencies
```bash
yarn install
```

Run prisma migrate and generate to use prisma client and types in proyect
```bash
yarn prisma:migrate
yarn prisma:generate
```

Run the development server
```bash
yanr dev
```

You can quickly have a look at the data of your local database and check if your app is working correctly with prisma studio
```bash
yarn prisma:studio
```

### Production
You can create a production build with
```bash
yarn build
```

## Documentation
Uou can access the documentation available in [production](https://cambalache-apirest.herokuapp.com/documentation/)