
const body = document.querySelector("body")
const searchBtn = document.querySelector(".searchCount")
const searchInput = document.querySelector(".searchInput")
const barBtn = document.querySelector(".barBtn")
const navContainer = document.querySelector(".navCont")

import { showNav, closeNav, openSearch, closeSearch } from '../common.js'
window.showNav = showNav
window.closeNav = closeNav
window.openSearch = openSearch
window.closeSearch = closeSearch

body.addEventListener("click", closeSearch)


// ! FIRST STAGE

// ? Added Product add to Cont
let productsCont = document.querySelector(".first-stage .products-cont")
let addedProducts = JSON.parse(localStorage.getItem("addedCart"))
let shippingMethode = "Free"
let shippingCost = 0

let cartProductsArr = JSON.parse(localStorage.getItem("addedCart")) || []
let basketCount = document.querySelectorAll(".fa-basket-shopping span")

basketCount.forEach(count => count.textContent = cartProductsArr.length)


addProductDom()

function addProductDom() {
    if (addedProducts.length == 0) {
        productsCont.innerHTML = `<h3 class="text-center fw-bold mt-5">Products are not available.</h3>`
        return
    }
    productsCont.innerHTML = ""
    addedProducts.forEach(prd => {
        let total = Number(prd.total)
        productsCont.innerHTML += `
                        <div class="prd d-flex justify-content-between mt-3" data-id="${prd.id}">
                            <div class="prd-main d-flex align-items-center gap-3 col-10 col-sm-6 col-md-5">
                                <img src="${prd.img}" alt="" class="img-fluid col-4 col-lg-3">
                                <div class="prd-about">
                                    <h6 class="prd-name">${prd.name}</h6>
                                    <h6 class="colors text-black text-opacity-50 m-0">${prd.colors}</h6>
                                    <h6 class="remove d-none d-md-flex gap-1 align-items-center opacity-50" onclick="removeProduct(${prd.id})"><i
                                            class="fa-solid fa-xmark fs-4"></i> Remove</h6>
                                    <div
                                        class="quantiy d-flex align-items-center gap-2 d-md-none m-0 justify-content-center col-3">
                                        <p class="fs-5 fw-bold  m-0 minus">−</p>
                                        <p class="fs-3 m-0 count">${prd.count}</p>
                                        <p class="fs-5 fw-bold m-0 plus">＋</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5 col-lg-6 col-xl-5 d-flex align-items-center justify-content-between justify-content-xl-around">
                                <div
                                    class="quantiy d-none d-md-flex align-items-center justify-content-center gap-1 col-5 col-lg-3">
                                    <p class="fs-5 fw-bold m-0 minus">−</p>
                                    <p class="fs-3 m-0 count">${prd.count}</p>
                                    <p class="fs-5 fw-bold m-0 plus">＋</p>
                                </div>
                                <div class="price d-flex flex-column align-items-end">
                                    <h5 class="price m-0">$${prd.price}</h5>
                                    <i class="fa-solid fa-xmark fs-4 d-md-none" onclick="removeProduct(${prd.id})"></i>
                                </div>
                                <h5 class="subTotal d-none d-lg-block m-0 text-center">$${total.toFixed(2)}</h5>
                            </div>
                        </div>
                `
    })
    productsCont.querySelectorAll(".prd").forEach(prd =>
        countInDe(prd)
    )

}

// ? InDecreament
function countInDe(prd) {
    let count;
    let quantiy = prd.querySelectorAll(".quantiy")
    quantiy.forEach(quantiy => {
        quantiy.addEventListener("click", e => {
            let subTotal = prd.querySelector(".subTotal")
            let findLocal = addedProducts.find(product => product.id == prd.dataset.id)
            let clickedBtn = e.target.classList
            let countDom = quantiy.querySelector(".count")
            count = parseInt(countDom.textContent)

            if (clickedBtn.contains("plus")) count = Math.min(5, count + 1)
            if (clickedBtn.contains("minus")) count = Math.max(1, count - 1)
            countDom.textContent = count
            findLocal.count = count
            findLocal.total = (count * findLocal.price).toFixed(2)
            subTotal.textContent = `$${findLocal.total}`
            localStorage.setItem("addedCart", JSON.stringify(addedProducts))
            shippFee(shippingMethode)
        })
    })
}
// ? Cart Summary

