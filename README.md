# TODO API

This todo api, lets you:

- Create a user
- Login as that user
- Create, read, update, and delete todos as that user.

Each todo contains a description, a completed status, a datetime it was created, and a datetime is was last updated. You can only view, edit, create, and delete todos that belong to your currently logged in user.

> Base URL: `https://knex-todo.herokuapp.com`

## Auth Endpoints

With these endpoints we can create or login a user to get a JWT that we can send as a Authorization header when doing CRUD operations on our todos as our currently logged in user.

### Register

> **POST** `/api/auth/register`

Registers a user to the database and returns a JWT in the response as token.

Example body of POST request:

```json
{
  "username": "NewUser",
  "email": "newuser@gmail.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "Welcome NewUser! 🔥",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoidXNlciIsImlkIjoyLCJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJlbWFpbCI6Im5ld3VzZXJAZ21haWwuY29tIiwiaWF0IjoxNjM3MTY3Nzk1LCJleHAiOjE2Njg3MjUzOTV9.E98K9IhNQK2J0_x8muNPyL1scU2OUn7X5Ew6R8ntDdY"
}
```

### Login

> **POST** `/api/auth/login`

Registers a user to the database and returns a JWT in the response as token.

Example body of POST request:

```json
{
  "username": "NewUser",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "Welcome NewUser! 🔥",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoidXNlciIsImlkIjoyLCJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJlbWFpbCI6Im5ld3VzZXJAZ21haWwuY29tIiwiaWF0IjoxNjM3MTY3Nzk1LCJleHAiOjE2Njg3MjUzOTV9.E98K9IhNQK2J0_x8muNPyL1scU2OUn7X5Ew6R8ntDdY"
}
```

## Todo Endpoints

Once you have created a user and have a JWT access token, you must add an Authorization header with the value of this JWT to all of your todo API calls. This is so that you cannot CRUD another users todos, and if you try, you will get an error (unless you find a way to steal their JWT).

> Example header: `Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoidXNlciIsImlkIjoyLCJ1c2VybmFtZSI6Ik5ld1VzZXIiLCJlbWFpbCI6Im5ld3VzZXJAZ21haWwuY29tIiwiaWF0IjoxNjM3MTY3Nzk1LCJleHAiOjE2Njg3MjUzOTV9.E98K9IhNQK2J0_x8muNPyL1scU2OUn7X5Ew6R8ntDdY`

### Create A New Todo

> POST `/api/todos`

Example body:

```json
{
  "description": "Get heroku postgres ssl setup",
  "completed": false
}
```

Example response:

```json
{
  "id": 2,
  "description": "Get heroku postgres ssl setup",
  "completed": false,
  "userId": 2,
  "date": "1637165861",
  "updatedAt": "1637166435"
}
```

### Edit A Todo

Edit a todo, add the id of a todo that belongs to your user as a path variable to the endpoint when making a request.

> PUT `/api/todos/:id`

Example body:

```json
{
  "completed": true
}
```

Example response:

```json
{
  "id": 2,
  "description": "Get heroku postgres ssl setup",
  "completed": false,
  "userId": 2,
  "date": "1637165861",
  "updatedAt": "1637168401"
}
```

### Get All User Todos

Returns a list of all todos that belong to your currently logged in user.

> GET `/api/todos`

Example response:

```json
[
  {
    "id": 2,
    "description": "Get heroku postgres ssl setup",
    "completed": false,
    "userId": 2,
    "date": "1637165861",
    "updatedAt": "1637168401"
  }
]
```

## Get A Specific User Todo

To get a specific todo from a user add the id of that todo to the end as a path variable.

> GET `/api/todos/:id`

Example response:

```json
{
  "id": 2,
  "description": "Get heroku postgres ssl setup",
  "completed": false,
  "userId": 2,
  "date": "1637165861",
  "updatedAt": "1637168401"
}
```

### Delete A User Todo

> DELETE `/api/todos/:id`

Deletes a todo that belongs to the user from the database.

Example response:

```json
{
  "message": "Message has been successfully deleted 💣"
}
```
