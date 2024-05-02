/**
 * Part 1: Introduction
This lab provides a CodeSandbox, linked above, with a pre-built and pre-styled HTML register/login page that contains two separate forms.
Currently, these forms have no validation! Your job is to add validation so that the forms adhere to the requirements outlined below. You can choose to implement this validation using any combination of HTML validation attributes and JavaScript event listeners that you want, as long as it meets the requirements.
Explore the HTML structure that has been provided. You can make changes to the HTML (and CSS), as long as they do not subtract from the original functional intent of the page.
An HTML element with id errorDisplay has been provided as a convenient method of showing error text to the user. In order to show or hide errorDisplay, you must modify its display style attribute.
You can place any text or HTML into errorDisplay.
 */

/**
 * Part 2: General Requirements
To reiterate, these requirements can be completed using any combination of HTML validation attributes and JavaScript event listeners that you want. Consider the right tool for each job before you begin working on it.
General Requirements: Whenever any of these validation requirements fail, an appropriate error should be communicated to the user (in most cases, the actual requirement listed below serves as a good error message), and focus should return to the input element that the error originates from. If any requirements fail, the form should not submit.
 */

//Part 3: Registration Form Validation Requirements
// we start this by getting registration form that needs validation.
const registrationForm = document.getElementById("registration"); // get registration form
const usernameInput = registrationForm.elements["username"]; // get user name
const emailInput = registrationForm.elements["email"]; // get user email
const passwordInput = registrationForm.elements["password"]; // get user password
const passwordCheckInput = registrationForm.elements["passwordCheck"]; // get user repeat password
const termsInput = registrationForm.elements["terms"]; // get user terms check 
const errorDisplay = document.getElementById("errorDisplay");  // get error display field

// function to show error message as well as success message depending on input
function showMessage(message, isSuccess = false) {
    errorDisplay.style.display = "block";
    errorDisplay.textContent = message;
    errorDisplay.style.backgroundColor = isSuccess ? "green" : "#fcc";
    errorDisplay.style.color = isSuccess ? "#fff" : "red";
    setTimeout(() => {
        errorDisplay.style.display = "none";
    }, 5000);
}

// function to validate username
function validateUsername(username) {
    if (username === "") {
        return `The username cannot be blank`
    }
    if (username.length < 4) {
        return `The username must be at least four characters long.`
    }
    if (new Set(username).size < 2) {
        return `The username must contain at least two unique characters.`
    }
    if (/[\s\W]/.test(username)) return `The username cannot contain any special characters or whitespace.`;
}

// Function to validate username
function validateEmail(email) {
    const emailVal = email;

    const atpos = emailVal.indexOf('@');
    const dotpos = emailVal.lastIndexOf('.');

    if (email === '') {
        return 'Please provide an email';
    }

    if (atpos < 1) {
        return 'Your email must include an @ symbol, which must not be at the beginning of the email.';
    }

    if (dotpos - atpos < 2) {
        return 'Invalid structure: @.\nYou must include a domain name after the @ symbol.';
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'The email must be a valid email address. Double check your email address';
    }

    if (/@example\.com$/.test(email)) {
        return 'The email must not be from the domain example.com.';
    }
}
function validatePassword(password, username){
    if(password.length < 12){
        return `Passwords must be at least 12 characters long.`
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)){
        return `Passwords must have at least one uppercase and one lowercase letter.`
    }
    if (!/\d/.test(password)){
        return `Passwords must contain at least one number.`
    }
    if (!/\W/.test(password)){
        return `Passwords must contain at least one special character.`
    }
    if (/password/i.test(password)){
        return `Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).`
    }
    if (new RegExp(username, "i").test(password)){
        return `Passwords cannot contain the username.`
    }
}
function validatePasswordMatch(password, passwordCheck){
    if(passwordCheck === ""){
        return `Repeat password field cannot be empty`
    }
    if(password !== passwordCheck){
        return `Both passwords must match.`
    }
}

function validateTerms(termsChecked){
    if(!termsChecked){
        return `The terms and conditions must be accepted.`
    }
}

// Store user data in localStorage
let users = JSON.parse(localStorage.getItem('users')) || {};
//Adding event listener 
registrationForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordCheck = passwordCheckInput.value;
    const termsChecked = termsInput.checked;

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password, username);
    const passwordCheckError = validatePasswordMatch(password, passwordCheck)
    const termsError = validateTerms(termsChecked);

    if (usernameError || emailError || passwordError || passwordCheckError || termsError) {
        showMessage(usernameError || emailError || passwordError || passwordCheckError || termsError)
    } else {
        // Check if username or email is unique
        if (Object.values(users).some(user => user.email === email.toLowerCase())) {
            showMessage("That email is already registered");
            return;
        }
        if (users[username.toLowerCase()]) {
            showMessage("That username is already taken");
            return;
        }

        // Store user data
        users[username.toLowerCase()] = {
            email: email.toLowerCase(),
            password: password
        };
        localStorage.setItem('users', JSON.stringify(users));
        //Clear all form fields after successful submission and show a success message.
        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        passwordCheckInput.value = "";
        termsInput.checked = false;
        showMessage("Registration successful", true);
    }

}); // end eventListener

// Part 4: Login Form Validation Requirements
const loginForm = document.getElementById("login"); // get login form
const loginUsernameInput = loginForm.elements["username"]; // get login username
const loginPasswordInput = loginForm.elements["password"]; // get login password
const persistInput = loginForm.elements["persist"]; // get keep me logged in checkbox

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;
    const persist = persistInput.checked;

    // Validate username and password
    if (username === "") {
        showMessage("The username cannot be blank");
        return;
    }
    if (!users[username.toLowerCase()]) {
        showMessage("The username does not exist");
        return;
    }
    if (password === "") {
        showMessage("The password cannot be blank");
        return;
    }
    if (users[username.toLowerCase()].password !== password) {
        showMessage("The password is incorrect");
        return;
    }

    // Clear all form fields and show a success message.
    loginUsernameInput.value = "";
    loginPasswordInput.value = "";
    persistInput.checked = false;
    showMessage("Login successful" + (persist ? ", you will be kept logged in" : ""), true);
});