let cartSummary = document.querySelector(".first-stage .cart-summary")
function checked() {
    let cartDot = document.querySelectorAll(".first-stage .methode .dot")
    cartDot.forEach(dot => {
        dot.classList.remove("checked")
        dot.closest(".methode").classList.remove("checkedMethode")
        dot.addEventListener("click", e => {
            let clickedBtn = e.target
            clickedBtn.closest(".methode").classList.add("checkedMethode")
            clickedBtn.classList.add("checked")
            shippingMethode = clickedBtn.dataset.fee
            shippFee(shippingMethode)
        })
    })
}
window.checked = checked
// ? SubTotal & Total Calculate

shippFee(shippingMethode)
function shippFee(methode) {
    let subTotalDom = cartSummary.querySelector(".first-stage .subTotal .price")
    let totalDom = cartSummary.querySelector(".first-stage .total .price")

    let subTotal = addedProducts.reduce((akk, prd) => akk + Number(prd.total), 0)
    let totalSum = addedProducts.reduce((akk, prd) => akk + Number(prd.total), 0)
    switch (methode) {
        case "Free":
            break;
        case "Express":
            shippingCost = 15.99
            totalSum += shippingCost
            break;
        case "Pick Up":
            shippingCost = (totalSum * 21.99) / 100
            totalSum += shippingCost
            break;
    }
    subTotalDom.textContent = `$${subTotal.toFixed(2)}`
    totalDom.textContent = `$${totalSum.toFixed(2)}`
}

// ? Remove Product
function removeProduct(id) {
    addedProducts.splice(id - 1, 1)
    localStorage.setItem("addedCart", JSON.stringify(addedProducts))
    addProductDom()
}
window.removeProduct = removeProduct

// ? Next Stage
let firstStage = document.querySelector(".first-stage")
let secondStage = document.querySelector(".second-stage")

let firstProcess = document.querySelector(".process-first")
let secondProcess = document.querySelector(".process-second")
function nextStage() {
    let processNumber = firstProcess.querySelector(".process-number")
    if (addedProducts.length > 0) {
        firstProcess.classList.add("complete", "d-none", "d-md-flex")
        processNumber.innerHTML = `<i class="fa-solid fa-check p-1"></i>`
        secondProcess.classList.add("border-black", "border-bottom", "border-2")
        firstStage.classList.add("d-none")
        secondStage.classList.remove("d-none")
        orderProductAdd()
    }
}
window.nextStage = nextStage



// ! SECOND STAGE

// ?  Cart Informations  Check
let regexNames = /^[a-zA-Z]{3,}$/
let nameCheck = false
function frsNameCheck(className) {
    let input = document.querySelector(`.names .${className} input`)
    let label = document.querySelector(`.names .${className} label`)

    if (!regexNames.test(input.value)) {
        label.innerHTML = `${className} Name <span class="text-danger">Invalid name</span>`
        nameCheck = false
    }
    label.innerHTML = `${className} Name <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    nameCheck = true
}
function telNumberCheck() {
    let telRegex = /^\+([0-9]{7,})+$/
    let input = document.querySelector(".tel input")
    let label = document.querySelector(".tel label")


    if (!telRegex.test(input.value)) {
        label.innerHTML = `Phone Number <span class="text-danger">Invalid Number</span>`
        return false
    }
    label.innerHTML = `Phone Number <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    return true
}
function emailCheck() {
    let emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/
    let input = document.querySelector(".email input")
    let label = document.querySelector(".email label")


    if (!emailRegex.test(input.value)) {
        label.innerHTML = `Email Address <span class="text-danger">Invalid Email</span>`
        return false
    }
    label.innerHTML = `Email Address <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    return true
}

// ? Shipping check

let numTxtRegex = /^[a-zA-Z][a-zA-Z0-9]+$/

function streetCheck() {
    let streetRegex = /^[a-zA-Z0-9]+$/
    let input = document.querySelector(".street input")
    let label = document.querySelector(".street label")


    if (!streetRegex.test(input.value)) {
        label.innerHTML = `Street Address<span class="text-danger">Invalid Address</span>`
        return false
    }
    label.innerHTML = `Street Address <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    return true
}

