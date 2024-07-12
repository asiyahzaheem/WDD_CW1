const productsEl = document.getElementById('products')
const cartItemsEl = document.getElementById('cart-items')
const mainEl = document.getElementsByTagName('main')[0];
const modalEl = document.getElementById('product-modal')
const cartModalEl = document.getElementById('cart-modal')
const productModalEl = document.getElementById('product-modal-content')
const cartModalContentEl = document.getElementById('cart-modal-content')
const cartBtnEl = document.getElementById("btn-cart");
var productsDataMain;

// total price for cart element !
// round values to 2dp

var cart = {
    products : [],
    totalQty: 0,
    totalPrice: 0,
    shippingFee: 0
}

fetchJSONData();

async function fetchJSONData() {
    try {
        const res = await fetch("./src/products.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        displayProducts(data["products"]);
        displayCartItem();
        // return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
};

function fetchLocalStorage() {
    const LSdata = JSON.parse(localStorage.getItem("cart")) || cart
    console.log(LSdata)
    return LSdata
}

function setLocalStorage(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData))
    console.log("stored 2")
    console.log(fetchLocalStorage())
}

// displayProducts();

async function displayProducts(productsData) {
    console.log(productsData + "from display")
    // var fetchedData =  await fetchJSONData()
    // var productsData = fetchedData["products"];
    productsDataMain = productsData;
    if(productsData) {
        productsData.forEach(productData => {
            const productHTML = `
            <div class="product" data-product-id="${productData.id}">
                    <div class="product-img">
                        <img src="src/images/${productData.image}" alt="Product 1"/>
                    </div>
                    <div class="product-content">
                        <div class="main">
                             <span class="product-title">${productData.title}</span>
                             <span class="product-price">$ ${productData.price}</span>
                         </div>
                         <span class="product-options">${productData.options.sizes[0]}, ${productData.options.colors[0]}</span>
                         <div class="product-btn">
                            <button class="btn addToCartBtn" type="button" data-id="${productData.id}" onClick=addToCart(this) >Add to Cart</button>
                        </div>
                    </div>
                </div>
            `

            // onClick=addToCart(${productData.id})
            productsEl.innerHTML += productHTML;

        });



        // CART EVENT HANDLING
        // const addToCartBtnIn = document.getElementsByClassName("addToCartBtn");
        // for(var i = 0; i < addToCartBtnIn.length; i++) {
        //     const button = addToCartBtnIn[i]
        //     console.log(button + "from display");
        //     button.addEventListener("click", (e) => {
        //         console.log("clicked from display")
        //         const productData = productsDataMain[e.target.dataset.id - 1]
        //         console.log(productData)
        //         let cartItems = fetchLocalStorage()
        //         console.log(cartItems)
        //         const filterData = {
        //             productID : productData.id,
        //             title : productData.title,
        //             options : {
        //                 color : productData.options.colors[0], // change
        //                 size : productData.options.sizes[0], // change
        //             },
        //             price : productData.price,
        //             qty: 1, // change later
        //         }
        //         console.log(filterData)
        //         cartItems.products.push(filterData);
        //         cartItems.totalPrice += filterData.price;
        //         cartItems.totalQty += 1;
        //         cartItems.shippingFee += (filterData.price * 0.05)
        //         setLocalStorage(cartItems)
        //         console.log("stored")
        // })
        // }
        
        
        // MODAL EVENT HANDLING

        const productListEl = document.getElementsByClassName("product");
        for(var i = 0; i < productListEl.length; i++) {
            productListEl[i].addEventListener('click', (e) => {
                // console.log(e.target.tagName)
                if(e.target.tagName == 'IMG') {
                    // console.log("clicked image")
                    var productID = e.target.closest('.product').dataset.productId;
                    // console.log("productid" + productID)
                    openModal(productsData[productID - 1]);
                }
            })
        }
        // var addToCartBtnListEl = document.getElementsByClassName('addToCartBtn');
        // console.log(addToCartBtnListEl)
        return productsData;
    }


}

function addToCart(e) {
    const productID = e.dataset.id;
    const productData = productsDataMain[productID - 1]
    console.log(productData)
    let cartItems = fetchLocalStorage()
    console.log(cartItems)
    let cartProductItems = cartItems.products
    const foundItem = cartProductItems.find(item => item.productID.toString() == productID.toString())
    if(foundItem) {
        console.log("found" + foundItem)
        cartItems.products = cartItems.products.map(item => item.productID.toString() == productID.toString() ? {...item, qty: item.qty + 1} : item)
        console.log(cartItems.products)

    } else {
        const filterData = {
            productID : productData.id,
            title : productData.title,
            options : {
                color : productData.options.colors[0], // change
                size : productData.options.sizes[0], // change
            },
            image: productData.image,
            price : productData.price,
            qty: 1, // change later
        }
        console.log(filterData)
        cartItems.products.push(filterData);
    }

    cartItems.totalPrice = Math.round((cartItems.totalPrice + productData.price) * 100) / 100
    cartItems.totalQty += 1;
    cartItems.shippingFee = Math.round((cartItems.shippingFee + (productData.price * 0.05)) * 100) / 100
    setLocalStorage(cartItems)
    console.log("stored")
    displayCartItem();
    openCartModal();
    

    

}
// function addToCartModal() {
//     console.log("add to cart modal")
//     var addToCartBtnListEl = document.getElementsByClassName('addToCartBtn');
//     console.log(addToCartBtnListEl)
//     for(var i = 0; i < addToCartBtnListEl.length; i++) {
//         addToCartBtnListEl[i].addEventListener('click', (e) => {
//         var productID = e.target.dataset.id;
//         console.log(productID)
//         addToCart(productsDataMain[productID - 1])
//         })
//     }
// }


