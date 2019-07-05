class Login {

    constructor(board) {
        this.board = board;
        this.render();
    }
    render() {
        let main = snip("div", this.board).css({ background: "red", minHeight: "200px", width: "100%", display: "flex", alignItems: "center" });

        let log = snip("div", main).attr({ class: "login" });
        let banner = snip("div", main).attr({ class: "banner" });

        let head = snip("div", log).css({ maxHeight: "48px", display: "flex", justifyContent: "flex-start", marginBottom: "80px" });

        snip("img", head).css({ width: "16%", height: "100%" }).attr({ src: "./src/assets/img/unphu.png" });

        snip("span", log).innerHTML = "Sing In";

        let form = snip("form", log);
        let user = snip("input", form).attr({ type: "text", placeholder: "Enter User Name" });
        let pass = snip("input", form).attr({ type: "password", placeholder: "Enter Password" });
        let btn = snip("button", form);
        btn.textContent = "Enter";

        btn.onclick = (ev) => {
            ev.preventDefault();
            if (user.value.length > 0 && pass.value.length > 0) {

                Provider.post("/enteruser", { user: user.value.trim(), password: pass.value }).then(res => {
                    localStorage.session = JSON.stringify(res);
                    location.reload();
                })
            } else alert("Fill in all the fields");

        }



        let containerRegister = snip("div", log).attr({ class: "Register" });
        snip("div", containerRegister).textContent = "Dont't have an account?";

        snip("a", containerRegister).attr({
            href: "#", onclick: () => {
                log.classList.add("inactive");
                log.addEventListener("animationend", () => this.register());

            }
        }).textContent = "Sing Up";



    }
    register() {

        let reg = snip("div", this.board).attr({ class: "New_register active" });

        let head = snip("div", reg).css({ maxHeight: "48px", display: "flex", justifyContent: "flex-start", marginBottom: "80px" });

        snip("img", head).css({ width: "16%", height: "100%" }).attr({ src: "./src/assets/img/unphu.png" });

        snip("span", reg).innerHTML = "Sing Up";

        let form = snip("form", reg);
        let user = snip("input", form).attr({ type: "text", placeholder: "Enter User Name" });
        let pass = snip("input", form).attr({ type: "password", placeholder: "Enter Password" });
        let btn = snip("button", form);
        btn.textContent = "Enter";

        btn.onclick = (ev) => {
            ev.preventDefault();

            if (user.value.length > 0 && pass.value.length > 0) {

                console.log("hola")
                Provider.get("/validate/" + user.value).then(r => {
                    console.log(r, r.length)
                    if (r.user == user.value) alert("Este usuario ya esta registrado");

                    else if (Object.keys(r).length <= 0) Provider.post("/adduser", { user: user.value, password: pass.value })
                        .then(res => new Modal("Success", "Do you want to continue?", (modal) => {
                            modal.remove();
                            singup.click();
                        }).succes())

                });

            } else alert("Fill in all the fields");
        };

        let containerRegister = snip("div", reg).attr({ class: "Register" });
        snip("div", containerRegister).textContent = "Do you have an account?";

        let singup = snip("a", containerRegister);
        singup.textContent = "Sing In";

        singup.onclick = () => {
            reg.classList.remove("active");
            reg.classList.add("inactive");
            let log = document.querySelector(".login");

            reg.addEventListener("animationend", () => {
                log.classList.remove("inactive");
                log.classList.add("active");
            });

            log.addEventListener("animationend", () => {
                document.body.innerHTML = "";
                this.render();
            });
        }

    }

}