// ! Nav, search
const body = document.querySelector("body")
const searchBtn = document.querySelector(".searchCont")
const searchInput = document.querySelector(".searchInput")
const barBtn = document.querySelector(".barBtn")
const navContainer = document.querySelector(".navCont")

export function showNav() {
    navContainer.classList.add("showNav")
    barBtn.style.opacity = 0
    body.style.overflow = "hidden"
}
export function closeNav() {
    navContainer.classList.remove("showNav")
    barBtn.style.opacity = 1
    body.style.overflow = "scroll"
}
export function openSearch() {
    searchBtn.addEventListener("click", e => {
        e.stopPropagation()
        searchInput.classList.add("showSearch")
    })
}
export function closeSearch() {
    body.addEventListener("click", () => {
        searchInput.classList.remove("showSearch")
    })
}



// ! About Card
let cartCont = document.querySelector(".cart-cont")
let cartPrdCont = cartCont.querySelector(".product-cont")
let cartProductsArr = JSON.parse(localStorage.getItem("addedCart")) || []
let basketCount = document.querySelectorAll(".fa-basket-shopping span")

export function openCart() {
    cartCont.classList.add("showCart")
    window.scrollTo({ top: 0, behavior: "smooth" })
    addCartPrd()
}
export function closeCart() {
    cartCont.classList.remove("showCart")
}
export function addCartPrd() {
    cartProductsArr = JSON.parse(localStorage.getItem("addedCart")) || []
    basketCount.forEach(count => count.textContent = cartProductsArr.length)
    cartPrdCont.innerHTML = ""
    cartProductsArr.forEach(prd => {
        cartPrdCont.innerHTML += `
            <div class="prd row d-flex align-items-center border-bottom p-2 mt-3" data-id="${prd.id}">
                <div class="prd-img col-4 col-md-3 col-xl-2">
                    <img src="${prd.img}" alt="" class="img-fluid">
                </div>
                <div class="col-8 col-md-8 prd-img">
                    <div class="head d-flex justify-content-between align-items-center">
                        <h5 class="prd-name m-0 p-0">${prd.name}</h5>
                        <p class="prd-price m-0 p-0 fw-bold">$${prd.price}</p>
                    </div>
                    <div
                        class="middle d-flex justify-content-between align-items-center text-dark text-opacity-50">
                        <p class="color m-0 p-0">Color: ${prd.colors.join(",")}</p>
                        <i class="fa-solid fa-xmark fs-3" onclick="deletePrd(${prd.id})"></i>
                    </div>
                    <div
                        class="in-decreament  d-flex justify-content-center align-items-center  gap-2 rounded-2 p-md-0">
                        <p class="fs-5 fw-bold  m-0 minus">−</p>
                        <p class="fs-3 m-0 count">${prd.count}</p>
                        <p class="fs-5 fw-bold m-0 plus">＋</p>
                    </div>
                </div>
            </div>
            `
    })
    cartPrdCont.querySelectorAll(".prd").forEach(prd => {
        countInDe(prd)
    })
    totalCalc()
}
export function deletePrd(id) {
    cartProductsArr.splice(id - 1, 1)
    cartProductsArr.map((prd, index) => prd.id = index + 1)
    localStorage.setItem("addedCart", JSON.stringify(cartProductsArr))
    addCartPrd()
}

let count;
export function countInDe(container) {
    let inDecrement = container.querySelector(".in-decreament")
    let countDom = inDecrement.querySelector(".count")
    inDecrement.addEventListener("click", e => {
        count = parseInt(countDom.textContent)
        let clickedBtn = e.target.classList
        let currentPrd = e.target.closest(".prd")
        if (clickedBtn.contains("plus")) {
            count = Math.min(5, count + 1)
            countDom.textContent = count
        } else if (clickedBtn.contains("minus")) {
            count = Math.max(1, count - 1)
            countDom.textContent = count
        }
        if (currentPrd) updateCountLocal(currentPrd)
        totalCalc()
    })
}

export function totalCalc() {
    let totalDom = document.querySelector(".cart-cont .total-price")
    let total = cartProductsArr.reduce((akk, prd) => akk + prd.price * prd.count, 0)
    totalDom.textContent = `$${total.toFixed(2)}`
}
export function updateCountLocal(currentPrd) {
    let currentId = currentPrd.dataset.id
    let findArr = cartProductsArr.find(product => product.id == currentId)
    findArr.count = count
    localStorage.setItem("addedCart", JSON.stringify(cartProductsArr))
}