function openModal(productData) {
    modalEl.style.display = "block"
    var modalHTML = `
        <div class="modal-image">
            <img src="src/images/${productData.image}" alt="Product ${productData.id}"/>
        </div>
        <div class="modal-info">
            <div class="main-content">
                <p class="product-title">${productData.title}</p>
                <p class="product-desc">${productData.description}</p>
                <p class="product-price">$ ${productData.price}</p>
                <hr>
                <div class="product-color">
                    <span>Choose a Color </span>
                    <div class="options">
                    ${productData.options.colors.map(color => (
                        `<button id="${color.toLowerCase()}"></button>`
                    )).join('')}
                    </div>
                </div>
                <hr>
                <div class="product-size">
                    <span>Choose a Size </span>
                    <div class="options">
                    ${productData.options.sizes.map(size => (
                        `<button id="${size.toLowerCase()}">${size}</button>`
                    )).join('')}
                    </div>
                </div>
                <hr>
                <div class="product-qty">
                    <span>Quantity</span>
                    <input type="number" value=${productData.qty} min="1" max="10"/>
                </div>
                <div class="product-btn">
                    <button class="btn addToCartBtn" type="button" data-id="${productData.id}" onClick=addToCart(this)>Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    productModalEl.innerHTML += modalHTML;

    // CLOSE MODAL HANDLING
    var closeBtn = document.getElementById('close-btn');
    console.log(closeBtn)
    console.log("closeee")
    closeBtn.addEventListener("click", closeModal);
    
    // var addToCartBtnListEl = document.getElementsByClassName('addToCartBtn');
    // for(var i = 0; i < addToCartBtnListEl.length; i++) {
    //     addToCartBtnListEl[i].addEventListener('click', (e) => {
    //     var productID = e.target.dataset.id;
    //     console.log(productID)
    //     addToCart(productsDataMain[productID - 1])
    //     })
    // }
    
}

function closeModal() {
    console.log("close")
    // reset inner html 
    productModalEl.innerHTML = `
    <button class="close-btn" id="close-btn">
            <ion-icon name="close-outline" size="large"></ion-icon>
        </button>
        `
    modalEl.style.display = "none";
}

// must take in { productid, options chosen etc }
function displayCartItem() {
    const {products, totalQty, totalPrice, shippingFee} = fetchLocalStorage();
    if(products.length == 0) {
        console.log("Empty cart")
        return;
    }
    cartItemsEl.innerHTML = '';
    console.log(products)
    products.forEach(productData => {
        const cartItemHTML = `
            <div class="cart-item">
                <div class="image">
                    <img src="src/images/${productData.image}" alt="Product 1" />
                </div>
                <div class="content">
                    <div class="row">
                        <span class="title">${productData.title}</span>
                        <span class="price">$ ${productData.price}</span>
                    </div>

                    <div class="row">
                        <span class="options">${productData.options.size}, ${productData.options.color}</span>
                        <input type="number" value=${productData.qty} max="10" min="1"/>
                        <button class="deleteFromCartBtn btn">
                            <ion-icon name="trash-outline" size="small"></ion-icon>
                        </button> 
                    </div>
                </div>
            </div>
            `
            cartItemsEl.innerHTML += cartItemHTML;
    })
    const cartSubtotalEl = document.getElementById("cartSubtotal")
    const cartShippingEl = document.getElementById("cartShipping")
    const cartTotalEl = document.getElementById("cartTotal")
    cartSubtotalEl.innerText = `$${totalPrice}`;
    cartShippingEl.innerText = `$${shippingFee}`;
    cartTotalEl.innerText = `$${(totalPrice + shippingFee)}`;
}

function openCartModal() {
    cartModalEl.style.display = "block";
    document.body.style.overflow = "hidden";
    cartModalContentEl.style.transform = "translateX(0px)";

    const cartModalCloseBtnEl = document.getElementById("cart-close-btn");
    console.log(cartModalCloseBtnEl)
    cartModalCloseBtnEl.addEventListener("click", (e) => {
        // cartItemsEl.innerHTML = '';
        document.body.style.overflow = "scroll";
        cartModalContentEl.style.transform = "translateX(110%)";
        cartModalEl.style.display = "none";
    })
}
// make rest of th page unresponsive !done
// fix closebtn issue ! done
// set class to product instead of id !done
// active on color/size - radio button fieldset
// get cart to slide
// cart local storage
// click out out modal to close modal
// if productModal and cartModal are open, close productModal when cartModal is closed
// Fetching the data and handling the promise

// event handler for addToCart event
// addToCart function
// event handler for delete event
// delete function

