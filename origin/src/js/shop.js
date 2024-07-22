const productsEl = document.getElementById('products')
const cartItemsEl = document.getElementById('cart-items')
const mainEl = document.getElementsByTagName('main')[0];
const modalEl = document.getElementById('product-modal')
const cartModalEl = document.getElementById('cart-modal')
const productModalEl = document.getElementById('product-modal-content')
const cartModalContentEl = document.getElementById('cart-modal-content')
const cartBtnEl = document.getElementById("btn-cart");

var currentProductData;
var productsData;

var cart = {
    products : [],
    totalQty: 0,
    totalPrice: 0,
    shippingFee: 0
}

fetchJSONData();
handleFiltering();

// FETCHES DATA FROM PRODUCTS.JSON FILE
async function fetchJSONData() {
    try {
        const res = await fetch("./src/products.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        productsData = data["products"]
        displayProducts(data["products"]);
        displayCartItem();
    
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
};

// LOCAL STORAGE
function fetchLocalStorage() {
    return JSON.parse(localStorage.getItem("cart")) || cart
}

function setLocalStorage(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData))
}


// FILTER DATA BASED ON FIELD AND VALUE FROM BUTTONS
async function handleFiltering() {
    const filterBtnsEl = document.getElementsByClassName("filterBtn")
    var filteredProducts;

    for(let filterBtn of filterBtnsEl) {
        filterBtn.addEventListener("click", async (e) => {

            for(let filterBtn of filterBtnsEl) {
                filterBtn.classList.remove("filter-active")
            }

            filterBtn.classList.add("filter-active")

            var filterValue = e.target.dataset.filter;
            if(filterValue === "all") {
                displayProducts(productsData);
                return;

            }
            var filterOn = e.target.dataset.filteron;

            if(filterOn === "title") {
                filteredProducts =  productsData.filter(product => product.title.toLowerCase().includes(filterValue.toLowerCase()))
            } else if(filterOn === "size") {
                filteredProducts =  productsData.filter(product => product.options["sizes"].includes(filterValue))
            } else if(filterOn === "color") {
                filteredProducts =  productsData.filter(product => product.options["colors"].includes(filterValue))
            } 

            displayProducts(filteredProducts);
        })
    }
}

// DISPLAY PRODUCT CARDS
async function displayProducts(productsData) {
    currentProductData = productsData;

    if(productsData) {
        productsEl.innerHTML = ""
        productsData.forEach(productData => {
            const productHTML = `
            <div class="product" data-product-id="${productData.id}">
                    <div class="product-img">
                        <img src="src/images/shop/${productData.image}" alt="Product image of ${productData.title}"/>
                    </div>
                    <div class="product-content">
                        <div class="main">
                             <span class="product-title">${productData.title}</span>
                             <span class="product-price">$ ${productData.price}</span>
                         </div>
                         <div class="product-options">
                            <span class="size-opt">${productData.options.sizes[0]}</span>
                            <span> | </span>
                            <span class="color-opt">${productData.options.colors[0]}</span>
                         </div>
                         
                         <div class="product-btn">
                            <button class="btn addToCartBtn productAddToCart" type="button" data-id="${productData.id}" onClick=handleAddToCart(event) > Add to Cart</button>
                        </div>
                    </div>
                </div>
            `

            productsEl.innerHTML += productHTML;
        });

        const productListEl = document.getElementsByClassName("product");

        for(let productItem of productListEl) {
            productItem.addEventListener('click', (e) => {
                if(e.target.tagName == 'IMG') {
                    var productID = e.target.closest('.product').dataset.productId;
                    const productData = productsData.filter(data => data.id == productID)[0]
                    openModal(productData);
                }
            })
        }
        return productsData;
    }
}

