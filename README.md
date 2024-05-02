# Registration and Login Form Validation

This project provides a pre-built and pre-styled HTML register/login page that contains two separate forms. The forms initially have no validation. The `index.js` file contains the JavaScript code that adds validation to these forms.

## Project Structure

The project consists of three main files:

- `index.html`: This file contains the HTML structure of the register/login page. It includes two forms, one for registration and one for login.

- `style.css`: This file contains the CSS styles for the register/login page.

- `index.js`: This file contains the JavaScript code that adds validation to the forms on the register/login page.

## Validation

The validation is implemented using JavaScript event listeners. Whenever a form is submitted, the input values are checked against a set of requirements. If any of these requirements fail, an appropriate error message is displayed to the user, and the form does not submit.

### Registration Form Validation

The registration form requires the following fields: username, email, password, password confirmation, and terms acceptance. The validation requirements for these fields are as follows:

- Username: Must not be blank, must be at least four characters long, must contain at least two unique characters, and cannot contain any special characters or whitespace.
- Email: Must not be blank, must include an '@' symbol (not at the beginning), must include a domain name after the '@' symbol, must be a valid email address, and must not be from the domain example.com.
- Password: Must be at least 12 characters long, must have at least one uppercase and one lowercase letter, must contain at least one number, must contain at least one special character, cannot contain the word "password" (in any case), and cannot contain the username.
- Password Confirmation: Must not be blank and must match the password.
- Terms Acceptance: Must be checked.

### Login Form Validation

The login form requires the following fields: username and password. The validation requirements for these fields are as follows:

- Username: Must not be blank and must exist in the registered users.
- Password: Must not be blank and must match the password of the registered user with the given username.

## User Data Storage

The user data is stored in the browser's local storage. Each user's data includes their username, email, and password. The username and email must be unique.

## Error Display

An HTML element with id `errorDisplay` is used to show error messages to the user. The error messages are displayed in red, and success messages are displayed in green. The messages are automatically hidden after 5 seconds.

## Usage

To use this project, open the `index.html` file in a web browser. Fill out the registration form to create a new user, and then fill out the login form to log in as the registered user. If any validation requirements fail, an error message will be displayed. If the form submission is successful, a success message will be displayed.