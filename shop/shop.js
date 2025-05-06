

// ? tel ucun olan categori secimleri qarisir ona da containerleri foreachle duzelt




// ! Header 
const body = document.querySelector("body")
const searchBtn = document.querySelector(".searchCont")
const searchInput = document.querySelector(".searchInput")
const barBtn = document.querySelector(".barBtn")
const navContainer = document.querySelector(".navCont")

import { showNav, closeNav, openSearch, closeSearch } from '../common.js'
window.showNav = showNav
window.closeNav = closeNav

window.openSearch = openSearch
window.closeSearch = closeSearch

body.addEventListener("click", closeSearch)
// ?

// ! Filter Nav
let categoriesNav = document.querySelector(".categoriesNav")
let filterBtn = document.querySelector(".filterBtn")
let closeCategBtn = document.querySelector(".closeCateg")

let moreBtn = document.querySelector(".moreBtn")
filterBtn.addEventListener("click", () => {
    categoriesNav.classList.add("showCateg")
})
closeCategBtn.addEventListener("click", () => {
    categoriesNav.classList.remove("showCateg")
})


// ? Product Add to DOM
let productsArr = [
    {
        name: "Table Lamp",
        lastPrice: 65.99,
        newPrice: 45.99,
        img: "../home/newArrPhoto/tableLamp.png",
        categorie: "Bedroom",
        id: 1,
        measure: `30 - 70 cm height × 10-30 cm base diameter × 20-50 cm`
    },
    {
        name: "Home Chair",
        lastPrice: 159.99,
        newPrice: 129.99,
        img: "../home/newArrPhoto/chair.png",
        categorie: "Living Room",
        id: 2,
        measure: `40-50 cm seat height × 45-60 cm seat width × 80-110 cm total height.`
    },
    {
        name: "Home Basket",
        lastPrice: 28.99,
        newPrice: 17.99,
        img: "../home/newArrPhoto/basket.png",
        categorie: "Kitchen",
        id: 3,
        measure: `20-60 cm height × 20-50 cm diameter `
    },
    {
        name: "Toaster",
        lastPrice: 99.99,
        newPrice: 70.99,
        img: "../home/newArrPhoto/toaster.png",
        categorie: "Kitchen",
        id: 4,
        measure: `15-25 cm height × 25-40 cm width × 15-30 cm depth.`
    },
    {
        name: "Drawer",
        lastPrice: 69.99,
        newPrice: 55.99,
        img: "../home/newArrPhoto/drawer.png",
        categorie: "Kitchen",
        id: 5,
        measure: `10-30 cm height × 30-100 cm width × 35-60 cm depth`
    },
    {
        name: "Coffee Table",
        lastPrice: 49.99,
        newPrice: 59.99,
        img: "../shop/productImg/coffeeTable.png",
        categorie: "Living Room",
        id: 6,
        measure: `40-50 cm height × 90-120 cm width × 50-70 cm depth`
    },
    {
        name: "Home Couch",
        lastPrice: 169.99,
        newPrice: 129.99,
        img: "../shop/productImg/couch.png",
        categorie: "Living Room",
        id: 7,
        measure: ` 70-90 cm height × 180-240 cm width × 80-100 cm depth`
    },
    {
        name: "Vase",
        lastPrice: 72.99,
        newPrice: 39.99,
        img: "../shop/productImg/vase.png",
        categorie: "Living Room",
        id: 8,
        measure: `20-60 cm height × 10-30 cm diameter`
    },
    {
        name: "Bed",
        lastPrice: 255.99,
        newPrice: 299.99,
        img: "../shop/productImg/bed.png",
        categorie: "Bedroom",
        id: 9,
        measure: `135-150 cm width × 190-200 cm length`
    },
    {
        name: "Wardrove",
        lastPrice: 129.99,
        newPrice: 99.99,
        img: "../shop/productImg/wardrobe.png",
        categorie: "Bedroom",
        id: 10,
        measure: `180-240 cm height × 80-200 cm width × 50-70 cm depth`
    },
    {
        name: "Pillow",
        lastPrice: 39.99,
        newPrice: 21.99,
        img: "../shop/productImg/pillow.png",
        categorie: "Bedroom",
        id: 11,
        measure: `40-60 cm width × 60-80 cm length`
    },
    {
        name: "Kitchen Pan",
        lastPrice: 55.99,
        newPrice: 39.99,
        img: "../shop/productImg/Pan.png",
        categorie: "Kitchen",
        id: 12,
        measure: `20-30 cm diameter × 5-10 cm height`
    },
    {
        name: "Fresh Soap",
        lastPrice: 7.99,
        newPrice: 3.99,
        img: "../shop/productImg/soap.png",
        categorie: "Bathroom",
        id: 13,
        measure: `7-10 cm length × 4-6 cm width × 2-4 cm height`
    },
    {
        name: "Tooth Brush",
        lastPrice: 8.99,
        newPrice: 4.99,
        img: "../shop/productImg/toothBrush.png",
        categorie: "Bathroom",
        id: 14,
        measure: `15-20 cm length × 1-2 cm width`
    },
    {
        name: "Toilet Papier Roll",
        lastPrice: 4.99,
        newPrice: 2.99,
        img: "../shop/productImg/toiletRoll.png",
        categorie: "Bathroom",
        id: 15,
        measure: `10-12 cm roll diameter × 10-12 cm roll width × 10-12 cm sheet size`
    },
    {
        name: "Modern Bathtub",
        lastPrice: 345.99,
        newPrice: 299.99,
        img: "../shop/productImg/bathtub.png",
        categorie: "Bathroom",
        id: 16,
        measure: `140-180 cm length × 70-90 cm width × 40-60 cm height`
    },
    {
        name: "Dinning Table",
        lastPrice: 465.99,
        newPrice: 385.99,
        img: "../shop/productImg/dinningTable.png",
        categorie: "Dinning",
        id: 17,
        measure: `70-80 cm height × 120-200 cm width × 70-100 cm depth`
    },
    {
        name: "Elegant Black Chandelier with Crystal Accents",
        lastPrice: 425.99,
        newPrice: 355.99,
        img: "../shop/productImg/chandelier.png",
        categorie: "Dinning",
        id: 18,
        measure: `30-100 cm height × 40-80 cm diameter`
    },
    {
        name: "White Butter Dish with Gold Accents",
        lastPrice: 125.99,
        newPrice: 87.99,
        img: "../shop/productImg/tray.png",
        categorie: "Dinning",
        id: 19,
        measure: `10-15 cm length × 7-10 cm width × 5-7 cm height`
    },
    {
        name: "Elegant Silver Vase Modern Art Design Home Decor",
        lastPrice: 32.99,
        newPrice: 43.99,
        img: "../shop/productImg/silvervase.png",
        categorie: "Dinning",
        topRated: true,
        id: 20,
        measure: `20-60 cm height × 10-30 cm diameter`
    },
    {
        name: "Three Stylish Beanbag Chairs in Grey Orange and Red",
        lastPrice: 54.99,
        newPrice: 39.99,
        img: "../shop/productImg/pufChair.png",
        categorie: "Outdoor",
        id: 21,
        measure: `70-100 cm height × 90-150 cm width × 90-150 cm depth`
    },
    {
        name: "White Wooden Gazebo Garden Structure ",
        lastPrice: 545.99,
        newPrice: 470.99,
        img: "../shop/productImg/wooden.png",
        categorie: "Outdoor",
        topRated: true,
        id: 22,
        measure: `220-300 cm height × 300-500 cm width × 300-500 cm depth`
    },
    {
        name: "Outdoor wicker dining set with table and seating on a transparent ",
        lastPrice: 455.99,
        newPrice: 400.99,
        img: "../shop/productImg/gardenTable.png",
        categorie: "Outdoor",
        topRated: true,
        id: 23,
        measure: `70-100 cm height × 120-200 cm width × 70-100 cm depth`
    },
]
let productsCont = document.querySelector(".products")

