const notyf = new Notyf({
    position: {
        x: "center",
        y: "top"
    }
});

async function protectDashboard() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.replace("login.html");
        return false;
    }

    const user = data.session.user;
    const profileName = document.querySelector("#profile-name");
    const studentName = user.user_metadata?.student_name;
    profileName.textContent = studentName || "Student";
    console.log("Logged-in student name:", studentName);
    console.log("Logged-in user:", data.session.user);
    return true;
}

protectDashboard().then(function (isLoggedIn) {
    if (!isLoggedIn) {
        return;
    }

    const callbutton = document.getElementById("callparent-btn");

    callbutton.addEventListener("click", function () {
        const studentName = document.querySelector(".s-n").textContent;
        const monthlyFee = document.querySelector(".m-f").textContent;
        const paymentStatus = document.querySelector(".p-s").textContent;
        const status = paymentStatus.trim().toLowerCase();

        if (status.includes("pending")) {
            notyf.error(
                "Fee abhi pending hai.Barah - e - karam fee jama karwa dein."
            );
        } else if (status.includes("paid")) {
            notyf.success("Fee receive ho chuki hai. Shukriya!");
        } else {
            notyf.error("Payment status check karna zaroori hai.");
        }


        const paymentTag = document.querySelector(".p-s");
        const currentStatus = paymentTag.textContent
            .split(":")
            .pop()
            .trim()
            .toLowerCase();

        paymentTag.classList.remove("pending", "paid");

        if (currentStatus === "pending") {
            paymentTag.classList.add("pending");
        } else if (currentStatus === "paid") {
            paymentTag.classList.add("paid");
        }
    });
    const profilebtn = document.querySelector(".profile-btn");
    const profiledropdown = document.querySelector(".profile-dropdown")

    profilebtn.addEventListener("click", function () {
        if (profiledropdown.style.display === "block") {
            profiledropdown.style.display = "none";
        } else {
            profiledropdown.style.display = "block";
        }
    });
})

const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", async function () {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        alert("Logout nhi hosaka dubara try kro.");
        return;

    }

    window.location.replace("login.html")
});























