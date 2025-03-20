# Ready! App Backend

![NestJS](https://img.shields.io/badge/NestJS-v9.2.0-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.7.4-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18.12.1-green.svg)

This is the backend of a food ordering application for buffets, called Ready!. This project is built with Node.js, NestJS, MikroORM, and uses MySQL as a database. For hosting, we're using AWS. The API documentation can be found at the [swagger endpoint](https://api.ready-app.hu/swagger). For additional documentation, please refer to [Ready! documentation](https://drive.google.com/file/d/1SMGwYmW9nkTO2xtO6EGc94nnzsH-iUwd/view?usp=sharing).

## Build

To build the backend, please use the following command:

```bash
npm run build
```

## Seed

To rebuild, and seed the database with initial data, please use the following command (THIS DELETES DATA PREVIOUSLY STORED IN THE DB):

```bash
npm run seed
```

## Run

To start the server, please use the following command:

```bash
npm run start:prod
```

Please make sure to configure the environment variables before running the server. Available environment variables can be found here: [.env.template](.env.template)

## Users for testing

### Admin
•	kekesi.adam@students.jedlik.eu

•	Supa$3cr3t!!!

### Buffet owner

•	bela123@gmail.com

•	Jelszo123$!

### Customer

•	elek@gmail.com

•	Jelszo123$!


For any questions or issues, please contact the project maintainers.
