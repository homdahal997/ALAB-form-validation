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
const errorDisplay = document.getElementById("errorDisplay");  // get error display field

// function to show error message as well as success message depending on input
function showMessage(message, isSuccess = false) {
    errorDisplay.style.display = "block";
    errorDisplay.textContent = message;
    errorDisplay.style.backgroundColor = isSuccess ? "green" : "#fcc";
    errorDisplay.style.color = isSuccess ? "#fff" : "red";
    setTimeout(() => {
        errorDisplay.style.display = "none";
    }, 3000);
}

// function to validate username
function validateUsername(username){
    if(username === ""){
        return `The username cannot be blank`
    }
    if(username.length < 4){
        return `The username must be at least four characters long.`
    }
    if(new Set(username).size < 2){
        return `The username must contain at least two unique characters.`
    }
    if (/[\s\W]/.test(username)) return "The username cannot contain any special characters or whitespace.";
}

//Adding event listener 
registrationForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const username = usernameInput.value;

    const usernameError = validateUsername(username);

    if(usernameError){
        showMessage(usernameError)
    }else{
        showMessage("Registration successful", true);
    }

}); // end eventListener
