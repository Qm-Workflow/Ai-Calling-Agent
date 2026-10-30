const notyf = new Notyf();

const loginForm = document.querySelector("#login-form")

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        console.error("Login error:", error);
        notyf.error(error.message);
        return;
    }

    const { data: registrationData, error: registrationError } =
        await supabaseClient.rpc("register_student");

    if (registrationError) {
        console.error("registration update error:", registrationError);
        notyf.error("student registration status update nahi ho saka.");
        return;
    }

    if (registrationData !== true) {
        notyf.error("student record match nhi hua ya pehle register ho chuka he.");
        return;
    }

    notyf.success("Login successful!");
    
    console.log("Logged-in user:", data.user);

    window.location.href = "user-dashboard.html";
});