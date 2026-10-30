const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const studentname = document.querySelector("#student-name").value.trim();
    const studentrollno = document.querySelector("#student-rollno").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#new-password").value;
    const confirmpassword = document.querySelector("#confirmpassword").value

    if (password !== confirmpassword) {
        alert("password does not match");
        return;
    }

    const { data, error } = await supabaseClient.rpc(
        "verify_student",
        {
            p_student_name: studentname,
            p_roll_number: studentrollno
        }
    );

    if (error) {
        console.error("verification error:", error);
        alert("student verification nhi ho saki. please try again.");
        return;
    }

    console.log("Student name sent:", studentname);
    console.log("Roll number sent:", studentrollno);
    console.log("Function returned:", data);

    if (data !== true) {
        alert("please enter correct student name and roll number.");
        return;
    }

    alert("student verified successfully!");

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
    
    if(authError) {
        console.error("signup error:", authError);
        alert(authError.message);
        return;
    }
    
    alert("account created successfully!");

    console.log("student name;", studentname);
    console.log("roll number:", studentrollno);
    console.log("email:", email)

    window.location.href= "login.html"
});