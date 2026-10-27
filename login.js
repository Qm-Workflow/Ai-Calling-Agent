const loginForm = document.querySelector("#login-form")

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value;

    const {data , error} = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login error:", error);
        alert(error.message);
        return;
    }
     alert("Login successful!");

     console.log("Logged-in user:", data.user);

     window.location.href = "user-dashboard.html";
});