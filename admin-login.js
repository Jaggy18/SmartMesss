// ===============================
// SMARTMESS ADMIN LOGIN
// ===============================


const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const username =
        document.getElementById("username").value.trim();


    const password =
        document.getElementById("password").value;


    const message =
        document.getElementById("loginMessage");


    // Demo Admin Credentials

    const correctUsername = "admin";
    const correctPassword = "12345";


    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        // Save login status

        localStorage.setItem(
            "smartMessAdminLoggedIn",
            "true"
        );


        message.textContent =
            "Login successful! Redirecting...";


        message.style.color = "green";


        setTimeout(function() {

            window.location.href = "admin.html";

        }, 1000);

    }

    else {

        message.textContent =
            "❌ Invalid username or password.";

        message.style.color = "red";

    }

});