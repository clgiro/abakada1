function showSignUpForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}
async function checkUsernameUnique(username) {
    try {
      const response = await fetch('/check-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.isUnique;
    } catch (error) {
      console.error('Error checking username uniqueness:', error);
      return false;
    }
  }
function submitForm(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Check if passwords match on the client side
    if (password.trim() !== confirmPassword.trim()) {
        showMessage('Ang password ay di nag tugma.');
        return;
    }

    // Check if the password meets the criteria
    if (!isPasswordValid(password)) {
        showMessage('Ang password ay dapat 10 character or higit pa ');
        return;
    }

    // Check if the username is unique
    checkUsernameUnique(username)
        .then(isUnique => {
            if (isUnique) {
                // Send data to the server (replace the URL with your server endpoint)
                const signupData = {
                    username: username,
                    password: password,
                };

                return fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupData),
                });
            } else {
                // Username is not unique
                showMessage('Ang pangalan ay nagamit na, Gumawa ng panibago.');
                return Promise.reject('Username is not unique');
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the server response as needed
            console.log('Server response:', data);

            // Additional actions after successful signup
            if (data.isUnique) {
                showMessage('Matagumpay!, Nakapag sign up kana');
                showLoginForm();
            }
        })
        .catch(error => {
            console.error('Error processing signup:', error);
            showMessage('Ang pangalan ay nagamit na, Gumawa ng panibago.');
        });
}

function isPasswordValid(password) {
    // Password must be at least 10 characters
    return password.length >= 10;
}
function showMessage(message) {
    // Update UI to show error message (e.g., display in a div)
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
}


async function submitLoginForm(event) {
    event.preventDefault();

    const username = document.getElementById('usernamelog').value;
    const password = document.getElementById('passwordlog').value;

    // Send the login data to the server
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
  
        const data = await response.json();

        if (data.success) {
            window.location.href = '/index.html';
            // Redirect or perform other actions after successful login
        } else {
            alert('Invalid username or password');
        }
    } catch (error) {
      console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}



// Call the checkLoggedIn function when your page loads
