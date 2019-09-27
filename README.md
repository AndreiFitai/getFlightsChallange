# Coding challange for Comtravo.

Requires npm 6.x and nodeJS v10+

# Setup

1. Clone or copy this repo
2. run `npm install`
3. run `npm test` to run all tests
4. Add .env file with the following variables

`PORT` - Specify alternative port for the service - Defaults to 3000

`RESPONSE_TIME` - Specify max service wait time in ms - Defaults to 900

`BASE_URL` - **Required** API base url

`AUTH_USER` - **Required** API Basic auth user

`AUTH_PASSWORD` - **Required** API Basic auth password

5. Run `npm start`

6. Go to `http://localhost:<PORT>` to check out the results.
