const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
let isValid = false;

// Adds an event listener to 'name' input field so that when it is taken out of focus the function is executed
nameInput.addEventListener('blur', function() {
    const nameValue = this.value
    validateName(nameValue);
});

// function to check if filed is empty
function validateName(input) {
    if (!input.trim()) {
        alert('Please enter your full name')
        return false;
    } else {
        return true;
    }
}

// Adds an event listener to 'email' input field so that when it is taken out of focus the function is executed
emailInput.addEventListener('blur', function() {
    const emailValue = this.value;
    if(!emailValue.trim()){
        alert('Please enter an email')
    }else if (!emailChecker(emailValue)) {
        alert('Please enter a valid email address.');
        emailInput.value = "";
    }
});

// Function to check email validity when called
function validateEmail(emailValue){
    if(!emailValue.trim()){
        alert('Please enter an email')
        return false;
    }else if (!emailChecker(emailValue)) {
        alert('Please enter a valid email address.');
        emailInput.value = "";
        return false;
    }
    return true;
}

// function to check if filed is empty
function emailChecker(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

// Function used to check if this is selected at the end when submitting
function checkVisit(){// If called then this is executed
    const visitInputs = document.getElementsByName('visit');
    validateRadio(visitInputs);
    if(!isValid){
        alert('Please select YES or NO from second field');
        return false;
    } else {
        return true;
    }
}

// Function used to check if this is selected at the end when submitting
function checkRating(){
    const ratingInputs = document.getElementsByName('rating');
    validateRadio(ratingInputs);
    if(!isValid){
        alert('Please select a rating from 1 - 10');
        return false;
    } else {
        return true;
    }
}

// Function to check if any item is selected
function validateRadio(radioArray){
    for (let index = 0; index < radioArray.length; index++) {
        if (radioArray[index].checked) {
            isValid = true;
        }        
    }
    isValid = false;
}

// Function to check if a radio button is selected
function validateRadio(radioArray) {
    isValid = false;
    for (let index = 0; index < radioArray.length; index++) {
        if (radioArray[index].checked) {
            isValid = true; // Set to true if any radio is checked
            break; // No need to check further
        }
    }
}


function previewClick(){
    if(validateName(nameInput.value) && validateEmail(emailInput.value) && checkVisit() && checkRating()){
        alert("Ok");
    } else {
        alert("bruh");
    }
}