document.addEventListener("DOMContentLoaded", () => {
    productsArr.forEach(product => {
        productAdd(product)
    })
    animationProduct()
    productsCont.addEventListener("click", e => {
        let prd = e.target.closest(".product")
        let prdId = prd.dataset.id - 1
        window.location.href = "../product/product.html"
        localStorage.setItem("viewedPrd", JSON.stringify(productsArr[prdId]))
    })
    // addWish()
})

function animationProduct() {
    document.addEventListener("scroll", () => {
        productsCont.querySelectorAll(".product").forEach(prd => {
            prd.style.transform = "translateY(0)"
            prd.style.opacity = 1
        })
    })
}



// ? Products at Cart 
let cartCont = document.querySelector(".cart-cont")
let cartPrdCont = cartCont.querySelector(".product-cont")
let cartProductsArr = JSON.parse(localStorage.getItem("addedCart")) || []
let basketCount = document.querySelectorAll(".fa-basket-shopping span")

basketCount.forEach(count => count.textContent = cartProductsArr.length)

import { openCart, closeCart, addCartPrd, deletePrd, countInDe, totalCalc, updateCountLocal } from '../common.js'
window.openCart = openCart
window.closeCart = closeCart
window.deletePrd = deletePrd


// ? Import Yarimciq
// window.openCart = openCart



// ? Wish List
// ! Yarimcik qalib
// let wishList = JSON.parse(localStorage.getItem("wishPrd")) || []
// function addWish() {
//     let products = productsCont.querySelectorAll(".product .fa-heart")
//     products.forEach(prd => {
//         prd.addEventListener("click", e => {
//             e.stopPropagation()
//             let clickedId = Number(e.target.dataset.id)
//             let isSame = wishList.some(prd => prd.id == clickedId)
//             if (!isSame) {
//                 wishList.push(productsArr[clickedId - 1])
//                 localStorage.setItem("wishPrd", JSON.stringify(wishList))
//             }
//         })
//     })
// }

