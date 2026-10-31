const notyf = new Notyf({
    position: {
        x: "center",
        y: "top"
    }
});

const signupForm = document.querySelector("#signup-form");
const signupButton = document.querySelector(".signup-btn");
const pageLoader = document.querySelector("#page-loader");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const studentname = document.querySelector("#student-name").value.trim();
    const studentrollno = document.querySelector("#student-rollno").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#new-password").value;
    const confirmpassword = document.querySelector("#confirmpassword").value

    if (password !== confirmpassword) {
        notyf.error("password does not match");
        return;
    }

    signupButton.disabled = true;
    signupButton.textContent = "Verifying Student...";

    try {
        const { data, error } = await supabaseClient.rpc
            ("verify_student",
                {
                    p_student_name: studentname,
                    p_roll_number: studentrollno
                }
            );

        if (error) {
            console.error("verification error:", error);
            notyf.error("Student Verification NAhi Ho Skhti. Please Try Again.");
            return;
        }

        if (data !== true) {
            notyf.error("Please enter correct student name and roll number.");
            return;
        }

        console.log("Student verified successfully!");

        signupButton.textContent = "Creating Account...";

        const { data: authData, error: authError } =
            await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        student_name: studentname,
                        roll_number: studentrollno
                    }
                }
            });

        if (authError) {
            console.error("signup error:", authError);
            notyf.error(authError.message);
            return;
        }

        console.log("Account Created:", authData);

        pageLoader.classList.add("active");

        window.location.href = "login.html";

    } catch (error) {
        console.error("Unexpected error:", error);
        notyf.error("kuch masla hua please dobara try karein.");
    } finally {
        if (!pageLoader.classList.contains("active")) {
            signupButton.disabled = false;
            signupButton.textContent = "Create Account";
        }
    }
});