function cityCheck() {
    let cityRegex = /^[a-zA-Z]+$/
    let input = document.querySelector(".city input")
    let label = document.querySelector(".city label")


    if (!cityRegex.test(input.value)) {
        label.innerHTML = `City Address<span class="text-danger">Invalid Address</span>`
        return false
    }
    label.innerHTML = `City Address <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    return true
}

let stzpCheck = false
function stZipCheck(className) {
    let regex = /^[a-zA-Z0-9]+$/
    let input = document.querySelector(`.${className} input`)
    let label = document.querySelector(`.${className} label`)

    if (!regex.test(input.value)) {
        label.innerHTML = `${className} <span class="text-danger">Invalid Address</span>`
        stzpCheck = false
    }
    label.innerHTML = `${className} <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    stzpCheck = true
}
window.frsNameCheck = frsNameCheck
window.telNumberCheck = telNumberCheck
window.emailCheck = emailCheck
window.streetCheck = streetCheck
window.cityCheck = cityCheck
window.cityCheck = cityCheck
window.stZipCheck = stZipCheck
// ? Pay Methods
let payMethode = false
function checkedDot() {
    let dots = document.querySelectorAll(".pay-methods .dot")
    dots.forEach(dot => {
        dot.classList.remove("checked")
        dot.addEventListener("click", e => {
            let clickedBtn = e.target
            clickedBtn.classList.add("checked")
            payMethode = true
        })
    })
}
window.checkedDot = checkedDot
let cardNumCheck = false
let CardNumInput = document.querySelector(".card-number input")
let label = document.querySelector(".card-number label")

CardNumInput.addEventListener("input", e => {
    let value = e.target.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{4})/g, "$1 ")
    if (value.length < 19) {
        label.innerHTML = `Card Number <span class="text-danger">Invalid information</span>`
        e.target.value = value
        cardNumCheck = false
    } else {
        value = value.slice(0, 19)
        label.innerHTML = `Card Number <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
        e.target.value = value
        cardNumCheck = true
    }
});

let expCheck = false
let expirationInput = document.querySelector(".expiration input")
let Exlabel = document.querySelector(".expiration label")

expirationInput.addEventListener("input", e => {
    let value = e.target.value
    let regex = (/([0][1-9])|([1][0-2])([0-9]{2})$/)

    value = value.replace(/\D/g, "")
    if (value.length > 4) {
        value = value.slice(0, 4)
    }
    if (regex.test(value)) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4)
        Exlabel.innerHTML = `Expiration Date <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
        expCheck = true
    } else {
        Exlabel.innerHTML = `Expiration Date <span class="text-danger">Invalid Expiration</span>`
        expCheck = false
    }
    e.target.value = value
})


function cvcCheck() {
    let input = document.querySelector(".cvc input")
    let label = document.querySelector(".cvc label")

    if (input.value.length > 3 || input.value.length < 3) {
        label.innerHTML = `CVC <span class="text-danger">Invalid CVC</span>`
        return false
    }
    label.innerHTML = `CVC <i class="fa-solid fa-circle-check" style="color: #0ff065;"></i>`
    return true
}
window.cvcCheck = cvcCheck

