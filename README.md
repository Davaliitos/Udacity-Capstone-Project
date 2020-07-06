# Udacity-Capstone-Project

This project is a simple application using AWS Lambda and Serverless framework

# Functionality of the application

This application will allow creating/removing/updating/fetching Game Items. Each Game item can optionally have an attachment image. Each user only has access to Game Items that he/she has created.

# Game items

The application stores Game items, and each Game item contains the following fields:

* `gameId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a Game item (e.g. "The Last of Us")
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a Game item
* `userId` (string) - an id that identifies the user who created the Game item


# Implemented Functions

* `Auth` - this function implements a custom authorizer for API Gateway.

* `GetGames` - returns all Games for a current user. A user id is extracted from a JWT token that is sent by the frontend

It should return data that looks like this:

```json
{
    "items": [
        {
            "createdAt": "2020-07-06T18:23:45.010Z",
            "name": "Sly Cooper",
            "gameId": "38b2de02-11d2-4f87-8963-acf6d5e3c8dc",
            "userId": "google-oauth2|102824975834251176650"
        },
        {
            "createdAt": "2020-07-06T18:23:48.245Z",
            "name": "Sly Cooper 2",
            "gameId": "177ae859-0a0b-4461-94c7-c792279e1de3",
            "userId": "google-oauth2|102824975834251176650"
        }
    ]
}
```

* `CreateGame` - creates a new Game for a current user. A shape of data send by a client application to this function can be found in the `CreateGameRequest.ts` file

It receives a new Game item to be created in JSON format that looks like this:

```json
{
	"name": "Xenoblade Chronicles"
}
```

It should return a new Game item that looks like this:

```json
{
    "item": {
        "gameId": "7b87e9fe-cb41-4655-8c00-70587cba4d9a",
        "name": "Xenoblade Chronicles",
        "createdAt": "2020-07-06T19:24:41.523Z",
        "userId": "google-oauth2|102824975834251176650"
    }
}
```

* `UpdateGame` - updates a Game item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateGameRequest.ts` file

It receives an object that contains one fields that can be updated in a Game item:

```json
{
  "name": "Witcher 3"
}
```

The id of an item that should be updated is passed as a URL parameter.

Returns an empty body.

* `DeleteGame` - deletes a Game item created by a current user. Expects an id of a Game item to remove.

Returns an empty body

* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a Game item.

Returns a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.


# Frontend

The `client` folder contains a web application that can use the API that should be developed in the project.

