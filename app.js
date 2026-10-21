const callbutton = document.getElementById("callparent-btn");

callbutton.addEventListener("click", function () {
    const studentName = document.querySelector(".s-n").textContent;
    const monthlyFee = document.querySelector(".m-f").textContent;
    const paymentStatus = document.querySelector(".p-s").textContent;
    const status = paymentStatus.trim().toLowerCase();

    if (status.includes("pending")) {
        alert("Fee abhi pending hai. Barah-e-karam fee jama karwa dein.");
    } else if (status.includes("paid")) {
        alert("Fee receive ho chuki hai. Shukriya!");
    } else {
        alert("Payment status check karna zaroori hai.");
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






















