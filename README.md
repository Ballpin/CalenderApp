# Calender app

- [Calender app](#calender-app)
  * [Requirements](#requirements)
  * [First Time Instructions](#first-time-instructions)
  * [Docker](#docker)
    + [Info](#info)
    + [Commands](#commands)
  * [File Structure](#file-structure)
  * [Rest API](#rest-api)


## Requirements

- Docker (https://www.docker.com/products/overview)
- Docker-Compose (https://docs.docker.com/compose/install/)
- Nodejs (https://nodejs.org/en/download/package-manager/)
- Webpack v1.X (https://github.com/webpack/webpack)
- Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)





## First Time Instructions



1. Clone the project

```
$ git clone git@github.com:Ballpin/CalenderApp.git
```

2. Migrate the database


```
$ docker-compose run web python manage.py migrate
```

3. Run the Docker Container

```
$ docker-compose up
```

4. Run Create Super User Wizard, follow the steps.

```
$ docker-compose run web python manage.py createsuperuser
```

5. Migrate the database

```
$ docker-compose run web python manage.py migrate
```



## Docker

### Info

When using this docker container there is no need to build it over and over unless changes have been made in **requirements.txt**. This is because we need python to install all Django dependencies before it runs everything else.



### Commands

Run Docker Container

```
$ docker-compose run
```

Stop Docker Container

```
$ docker-compose stop
```

Build Docker Container

```
$ docker-compose build
```

Rebuild & Run Docker Container

```
$ docker-compose up --build
```



## File Structure

- CalenderApp - Django Project Files
- event - Backend App Files
- frontend - All Frontend files
  - app - frontend files
  - templates - Django Templates (uses Django Language)
  - scss - App Styles
  - webpack_bundles - files being generated from Webpack
- manage.py - Manage Django Project



## REST API

### Get a list of all Events. 

**Request**

```javascript
GET http://localhost:8000/api/
```

**Allowed For:**

- Public

**Example Response**

```json
STATUS: HTTP 200 OK
Content-Type: application/json


[
    {
        "id": 2,
        "Title": "Event 2",
        "Start_Time": "2017-01-11T10:44:12.030105Z",
        "End_Time": "2017-01-11T11:01:04.537832Z"
    },
    {
        "id": 3,
        "Title": "Event 1",
        "Start_Time": "2017-01-11T10:44:12.030105Z",
        "End_Time": "2017-01-11T11:01:04.537832Z"
    }
]
```



### Create Event

```javascript
POST http://localhost:8000/api/
```
**Allowed For:**

- Administrators

**Example Response**

```json
Status: HTTP 201 Created
Content-Type: application/json

{
    "id": 4,
    "Title": "Event 432",
    "Start_Time": "2017-01-11T10:44:12.030105Z",
    "End_Time": "2017-01-11T11:01:04.537832Z"
}
```



### Update Event

```javascript
PUT http://localhost:8000/api/{event_id}
```

**Allowed For:**

- Administrators

**Example Response**

```json
Status: HTTP 200 OK
Content-Type: application/json

{
    "id": 4,
    "Title": "Event 1",
    "Start_Time": "2017-01-11T10:44:12.030105Z",
    "End_Time": "2017-01-11T11:01:04.537832Z"
}
```



### Delete Event

```javascript
DELETE http://localhost:8000/api/{event_id}
```

**Allowed For:**

- Administrators

**Example Response**

```javascript
HTTP 204 No Content
Content-Type: application/json
```
