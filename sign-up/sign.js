let form = document.querySelector(".signForm")
let loginMethod = document.querySelector(".loginMethod")
let eyeIcon = document.querySelector(".eye")
let password = document.querySelector(".password")
let loginBtn = document.querySelector(".loginBtn")
let inputs = form.querySelectorAll("input")

let body = document.querySelector("body")
loginMethod.addEventListener("click", () => {
    if (loginMethod.textContent == "Login") {
        loginMethod.textContent = "Sign up"
        form.innerHTML = `
         <input class="w-50 border-0 border-bottom ps-3 fst-italic" type="text" required placeholder="Your Name">
                <input class="w-50 border-0 border-bottom ps-3 fst-italic " type="text" required placeholder="Username">
                <input class="w-50 border-0 border-bottom ps-3 fst-italic " type="email" required placeholder="Email address">
                <div class="password-cont">
                    <input class="w-50 border-0 border-bottom ps-3 fst-italic password" type="password" required placeholder="Password">
                    <i class="fa-regular fa-eye eye"></i>
                </div>
                <p class="agree"><input required type="checkbox"> I agree with <b> Privacy Policy</b> and <b>Term of
                        Use</b></p>
                <button class="loginBtn w-50 bg-dark text-light rounded-2 p-2" type="submit">Sign up</button>
        `
    } else {
        loginMethod.textContent = "Login"
        form.innerHTML = `
         <input class="w-50 border-0 border-bottom ps-3 fst-italic " type="email" required placeholder="Email address">
                <div class="password-cont">
                    <input class="w-50 border-0 border-bottom ps-3 fst-italic password" type="password" required placeholder="Password">
                    <i class="fa-regular fa-eye eye"></i>
                </div>
                <p class="agree"><input required type="checkbox"> I agree with <b> Privacy Policy</b> and <b>Term of
                        Use</b></p>
                <button class="loginBtn w-50 bg-dark text-light rounded-2 p-2" type="submit">Sign up</button>
        `

    }
})

eyeIcon.addEventListener("click", () => {
    eyeIcon.classList = eyeIcon.classList == `fa-regular fa-eye eye` ? `fa-regular fa-eye-slash` : `fa-regular fa-eye eye`
    password.type = password.type == "password" ? "text" : "password"
})


form.addEventListener("submit", e => {
    e.preventDefault()
    window.location.href = "../home/home.html"

})
