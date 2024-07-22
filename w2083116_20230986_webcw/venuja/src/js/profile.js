// Define the steps and prompts
const steps = [
    [
        { question: "First name:", key: "firstName", validate: validateText },
        { question: "Last name:", key: "lastName", validate: validateText },
        { question: "Date of Birth (MM-DD-YYYY):", key: "dob", validate: validateDate },
        { question: "Gender:", key: "gender", validate: validateText }
    ],
    [
        { question: "Email:", key: "email", validate: validateEmail, required: true },
        { question: "Password:", key: "password", type: "password", required: true },
        { question: "Confirm Password:", key: "confirmPassword", type: "password", validate: validateConfirmPassword, required: true }
    ],
    [
        { question: "Phone number:", key: "phoneNumber", validate: validateNumber },
        { question: "Country:", key: "country", validate: validateText },
        { question: "City:", key: "city", validate: validateText },
        { question: "Zip Code:", key: "zipCode", validate: validateNumber }
    ],
    [
        { question: "Marine conservation project you are most interested in:", key: "marineProject" },
        { question: "Interested in volunteering?", key: "volunteering" },
        { question: "Interested in contributing to our cause with donations?", key: "donations" }
    ]
];

let currentStep = 0;
let currentPrompt = 0;
let userProfile = {};

const promptContainer = document.getElementById('prompt-container');
const profileOutput = document.getElementById('profile-content');
const progressBar = document.querySelector('.progress');
const progressText = document.getElementById('progress-text');

// Function to start the prompts
function startPrompts() {
    document.getElementById('startButton').style.display = 'none';
    showPrompt();
}

// Function to show the current prompt
function showPrompt() {
    if (currentStep < steps.length) {
        if (currentPrompt < steps[currentStep].length) {
            const prompt = steps[currentStep][currentPrompt];
            const promptName = `STEP ${currentStep + 1} | ${getStepName(currentStep)} | question ${currentPrompt + 1}/${steps[currentStep].length}`;
            let response;

            while (true) {
                if (prompt.type === "password") {
                    response = promptPassword(prompt.question, promptName, prompt.key);
                } else {
                    response = promptUser(prompt.question, promptName);
                }

                if (response === null && prompt.required) {
                    alert("This question is required. Please provide an answer.");
                    continue;
                }

                if (response === null || (response !== null && (!prompt.validate || prompt.validate(response)))) {
                    if (response !== null) {
                        userProfile[prompt.key] = response;
                        updateProfileOutput();
                        updateProgress();
                    }
                    break;
                }
            }

            currentPrompt++;
            showPrompt();
        } else {
            currentStep++;
            currentPrompt = 0;
            showPrompt();
        }
    } else {
        promptContainer.innerHTML = '<p>All prompts completed!</p><button id="updateButton" onclick="updateProfile()">Update Profile</button>';
    }
}

// Function to prompt the user for input
function promptUser(question, promptName) {
    return prompt(`${promptName}\n\n${question}`);
}

// Function to handle password prompts
function promptPassword(question, promptName, key) {
    let password = "";
    while (true) {
        password = prompt(`${promptName}\n\n${question}`);
        if (password === null && key === 'password') {
            alert("Password cannot be null. Please enter a valid password.");
            continue;
        }
        if (key === 'password') return password;
        const confirmPassword = prompt(`${promptName}\n\nPlease confirm your password:`);
        if (confirmPassword === null) {
            alert("Confirmation password cannot be null. Please confirm your password.");
            continue;
        }
        if (password === confirmPassword) {
            return confirmPassword;
        } else {
            alert("Passwords do not match. Please try again.");
        }
    }
}

// Function to get the step name
function getStepName(step) {
    switch(step) {
        case 0: return "personal details";
        case 1: return "security details";
        case 2: return "contact details";
        case 3: return "additional details";
        default: return "";
    }
}