// OPENS PRODUCT MODAL WITH RESPECTIVE INFORMATION
function openModal(productData) {
    modalEl.style.display = "block"
    var modalHTML = `
        <div class="modal-image">
            <img src="src/images/shop/${productData.image}" alt="Product image of ${productData.title}"/>
        </div>
        <div class="modal-info">
            <div class="main-content">
                <p class="product-title">${productData.title}</p>
                <p class="product-desc">${productData.description}</p>
                <p class="product-price">$ ${productData.price}</p>
                <hr>
                <div class="product-color">
                    <span>Choose a Color </span>
                    <div class="options colorOptions">
                    ${productData.options.colors.map(color => (
                        `<div id="${color}" class="color-opt"></div>`
                    )).join('')}
                    </div>
                </div>
                <hr>
                <div class="product-size">
                    <span>Choose a Size </span>
                    <div class="options sizeOptions">
                    ${productData.options.sizes.map(size => (
                        `<div id="${size}" class="size-opt">${size}</div>`
                    )).join('')}
                    </div>
                </div>
                <hr>
                <div class="product-btn">
                    <button class="btn addToCartBtn modalAddToCart" type="button" data-id="${productData.id}" onClick=handleAddToCart(event)>Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    productModalEl.innerHTML += modalHTML;



    var closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener("click", closeModal);
    
    var colorOptionEl = productModalEl.getElementsByClassName("color-opt");
    var sizeOptionEl = productModalEl.getElementsByClassName("size-opt");

    colorOptionEl[0].classList.add("selected")
    sizeOptionEl[0].classList.add("selected")

    for(let colorOption of colorOptionEl) {
        colorOption.addEventListener("click", (e) => {
            checkClasslist("selected", colorOptionEl)
            e.target.classList.toggle("selected");
        })
    }

    for(let sizeOption of sizeOptionEl) {
        sizeOption.addEventListener("click", (e) => {
            checkClasslist("selected", sizeOptionEl)
            e.target.classList.toggle("selected");
        })
    }
}


// CHECKS IF A CLASSNAME EXISTS IN THE NODE LIST
function checkClasslist(className, nodeList) {
    for(let node of nodeList) {
        if(node.classList.contains(className)) {
            node.classList.remove(className);
            return;
        }
    }
}

// CLOSES PRODUCT MODAL
function closeModal() {
    productModalEl.innerHTML = `
    <button class="close-btn" id="close-btn">
            <ion-icon name="close-outline" size="large"></ion-icon>
        </button>
        `
    modalEl.style.display = "none";
}

// DISPLAYS CART ITEMS
function displayCartItem() {
    const {products, totalQty, totalPrice, shippingFee} = fetchLocalStorage();
    const cartSubtotalEl = document.getElementById("cartSubtotal")
    const cartQtyEl = document.getElementById("cartQty")
    const cartShippingEl = document.getElementById("cartShipping")
    const cartTotalEl = document.getElementById("cartTotal")
    const cartHeaderEl = document.getElementById("cartHeader");
    const cartFooterEl = document.getElementById("cartFooter");
    
    cartItemsEl.innerHTML = '';
    cartHeaderEl.style.display = "flex"
    cartFooterEl.style.display = "flex"
    cartModalContentEl.classList.remove("empty");

    // EMPTY CART
    if(products.length == 0) {
        cartModalContentEl.classList.add("empty");
        cartHeaderEl.style.display = "none"
        cartFooterEl.style.display = "none"
        cartItemsEl.style.width = "100%"

        cartItemsEl.innerHTML = `
        <div class='empty-cart'>
            <h3>Your cart is empty</h3>
            <a href="shop.html">Continue shopping </a>
        </div>
        `;
        return;
    } 


    // RENDER CART ITEM
    products.forEach(productData => {
        const cartItemHTML = `
            <div class="cart-item" data-id=${productData.id}>
                <div class="image">
                    <img src="src/images/shop/${productData.image}" alt="Product image of ${productData.title}" />
                </div>
                <div class="content">
                    <div class="row">
                        <span class="title">${productData.title}</span>
                        <span class="price">$ ${productData.price}</span>
                    </div>

                    <div class="row">
                        <div class="product-options">
                            <span class="size-opt">${productData.size}</span>
                            <span> | </span>
                            <span class="color-opt">${productData.color}</span>
                         </div>
                        <input type="number" id="cartItemAddToCart" class="cartItemAddToCart" value=${productData.qty} max="10" min="1" data-id=${productData.id} oninput="handleQtyChange(event)" />
                        <button class="deleteFromCartBtn btn" onClick="handleRemoveFromCart(event)">
                            <ion-icon name="trash-outline" size="small"></ion-icon>
                        </button> 
                    </div>
                </div>
            </div>
            `
            cartItemsEl.innerHTML += cartItemHTML;
    })

    
    // PREVENTS USER FROM INPUTTING IN THE QTY INPUT 
    cartItemsEl.querySelectorAll('input').forEach(function(input) {
        input.addEventListener('keydown', function(e) {
            e.preventDefault();
            return false;
        });
    });

    // RENDER AMOUNTS

    cartQtyEl.innerText = `${totalQty} items`;
    cartSubtotalEl.innerText = `$${totalPrice}`;
    cartShippingEl.innerText = `$${shippingFee}`;
    cartTotalEl.innerText = `$${(totalPrice + shippingFee)}`;
}

// HANDLES INC AND DEC IN QTY
function handleQtyChange(e) {
    var inputElement = e.target;
    var oldValue = inputElement.defaultValue || 1; 
    var newValue = inputElement.value;

    if (newValue > oldValue) {
        handleAddToCart(e)
    } else if(newValue < oldValue) {
        handleRemoveFromCart(e);
    }

    inputElement.defaultValue = newValue;
}


// OPENS THE CART MODAL
function openCartModal() {
    cartModalEl.style.display = "block";
    document.body.style.overflow = "hidden";
    cartModalContentEl.style.transform = "translateX(0px)";

    const cartModalCloseBtnEl = document.getElementById("cart-close-btn");

    cartModalCloseBtnEl.addEventListener("click", (e) => {
        document.body.style.overflow = "scroll";
        cartModalContentEl.style.transform = "translateX(110%)";
        cartModalEl.style.display = "none";
    })
}

// FINDS WHICH OPTION (COLOR/SIZE) IS SELECTED BY THE USER
function findSelectedOption(optionsEl) {
    for(let opt of optionsEl) {
        if(opt.classList.contains("selected")) {
            return opt.id
        }
    }

}


// ADDS DATA TO CART
function addToCart(data) {
    let cartItems = fetchLocalStorage()
    let cartProductItems = cartItems.products;

    // CHECKS IF THE SAME ITEM ALREADY EXISTS, IF IT DOES IT ONLY INCREASE THE QTY
    const foundItem = cartProductItems.find(item => {
        const { id, size, color } = item;
        return id.toString() === data.id.toString() && 
               size.toString() === data.size.toString() && 
               color.toString() === data.color.toString();
      });
      
    if(foundItem) {
        cartItems.products = cartItems.products.map(item => item.id.toString() == data.id.toString() && item.size.toString() == data.size.toString() && item.color.toString() == data.color.toString() ? {...item, qty: item.qty + 1} : item)
    } else {
        cartItems.products.push(data);
    }

    cartItems.totalPrice = Math.round((cartItems.totalPrice + data.price) * 100) / 100
    cartItems.totalQty += 1;
    cartItems.shippingFee = Math.round((cartItems.shippingFee + (data.price * 0.05)) * 100) / 100

    setLocalStorage(cartItems)
    displayCartItem();
    openCartModal();
}


// HANDLES DIFFERENCE ADD TO CART EVENTS. EITHER FROM PRODUCT CARD, PRODUCT MODAL OR QTY INCREASE
function handleAddToCart(e){
    var productColor, productSize;
    const targetEl = e.target
    const productID = targetEl.dataset.id;

    const productData = productsData.filter(data => data.id == productID)[0]

    var filterData;

    if(targetEl.classList.contains("productAddToCart") ) {
        const productEl = targetEl.closest(".product");
        productColor = productEl.querySelector(".color-opt").textContent;
        productSize = productEl.querySelector(".size-opt").textContent;

    } else if(targetEl.classList.contains("modalAddToCart")) {
        const colorOptionsEl = document.querySelector(".colorOptions").children;
        const sizeOptionsEl = document.querySelector(".sizeOptions").children;
        productColor = findSelectedOption(colorOptionsEl)
        productSize = findSelectedOption(sizeOptionsEl)
    
    } else if(targetEl.classList.contains("cartItemAddToCart")) {
        const cartItemEl = targetEl.closest(".cart-item");
    
        productColor = cartItemEl.querySelector(".color-opt").textContent;
        productSize = cartItemEl.querySelector(".size-opt").textContent;
    
    }

    filterData = {
        id : productData.id,
        title : productData.title,
        image: productData.image,
        price : productData.price,
        color : productColor.toLowerCase(),
        size : productSize.toLowerCase(),
        qty: 1,
    }

    addToCart(filterData)
}

// HANDLES REMOVING AN ITEM FROM THE CART
function handleRemoveFromCart(e) {
    const cartItemEl = e.target.closest(".cart-item");
    const id = cartItemEl.dataset.id;

    const color = cartItemEl.querySelector(".color-opt").textContent;
    const size = cartItemEl.querySelector(".size-opt").textContent;
    removeFromCart({id, color, size}, e.target)
}

function removeFromCart(data, target) {
    const {id, color, size} = data;
    var newPrice, newQty;
    let cartItems = fetchLocalStorage()

    const sameCartItem =  cartItems.products.find(item => item.id == id && item.color == color && item.size == size)

    var tagName = target.tagName.toLowerCase()
    if(tagName == "ion-icon" || tagName == "button") {
        cartItems.products = cartItems.products.filter(item => {
            return item != sameCartItem}
        )
        
        newPrice = sameCartItem.price * sameCartItem.qty
        newQty = sameCartItem.qty;

    } else if(tagName == "input") {
        cartItems.products = cartItems.products.map(item => item == sameCartItem ? {...item, qty: item.qty - 1} : item)
        newPrice = sameCartItem.price;
        newQty = 1
    }

    cartItems.totalPrice = Math.round((cartItems.totalPrice - newPrice) * 100) / 100
    cartItems.totalQty -= newQty;
    cartItems.shippingFee = Math.round((cartItems.shippingFee - (newPrice * 0.05)) * 100) / 100

    setLocalStorage(cartItems)
    displayCartItem();
}