moreBtn.addEventListener("click", () => {
    productsCont.style.overflow = "visible"
    productsCont.style.height = "auto"
    moreBtn.classList = "row moreBtn d-none"
})
// ! Categories List
let categoriContainers = document.querySelectorAll(".categories-cont")
let categName = document.querySelector(".categ-name")
let currentCateg = "All Rooms"
let currentArr = [...productsArr]
let sortSelect = document.querySelector(".sortSelect")

categoriContainers.forEach(cont => {
    let categoriesList = cont.querySelectorAll(".categ-list li")
    categoriesList.forEach(li => {
        li.addEventListener("click", e => {
            currentCateg = e.target.textContent
            sortSelect.selectedIndex = 0
            currentArr = productsArr.filter(prd => prd.categorie.toLocaleLowerCase() == currentCateg.toLocaleLowerCase())
            document.querySelectorAll(".categ-list a").forEach(a => {
                a.classList.remove("active")
            })
            e.target.classList.toggle("active")
            productsCont.innerHTML = ""
            if (currentArr.length > 0) {
                categName.textContent = currentCateg
                currentCateg = e.target.textContent
            } else {
                currentArr = productsArr
                currentCateg = "All Rooms"
            }
            currentArr.forEach(prd => {
                productAdd(prd)
            })
        })
    })
})
// ! Price 

categoriContainers.forEach(container => {
    let priceInputs = container.querySelectorAll(".price-inputs input")

    let line = container.querySelector(".slider .line")

    let rangeInputs = container.querySelectorAll(".range-cont input")

    priceInputs.forEach(input => {
        input.addEventListener("change", () => {
            let min = parseFloat(priceInputs[0].value)
            let max = parseFloat(priceInputs[1].value)

            if (min > max) min = max - 10
            if (min < 0) min = 0
            if (max > 500) max = 500

            inputsComponents(min, max,)
        })
    })
    rangeInputs.forEach(input => {
        input.addEventListener("input", () => {
            let min = parseFloat(rangeInputs[0].value)
            let max = parseFloat(rangeInputs[1].value)

            if (min > max) min = max - 50
            if (min < 0) min = 0
            if (max > 500) max = 500

            inputsComponents(min, max)
        })
    })

    function inputsComponents(min, max) {

        [priceInputs[0], rangeInputs[0]].forEach(input => input.value = min);
        [priceInputs[1], rangeInputs[1]].forEach(input => input.value = max);

        let minPercent = min / 500 * 100
        let maxPercent = 100 - (max / 500 * 100)

        line.style.right = maxPercent + "%"
        line.style.left = minPercent + "%"

        productsCont.innerHTML = ""
        if (currentCateg == "All Rooms") {
            currentArr = productsArr.filter(prd => {
                return min < prd.newPrice && max > prd.newPrice
            })
        } else {
            currentArr = productsArr.filter(prd => {
                return currentCateg == prd.categorie && (min < prd.newPrice && max > prd.newPrice)
            })
        }

        currentArr.forEach(prd => {
            productAdd(prd)
        })

    }
})

// ! Sort

let select = document.querySelector(".sortBy select")

select.addEventListener("change", () => {
    productsCont.innerHTML = ""
    let newProductArr = []
    switch (select.value) {
        case "low":
            newProductArr = [...currentArr].sort((a, b) => a.newPrice - b.newPrice)
            newProductArr.forEach(prd => {
                prd.categorie == currentCateg ? productAdd(prd) : null
            })
            break;
        case "high":
            newProductArr = [...currentArr].sort((a, b) => b.newPrice - a.newPrice)
            newProductArr.forEach(prd => {
                productAdd(prd)
            })
            break;
        case "rated":
            let rated = currentArr.filter(prd => prd.topRated)
            rated.forEach(prd => {
                productAdd(prd)
            })
            break;
        case "sort":
            productsArr.forEach(prd => {
                productAdd(prd)
            })
            break;
    }

})

function productAdd(prd) {
    productsCont.innerHTML += `
            <div class="product col-10 col-sm-5 col-lg-3 h-50 mt-1" data-id=${prd.id}>
                <div class="product-main position-relative p-4">
                    <div class="product-head d-flex justify-content-between">
                        <div class="title">
                            <h5>New</h5>
                            <p class="fw-bold">-50%</p>
                        </div>
                        <i class="fa-regular fa-heart rounded h-25 p-1 bg-light" data-id="${prd.id}"></i>
                    </div>
                    <div class="img-cont p-2 p-sm-1 p-lg-0">
                        <img src="${prd.img}" class="img-fluid" alt="">
                    </div>
                    <button class="bg-black text-light w-75">Shop Now</button>
                </div>
                <div class="product-desc">
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h6>${prd.name}</h6>
                    <h6 class="price">$${prd.newPrice} <span
                            class="text-black opacity-75 text-decoration-line-through ms-2">$${prd.lastPrice}</span>
                    </h6>
                </div>
            </div>
`
}