// ? Order Summary
let orderPrdCont = document.querySelector(".second-stage .product-cont")
function orderProductAdd() {
    let shipMethodeDom = document.querySelector(".second-stage .shipping-methode")
    shipMethodeDom.innerHTML = `${shippingMethode} Shipping`
    addedProducts.forEach(prd => {
        orderPrdCont.innerHTML += `
        <div class="prd d-flex justify-content-between mt-3" data-id="${prd.id}">
            <div class="prd-main d-flex align-items-center gap-3">
                <img src="${prd.img}" alt="" class="img-fluid col-3 col-md-3">
                <div class="prd-about d-flex flex-column align-items-start col-md-7">
                    <h6 class="prd-name">${prd.name}</h6>
                    <h6 class="colors text-black text-opacity-50 m-0">${prd.colors}</h6>
                    <div
                        class="quantiy d-flex align-items-center justify-content-center gap-1 col-lg-5 rounded mt-2">
                        <p class="fs-5 fw-bold m-0 minus">−</p>
                        <p class="fs-3 m-0 count">${prd.count}</p>
                        <p class="fs-5 fw-bold m-0 plus">＋</p>
                    </div>
                </div>
            </div>
            <h5 class="price m-0 ">$${prd.price}</h5>
        </div>
        `
    })
    orderCountInDe()
    updateTotals()
}

function orderCountInDe() {
    let products = document.querySelectorAll(".product-cont .prd")
    products.forEach(prd => {
        let prdId = prd.dataset.id
        let quantiy = prd.querySelector(".quantiy")
        let prdCount = quantiy.querySelector(".count")
        let count;
        quantiy.addEventListener("click", e => {
            let clickedBtn = e.target
            count = parseInt(prdCount.textContent)
            if (clickedBtn.classList.contains("plus")) {
                count = Math.min(5, count + 1)
            }
            if (clickedBtn.classList.contains("minus")) {
                count = parseInt(prdCount.textContent)
                count = Math.max(1, count - 1)
            }
            let samePrd = addedProducts.find(prd => prd.id == prdId)
            samePrd.count = count
            samePrd.total = count * samePrd.price
            localStorage.setItem("addedCart", JSON.stringify(addedProducts))
            prdCount.textContent = count
            updateTotals()
        })
    })

}

let totalSum;
function updateTotals() {
    let subTotalDom = document.querySelector(".second-stage .subTotal .price")
    let totalDom = document.querySelector(".second-stage .total .price")

    let subTotal = addedProducts.reduce((akk, prd) => akk + Number(prd.total), 0)
    totalSum = (subTotal + shippingCost).toFixed(2)
    subTotalDom.innerHTML = `$${subTotal.toFixed(2)}`
    totalDom.innerHTML = `$${totalSum}`
}

// ? Next Stage(Final)
let placeOrder = document.querySelector(".second-stage .placeOrder")
placeOrder.addEventListener("click", () => {
    let checkedInformations = nameCheck && telNumberCheck() && emailCheck() && streetCheck() && cityCheck() && stzpCheck && cardNumCheck && expCheck
    let selectedCountry = document.querySelector(".country select").value
    if (checkedInformations && selectedCountry && payMethode && addedProducts.length > 1) {
        changeStage()
    } else {
        alert("Some Information is missing")
    }
})


let finalStage = document.querySelector(".final-stage")
function changeStage() {
    let thirdProcess = document.querySelector(".process-third")
    let proceses = [firstProcess, secondProcess]
    let stages = [firstStage, secondStage]
    proceses.forEach(process => {
        process.classList.remove("complete")
        process.classList.add("complete", "d-none", "d-md-flex")
        process.querySelector(".process-number").innerHTML = `<i class="fa-solid fa-check p-1"></i>`
    })
    thirdProcess.classList.add("border-black", "border-bottom", "border-2")
    stages.forEach(stg => stg.classList.add("d-none"))
    finalStage.classList.remove("d-none")
    finalDomAdd()
}

// ! FINAL STAGE
function finalDomAdd() {
    let productsCont = finalStage.querySelector(".prd-cont")
    let shoppingDate = document.querySelector(".shoppingDate")
    let date = new Date()
    shoppingDate.innerHTML = `${date.getDate()}/${String(date.getMonth() + 1).padStart(2, 0)}/${date.getFullYear()}`
    addedProducts.forEach(prd => {
        productsCont.innerHTML += `
        <div class="prd position-relative col-4 col-md-2 col-lg-1 p-1">
            <img src="${prd.img}" class=" img-fluid">
            <span class="badge count bg-black">${prd.count}</span>
        </div>
        `
    })
}
