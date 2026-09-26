// Get login button
const loginBtn =
    document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    // Get mobile number and password
    let mobile =
        document.getElementById("mobile").value;

    let password =
        document.getElementById("password").value;

    // Check if fields are empty
    if (mobile === "" || password === "") {

        document.getElementById("message").textContent =
            "Please enter all details";

        return;
    }

    // Store user details
    let user = {
        mobile: mobile,
        password: password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    // Open next page
    window.location.href = "sheet.HTML";

});