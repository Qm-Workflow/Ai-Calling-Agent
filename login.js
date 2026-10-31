const notyf = new Notyf({
    position: {
        x: "center",
        y: "top"
    }
});

const loginForm = document.querySelector("#login-form");
const loginButton = document.querySelector(".login-btn");
const pageLoader = document.querySelector("#page-loader");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value;

    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error("Login error", error);
            notyf.error(error.message);
            return;
        }

        const { data: registrationData, error: registrationError } =
            await supabaseClient.rpc("register_student");

        if (registrationError) {
            console.error("Registration Update error", registrationError);
            notyf.error("Student registration status update nahi ho saka.");
            return;
        }
        if (registrationData !== true) {
            notyf.error("Student Record match nhi hua ya pehle register ho chuka he.");
            return;
        }

        notyf.success("Login Successful!");
        console.log("Logged in user:", data.user);

        pageLoader.classList.add("active");

        window.location.href = "user-dashboard.html";

    } catch (error) {
        console.error("Unexpected login error :", error);
        notyf.error("kuch masla hua. dubara try karein.");

    } finally {
        if (!pageLoader.classList.contains("active")) {
            loginButton.disabled = false;
            loginButton.textContent = "Login";
        }
    }
});