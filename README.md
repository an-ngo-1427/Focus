# Focus

# USER
- # Sign Up
    * As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.
- # Log In
    * As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
    * When I'm on the `/login` page:
        * I would like to be able to enter my email and password on a clearly laid out form.
        * I would like the website to log me in upon successful completion of the lob-up form.
            * So that I can seamlessly access the site's functionality
    * When I enter invalid data on the log-up form:
        * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
        * So that I can try again without needing to refill forms I entered valid data into.
- # Demo User
    * As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
        * When I'm on either the `/signup` or `/login` pages:
            * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.
- # Log Out
    * As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
    * While on any page of the site:
        * I can log out of my account and be redirected to a page displaying recent FauxTweets.
        * So that I can easily log out to keep my information secure.

# TASK
- # Create task
    * As a logged in user, I want to be able to create new tasks
    * I would like to create a task by clicking a button on the homepage '/'
    * I would like to set info of my task through a modal form
- # Complete task
    * When on the homepage '/'
    * I would like to check off tasks
- # edit task
    * When on the homepage '/'
    * I like to click edit button of a task to edit deadlines, tags, checklists, notes, of the task.
- # delete task
    * When on the homepage '/'
    * I like to click delete button to delete a task

# GROUPS
- # Create Groups
    * As a loggin in user. I want to be able to create groups
        * when on '/groups/:groupId'
            * I want to create a group by clicking the create group button
- # Edit Groups
    * As an organizer of the group. I want to be able to edit the group
        * when on '/groups/:groupId'
            * I want to edit group name, members and tasks of the group.
- # delete Groups
    * As an organizer of the group. I want to be able to delete the group
        * when on '/groups/:groupId'
            * I want to  delete the group by clicking the delete button
- # viewing Groups
    * As a logged in user
        * when im on '/groups' page
            * I want to see all the groups that I am a member or the orgainizer of

# REWARDS
- # Gifting Rewards
    * As a logged in user. I want to be able to gift rewards
        * When in the rewards page '/rewards'
            * I want to gift rewards points to my peer by clicking the create button and choose from a list of my peers that I can gift the reward to
- # Viewing Rewards
    * As a logged in user. I want to be able to view all my rewards
        * When in the rewards page'/rewards'
            * I want to see the total rewards points that I have and a history of peers who have gifted me rewards points.

# TASK ITEM CHECKLISTs
- # Creating task checklist
    * As a logged in user. I want to be able to create checklists for my tasks
        * when creating or editting a task in the '/'
            * I want to be able to add multiple checklists to my task
- # deleting task checklist
    * As a logged in user. I want to be able to view my checklist and checkoff as I complete them

# API Documentation

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## TASKS
 - ### Getting all tasks of current user
    * Require Authentication: true
    * Request:
        - Method: GET
        - URL: 'api/tasks/user/:userId'
        - body: none
    * Successful response: 200
        ```json
            {"Tasks":[{
                "id":1,
                "title":"task title",
                "notes": "notes for the task",
                "links": "website links",
                "deadline": "5/12/2024",
                "tag": "creative",
                "difficulty": 2,
                "completed": true,
                "user":{
                    "id":3,
                    "username":"username",
                    "email":"user@aa.io",
                    "first_name":"first",
                    "last_name":"last"
                },
                "group_id":null
            }]
            }
        ```
    * Error response:
        - No tasks found
        ```json
            {
                "message":"tasks not found for user"
            }
        ```

- ### creating task for a user
    * Require Authentication: true
    * Request:
        - Method: POST
        - URL: 'api/tasks/user/:userId/new
        - body:
        ```json
            {
                "title":"task title",
                "notes": "notes for the task",
                "links": "website links",
                "deadline": "5/12/2024",
                "tag": "creative",
                "difficulty": 2
            }
        ```
    * Successful response: 201
    ```json
        {
             "id":1,
                "title":"task title",
                "notes": "notes for the task",
                "links": "website links",
                "deadline": "5/12/2024",
                "tag": "creative",
                "difficulty": 2,
                "completed": true,
                "user":{
                    "id":3,
                    "username":"username",
                    "email":"user@aa.io",
                    "first_name":"first",
                    "last_name":"last"
                },
                "group_id":null
        }
    ```

- ### editting task for a user
    * Require Authentication: true
    * Request:
        - Method: PUT
        - URL: 'api/tasks/:taskId'
        - Body:
        ```json
            {
                 "title":"task title",
                "notes": "notes for the task",
                "links": "website links",
                "deadline": "5/12/2024",
                "tag": "creative",
                "difficulty": 2
            }
        ```
    * Successful Response: 200
        ```json
        {
              "id":1,
                "title":"task title",
                "notes": "notes for the task",
                "links": "website links",
                "deadline": "5/12/2024",
                "tag": "creative",
                "difficulty": 2,
                "completed": true,
                "user":{
                    "id":3,
                    "username":"username",
                    "email":"user@aa.io",
                    "first_name":"first",
                    "last_name":"last"
                },
                "group_id":null
        }

        ```
    * Error response:
        - Task not found, 404
        ```json
            {
                "message":"Task not found"
            }
        ```
        - Unauthorized, 401
        ```json
            {
                "message":"Forbidden"
            }
        ```

- ### deletting task for a user
    * Require Authentication: true
    * Request:
        - Method: DELETE
        - URL: 'api/tasks/:taskId'
        - body: none
    * Successful Response:
        ```json
            {
                "taskId":2
            }
        ```
    * Error Response:
        - Task not found,404
        ```json
            {
                "message":"task not found"
            }
        ```
        - Unauthorized, 401
        ```json
            {
                "message":"Forbidden"
            }
        ```
