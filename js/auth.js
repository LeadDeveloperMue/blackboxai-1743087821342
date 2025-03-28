// Authentication Functions
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real app, this would call an authentication API
            console.log('Login attempt:', { email, password });
            
            // For demo purposes - simulate successful login
            localStorage.setItem('authToken', 'demo-token');
            localStorage.setItem('userEmail', email);
            window.location.href = 'profile.html';
        });
    }

    // Registration Form Handler
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real app, this would call a registration API
            console.log('Registration:', { name, email, password });
            
            // For demo purposes - simulate successful registration
            localStorage.setItem('authToken', 'demo-token');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            window.location.href = 'profile.html';
        });
    }

    // Check authentication status
    function checkAuth() {
        const token = localStorage.getItem('authToken');
        if (!token && window.location.pathname.includes('profile.html')) {
            window.location.href = 'login.html';
        }
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = 'index.html';
        });
    }

    checkAuth();
});