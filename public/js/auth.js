const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const authform = document.getElementById("auth-form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

if(loginBtn) {
    authform.addEventListener("submit", e => {
        e.preventDefault();
        const loginObj =  {
            username: usernameInput.value,
            password: passwordInput.value
        }
        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(loginObj),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res => {
            location.href =  "/"
        }).catch(err => {
            console.error("Error!", err);
        })
    })  
} else {
    authform.addEventListener("submit", e => {
        e.preventDefault();
        const signupObj =  {
            username: usernameInput.value,
            password: passwordInput.value
        }
        fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify(signupObj),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res => {
            location.href =  "/"
        }).catch(err => {
            console.error("Error!", err);
        })
    })  
}