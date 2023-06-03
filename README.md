## Description

the IssueTracker is a [Nest.js](https://github.com/nestjs/nest) App for handling issues from the GITEA API and sending them to the [Discord](https://discord.com/) API on a specific server channel as dashboard and on member DMs as notifications.

## Installation

Fill the .env file with the variables from the .env.example file, the interval are using the Nest.js [Schedule](https://docs.nestjs.com/techniques/caching) module, so you can use the [cron](https://crontab.guru/) format.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](LICENSE).
