This was created in a week during my time as a student at Code Chrysalis.


# Twin Shot

Twin shot is a web application that helps you keep up to date with your favourite football teams and leagues.
<br>
<br>


# Live Demo

[Youtube video](https://youtu.be/ehJdRiQPOB4)


# Getting Started

### Installing dependencies

First, install the dependencies in the root folder:

```
  $ npm install
```

Then change to frontend and install as follows:

```
  $ cd frontend
  $ npm install
```

### Running the app

To run the server with nodemon in the root folder:

```
  $ npm start
```

To start the frontend, change to frontend and run the following script:

```
  $ cd frontend
  $ npm start
```

### Adding local environment:

Create a .env.local file in your root folder (Don't forget to add this file in your .gitignore file)

You should add the following information:


DATABASE INFORMATION (Please note that this project is created and prepered to use only Postgres databases):

DB_USER= ``` - YOUR DATABASE USERNAME ```

DB_NAME= ``` - YOUR DATABASE NAME FOR THIS PROJECT ```

DB_PASSWORD= ``` - YOUR DATABASE PASSWORD ```
<br>
<br>


NODE ENVIRONMENT

NODE_ENV=development
<br>
<br>


SECRET TOKEN FOR JWT

SECRET_TOKEN= ``` - YOUR SECRET TOKEN FOR JWT ```
<br>
<br>


API KEYS

API_KEY= ``` - YOUR SECRET API KEY ```

API_URL=https://v3.football.api-sports.io

API_HOST=v3.football.api-sports.io


You can get an API Key by going to the following link: [API FOOTBALL](https://dashboard.api-football.com/register)
<br>
<br>

### Setting up your DB


You should be in the root folder when you run these scripts:

- To run the migration:

```
  $ npm run migrate:latest
```

- To run the seeds:

```
  $ npm run seed:data
```

# Resources

- [Node.js](https://nodejs.org/en/)
- [express](https://expressjs.com/)
- [knex](https://knexjs.org/)
- [jsonwebtoken](https://jwt.io/)
- [connect-timeout](http://expressjs.com/en/resources/middleware/timeout.html)
- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Moment.js](https://momentjs.com/)


# Contributors
Feel free to check out my github page and see what other projects I have worked on! 😎
<table>
  <tr>
    <td align="center"><a href="https://github.com/calss0t"><img src="https://avatars.githubusercontent.com/u/107403548?v=4" width="200px;" alt=""/><br /><sub><b>Pol Texido</b></sub></a></td>
  </tr>
</table>



