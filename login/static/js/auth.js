class Auth {

    constructor() {
        this.infoLogin = document.getElementById("info-login");
        this.button_login = document.getElementById("button_login");
        this.btn_loading = document.getElementById("btn_loading");
    }

    main() {
        document.addEventListener("DOMContentLoaded", () => {
            this.infoLogin.style.display = "none";
            this.btn_loading.style.display = "none";
            const csrfField = document.getElementsByTagName("input")[0];
            const inputUsername = document.getElementById("inputUsername");
            const inputPassword = document.getElementById("inputPassword");
            const buttonLogin = document.getElementById("btn_login");
            buttonLogin.addEventListener("click", (e) => {
                e.preventDefault();
                if(inputUsername.value != "" && inputPassword.value != "") {
                    const dataLogin = {
                        username: inputUsername.value,
                        password: inputPassword.value,
                        csrfmiddlewaretoken: csrfField.value
                    };
                    this.infoLogin.style.display = "none";
                    this.button_login.style.display = "none";
                    this.btn_loading.style.display = "block";
                    setTimeout(() => {
                        this.authentication(dataLogin);
                    }, 2500);
                } else {
                    this.infoLogin.style.display = "block";
                    this.button_login.style.display = "block";
                    this.infoLogin.innerText = "Username dan password tidak boleh kosong.";
                }
            });
        });
    }

    authentication(dataLogin) {
        $.ajax({
            type: "POST",
            url: "user-login/",
            data: {
                username: dataLogin.username,
                password: dataLogin.password,
                csrfmiddlewaretoken: dataLogin.csrfmiddlewaretoken
            },

            success: (response) => {
                if(response['message'] === "Success") {
                    window.location = "/";
                } else {
                    if(response['message'] === "Failed") {
                        this.infoLogin.innerText = "Username dan password tidak sesuai.";
                    } else if(response['message'] === "username does not match") {
                        this.infoLogin.innerText = "Username tidak sesuai.";
                    } else {
                        this.infoLogin.innerText = "Password tidak sesuai.";
                    }
                    this.infoLogin.style.display = "block";
                    this.button_login.style.display = "block";
                    this.btn_loading.style.display = "none";
                }
            },

            complete: () => {
                document.getElementById("inputUsername").value = "";
                document.getElementById("inputPassword").value = "";
            },

            error: (xhr, status, error) => {
                this.infoLogin.innerText = xhr.responseText;
            }
        }); 
    }
}

const auth = new Auth();
auth.main();