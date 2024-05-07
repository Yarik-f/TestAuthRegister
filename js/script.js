document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const registerLogin = document.getElementById("registerLogin").value;
    const registerPassword = document.getElementById("registerPassword").value;
    const registerConfirmPassword = document.getElementById("registerConfirmPassword").value;
    const registerEmail = document.getElementById("registerEmail").value;
    const registerName = document.getElementById("registerName").value;

    const registerFormData = new FormData();
    registerFormData.append('login', registerLogin);
    registerFormData.append('password', registerPassword);
    registerFormData.append('confirmPassword', registerConfirmPassword);
    registerFormData.append('email', registerEmail);
    registerFormData.append('name', registerName);

    try {
        const registerResponse = await fetch('php/register.php', {
            method: 'POST',
            body: registerFormData
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
            displayErrors(registerData.errors, 'register');
        } else {
            document.getElementById('registrationFormDiv').style.display = 'none';
            document.getElementById('loginFormDiv').style.display = 'block';
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const loginLogin = document.getElementById("loginLogin").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const loginFormData = new FormData();
    loginFormData.append('login', loginLogin);
    loginFormData.append('password', loginPassword);

    try {
        const loginResponse = await fetch('php/login.php', {
            method: 'POST',
            body: loginFormData
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            document.getElementById('loginError').textContent = loginData.error;
        } else {
            document.getElementById('loginFormDiv').style.display = 'none';
            document.getElementById('userInfo').style.display = 'block';
            const loggedInUsername = loginData.username;
            document.getElementById('loggedInUsername').textContent = loggedInUsername;
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

async function logout() {
    try {
        const logoutResponse = await fetch('php/logout.php');
        if (logoutResponse.ok) {
            document.getElementById('userInfo').style.display = 'none';
            document.getElementById('loginFormDiv').style.display = 'block';
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function displayErrors(errors, formType) {
    const errorFields = Object.keys(errors);
    errorFields.forEach(field => {
        const errorElement = document.getElementById(`${formType}${field}Error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

function showLoginForm() {
    document.getElementById('registrationFormDiv').style.display = 'none';
    document.getElementById('loginFormDiv').style.display = 'block';
}

function showRegistrationForm() {
    document.getElementById('loginFormDiv').style.display = 'none';
    document.getElementById('registrationFormDiv').style.display = 'block';
}
function showError(inputId, errorMessage) {
    const errorSpan = document.getElementById(inputId + 'Error');
    if (errorSpan) {
        errorSpan.textContent = errorMessage;
    }
}

function clearError(inputId) {
    const errorSpan = document.getElementById(inputId + 'Error');
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

function validateFormRegister() {
    let isValid = true;

    const loginInput = document.getElementById('registerLogin');
    const login = loginInput.value.trim();
    if (login.length < 6) {
        showError('registerLogin', 'Логин должен содержать не менее 6 символов.');
        isValid = false;
    } else {
        clearError('registerLogin');
    }

    const passwordInput = document.getElementById('registerPassword');
    const password = passwordInput.value.trim();
    if (password.length < 6) {
        showError('registerPassword', 'Пароль должен содержать не менее 6 символов.');
        isValid = false;
    } else {
        clearError('registerPassword');
    }

    const confirmPasswordInput = document.getElementById('registerConfirmPassword');
    const confirmPassword = confirmPasswordInput.value.trim();
    if (confirmPassword !== password) {
        showError('registerConfirmPassword', 'Пароли не совпадают.');
        isValid = false;
    } else {
        clearError('registerConfirmPassword');
    }

    const emailInput = document.getElementById('registerEmail');
    const email = emailInput.value.trim();
    if (!isValidEmail(email)) {
        showError('registerEmail', 'Некорректный email.');
        isValid = false;
    } else {
        clearError('registerEmail');
    }

    const nameInput = document.getElementById('registerName');
    const name = nameInput.value.trim();
    if (name.length < 2) {
        showError('registerName', 'Имя должно содержать не менее 2 символов.');
        isValid = false;
    } else {
        clearError('registerName');
    }

    const submitButton = document.querySelector('#registrationForm button[type="submit"]');
    if (isValid) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }

    return isValid;
}
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}
function validateFormLogin() {
    let isValid = true;

    const loginInput = document.getElementById('loginLogin');
    const login = loginInput.value.trim();
    if (login.length < 6) {
        showError('loginLogin', 'Логин должен содержать не менее 6 символов.');
        isValid = false;
    } else {
        clearError('loginLogin');
    }

    const passwordInput = document.getElementById('loginPassword');
    const password = passwordInput.value.trim();
    if (password.length < 6) {
        showError('loginPassword', 'Пароль должен содержать не менее 6 символов.');
        isValid = false;
    } else {
        clearError('loginPassword');
    }

    const submitButton = document.querySelector('#loginForm button[type="submit"]');
    if (isValid) {
        submitButton.removeAttribute('disabled');
    } else {
        submitButton.setAttribute('disabled', 'disabled');
    }

    return isValid;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    if (!validateFormLogin()) {
        event.preventDefault();
    }
});

document.querySelectorAll('#loginForm input').forEach(input => {
    input.addEventListener('input', () => {
        validateFormLogin();
    });
});
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    if (!validateFormRegister()) {
        event.preventDefault();
    }
});
document.querySelectorAll('#registrationForm input').forEach(input => {
    input.addEventListener('input', () => {
        validateFormRegister();
    });
});
