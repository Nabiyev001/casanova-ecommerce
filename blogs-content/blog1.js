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