// Function to update the profile output
function updateProfileOutput() {
    const categories = {
        personalDetails: [],
        securityDetails: [],
        contactDetails: [],
        additionalDetails: []
    };

    steps.forEach((step, stepIndex) => {
        step.forEach(prompt => {
            if (userProfile[prompt.key]) {
                switch (stepIndex) {
                    case 0:
                        categories.personalDetails.push(`<div><strong>${prompt.question}</strong> ${userProfile[prompt.key]}</div>`);
                        break;
                    case 1:
                        categories.securityDetails.push(`<div><strong>${prompt.question}</strong> ${userProfile[prompt.key]}</div>`);
                        break;
                    case 2:
                        categories.contactDetails.push(`<div><strong>${prompt.question}</strong> ${userProfile[prompt.key]}</div>`);
                        break;
                    case 3:
                        categories.additionalDetails.push(`<div><strong>${prompt.question}</strong> ${userProfile[prompt.key]}</div>`);
                        break;
                }
            }
        });
    });

    profileOutput.innerHTML = `
        <hr>
        <div class="profile-category">
            <h3>Personal Details</h3>
            <div class="category-content">${categories.personalDetails.join('')}</div>
        </div>
        <hr>
        <div class="profile-category">
            <h3>Security Details</h3>
            <div class="category-content">${categories.securityDetails.join('')}</div>
        </div>
        <hr>
        <div class="profile-category">
            <h3>Contact Details</h3>
            <div class="category-content">${categories.contactDetails.join('')}</div>
        </div>
        <hr>
        <div class="profile-category">
            <h3>Additional Details</h3>
            <div class="category-content">${categories.additionalDetails.join('')}</div>
        </div>
    `;
}

// Function to update the progress bar
function updateProgress() {
    const totalPrompts = steps.flat().length;
    const completedPrompts = Object.keys(userProfile).length;
    const progress = (completedPrompts / totalPrompts) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Profile completion: ${Math.round(progress)}%`;
}

// Function to handle updating the profile
function updateProfile() {
    currentStep = 0;
    currentPrompt = 0;

    function showUnansweredPrompt() {
        if (currentStep < steps.length) {
            if (currentPrompt < steps[currentStep].length) {
                const prompt = steps[currentStep][currentPrompt];
                if (!userProfile[prompt.key]) {
                    const promptName = `STEP ${currentStep + 1} | ${getStepName(currentStep)} | question ${currentPrompt + 1}/${steps[currentStep].length}`;
                    let response;

                    while (true) {
                        if (prompt.type === "password") {
                            response = promptPassword(prompt.question, promptName);
                        } else {
                            response = promptUser(prompt.question, promptName);
                        }

                        if (response === null && prompt.required) {
                            alert("This question is required. Please provide an answer.");
                            continue;
                        }

                        if (response === null || (response !== null && (!prompt.validate || prompt.validate(response)))) {
                            if (response !== null) {
                                userProfile[prompt.key] = response;
                                updateProfileOutput();
                                updateProgress();
                            }
                            break;
                        }
                    }
                }
                currentPrompt++;
                showUnansweredPrompt();
            } else {
                currentStep++;
                currentPrompt = 0;
                showUnansweredPrompt();
            }
        } else {
            alert("All unanswered prompts have been completed.");
        }
    }

    showUnansweredPrompt();
}

// Validation functions
function validateText(input) {
    if (/^\d+$/.test(input)) {
        alert("Invalid input. Please enter text only.");
        return false;
    }
    return true;
}

function validateDate(input) {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(input)) {
        alert("Invalid date format. Please enter the date in MM-DD-YYYY format.");
        return false;
    }
    return true;
}

function validateEmail(input) {
    if (!/@gmail\.com$/.test(input)) {
        alert("Invalid email. Please enter an email ending with @gmail.com.");
        return false;
    }
    return true;
}

function validateConfirmPassword(input) {
    if (input !== userProfile.password) {
        alert("Passwords do not match. Please try again.");
        return false;
    }
    return true;
}

function validateNumber(input) {
    if (!/^\d+$/.test(input)) {
        alert("Invalid input. Please enter numbers only.");
        return false;
    }
    return true;
}