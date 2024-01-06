function logout() {
  // Ask for confirmation
  const confirmed = window.confirm('Are you sure you want to logout?');

  if (!confirmed) {
    // If the user clicks 'Cancel' in the confirmation dialog, do nothing
    return;
  }

  // If the user confirms, proceed with the logout
  fetch('/logout', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/login.html'; // Redirect to the login page after logout
      } else {
        alert('Logout failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Logout unsuccessful.');
    });
}


  async function checkLoggedIn() {
    try {
        const response = await fetch('/check-login');
        const data = await response.json();

        if (data.loggedIn) {
            // User is logged in, show lessons or other activities
            console.log('User is logged in:', {
              username: data.user.username,
              score: data.user.score,
              completedLessons: data.user.completedLessons,
              // add other fields you want to log
            });
                        // Update the lesson UI after checking login
        } else {
            // User is not logged in, redirect to login or handle accordingly
            console.log('User is not logged in');
            // You can redirect to the login page or show a login form
            window.location.href = '/login.html'; // Replace with your login page
        }
    } catch (error) {
        console.error('Error checking login status:', error);
    }
}



  
  // ... (your existing code)
  
document.addEventListener('DOMContentLoaded', checkLoggedIn);