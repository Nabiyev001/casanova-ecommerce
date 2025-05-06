const body = document.querySelector("body")
const searchBtn = document.querySelector(".searchBtn")
const searchInput = document.querySelector(".searchInput")
const barBtn = document.querySelector(".barBtn")
const navContainer = document.querySelector(".navCont")

import { showNav, closeNav, openSearch, closeSearch } from '../common.js'
window.showNav = showNav
window.closeNav = closeNav
window.openSearch = openSearch
window.closeSearch = closeSearch

body.addEventListener("click", closeSearch)


// ? to Shop

let shopNow = document.querySelectorAll("span")
shopNow.forEach(shp => {
    let shopText = shp.textContent.toLocaleLowerCase()
    if (shopText.includes("sh") || shopText.includes("product")) {
        shp.addEventListener("click", () => {
            window.location.href = "../shop/shop.html"
        })
    }
})
let viewedPrd = JSON.parse(localStorage.getItem("viewedPrd"))

let prdImgDom = document.querySelector(".prdImg")
prdImgDom.src = viewedPrd.img

let reviewCount = Math.floor(Math.random() * 10 + 1)
let reviewCountDom = document.querySelectorAll(".stars p").forEach(p => p.textContent = `${reviewCount} Reviews`
)

let prdNameDom = document.querySelector(".prd-name h1")
prdNameDom.textContent = viewedPrd.name

let lastPrice = document.querySelector(".price .lastPrice")
lastPrice.textContent = `$${viewedPrd.lastPrice}`

let newPrice = document.querySelector(".price .newPrice")
newPrice.textContent = `$${viewedPrd.newPrice}`

let measure = document.querySelector(".measure h6")
measure.textContent = viewedPrd.measure




// ? InDecreament ProductOverview
let productOverview = document.querySelector(".product-overview")
let count = 1
countInDe(productOverview)
// ! Timer
let daysDom = document.querySelector(".time .days h5")
let hoursDom = document.querySelector(".time .hours h5")
let minutesDom = document.querySelector(".time .minutes h5")
let secondsDom = document.querySelector(".time .seconds h5")

let timer = setInterval(() => {
    let nowTime = new Date()
    let nowYear = nowTime.getFullYear()
    let nowDay = nowTime.getDate()
    let nowMonth = nowTime.getMonth()
    let lastTime = new Date(nowYear, nowMonth, nowDay + 2, 23, 59, 59).getTime()

    let distance = lastTime - nowTime.getTime()

    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    let minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
    let seconds = Math.floor(distance % (1000 * 60) / 1000)

    daysDom.textContent = String(days).padStart(2, "0")
    hoursDom.textContent = String(hours).padStart(2, "0")
    minutesDom.textContent = String(minutes).padStart(2, "0")
    secondsDom.textContent = String(seconds).padStart(2, "0")

}, 1000);

// ? Review Users
let writeBtn = document.querySelector(".writeReviewBtn")
let writeInput = document.querySelector(".writeInput")


writeBtn.addEventListener("click", () => {
    if (writeInput.value.trim() != "") {
        alert("Please sign up")
    } else {
        alert("It cannot be left empty")
    }
})

let reviewCont = document.querySelector(".review-users")

for (let i = 0; i < reviewCount; i++) {
    let userName = ""
    for (let i = 0; i < 4; i++) {
        userName += (Math.floor(Math.random() * 10))
    }
    reviewCont.innerHTML += `
                    <div class="user d-flex mt-5">
                        <div class="col-2 col-md-1">
                            <img src="/product/users/emptyUser.avif" alt="" class="img-fluid w-75  rounded-5">
                        </div>
                        <div class="col-10">
                            <h6>User${userName}</h6>
                            <div class="stars d-flex mt-3 gap-1">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <p class="mt-2 text-dark text-opacity-75">Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Esse sapiente quod dolor dolorem aliquam doloribus?</p>
                            <div class="like ms-4">
                                <a href="#">Like💙</a>
                                <a href="#" class="ms-2">Reply</a>
                            </div>
                        </div>
                    </div>
    `
}
// ! Colors

const colors = document.querySelectorAll(".colors div")
let selectedColors = []
colors.forEach(div => {
    div.addEventListener("click", () => {
        let isSame = selectedColors.includes(div.classList[0])
        let isDelete = div.classList.contains("scale")
        div.classList.toggle("scale")
        if (!isSame) {
            selectedColors.push(div.classList[0])
        }
        if (isDelete) {
            selectedColors = selectedColors.filter(color => color != div.classList[0])
        }
    })

    // !Color deyisende deyis
})


// ? Cart
let cartCont = document.querySelector(".cart-cont")
let cartPrdCont = cartCont.querySelector(".product-cont")
let cartProductsArr = JSON.parse(localStorage.getItem("addedCart")) || []
let basketCount = document.querySelectorAll(".fa-basket-shopping span")

basketCount.forEach(count => count.textContent = cartProductsArr.length)


import { openCart, closeCart, addCartPrd, deletePrd, countInDe, totalCalc, updateCountLocal } from '../common.js'
window.openCart = openCart
window.closeCart = closeCart
window.deletePrd = deletePrd


function addCart() {
    cartProductsArr = JSON.parse(localStorage.getItem("addedCart")) || []
    let samePrd = cartProductsArr.find(product => product.name == viewedPrd.name)
    let selectedProduct = ""
    if (selectedColors.length == 0) {
        alert("Select Color please")
    } else {
        if (samePrd == undefined) {
            selectedProduct = {
                name: viewedPrd.name,
                price: viewedPrd.newPrice,
                img: viewedPrd.img,
                count: count,
                colors: selectedColors,
                id: cartProductsArr.length + 1,
                total: count * viewedPrd.newPrice
            }
            cartProductsArr.push(selectedProduct)
            localStorage.setItem("addedCart", JSON.stringify(cartProductsArr))
        } else {
            samePrd.count = count
            samePrd.colors = selectedColors
        }
        openCart()
        addCartPrd()
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
}
window.addCart = addCart


