const productsEl = document.getElementById('products')
const cartItemsEl = document.getElementById('cart-items')
const mainEl = document.getElementsByTagName('main')[0];
const modalEl = document.getElementById('product-modal')
const cartModalEl = document.getElementById('cart-modal')
const productModalEl = document.getElementById('product-modal-content')
const cartModalContentEl = document.getElementById('cart-modal-content')
const cartBtnEl = document.getElementById("btn-cart");
var productsDataMain;
var productsDataa;

var cart = {
    products : [],
    totalQty: 0,
    totalPrice: 0,
    shippingFee: 0
}

fetchJSONData();
handleFiltering();

window.onload = () => {
    console.log("hello")
    // handleFiltering();
    
}

async function fetchJSONData() {
    try {
        const res = await fetch("./src/products.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        productsDataa = data["products"]
        // console.log(data);
        displayProducts(data["products"]);
        displayCartItem();
        // return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
};

function fetchLocalStorage() {
    const LSdata = JSON.parse(localStorage.getItem("cart")) || cart
    // console.log(LSdata)
    return LSdata
}

function setLocalStorage(cartData) {
    localStorage.setItem("cart", JSON.stringify(cartData))
    console.log("stored 2")
    console.log(fetchLocalStorage())
}

// displayProducts();

async function handleFiltering() {
    const filterBtnsEl = document.getElementsByClassName("filterBtn")
    var filteredProducts;
    console.log(filterBtnsEl)
    console.log(productsDataa)
    for(let filterBtn of filterBtnsEl) {
        filterBtn.addEventListener("click", async (e) => {

            for(let filterBtn of filterBtnsEl) {
                filterBtn.classList.remove("filter-active")
            }

            filterBtn.classList.add("filter-active")

            var filterValue = e.target.dataset.filter;
            if(filterValue === "all") {
                displayProducts(productsDataa);
                return;

            }
            var filterOn = e.target.dataset.filteron;
            console.log(filterOn, filterValue)

            if(filterOn === "title") {
                filteredProducts =  productsDataa.filter(product => product.title.toLowerCase().includes(filterValue.toLowerCase()))
                
            } else if(filterOn === "size") {
                filteredProducts =  productsDataa.filter(product => product.options["sizes"].includes(filterValue))
            } else if(filterOn === "color") {
                filteredProducts =  productsDataa.filter(product => product.options["colors"].includes(filterValue))
            } 


            console.log(filteredProducts)
            displayProducts(filteredProducts);
            console.log("hello?")
        })

    }
}

async function displayProducts(productsData) {
    console.log("displaying")
    // console.log(productsData + "from display")
    // var fetchedData =  await fetchJSONData()
    // var productsData = fetchedData["products"];
    productsDataMain = productsData;
    if(productsData) {
        productsEl.innerHTML = ""
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

        // handleFiltering();

        // MODAL EVENT HANDLING

        const productListEl = document.getElementsByClassName("product");
        console.log(productsData)
        for(let productItem of productListEl) {
            productItem.addEventListener('click', (e) => {
                // console.log(e.target.tagName)
                if(e.target.tagName == 'IMG') {
                    // console.log("clicked image")
                    var productID = e.target.closest('.product').dataset.productId;

                    // openModal(productsData[productID - 1]);
                    const productData = productsData.filter(data => data.id == productID)[0]
                    openModal(productData);
                }
            })
        }

        return productsData;
    }

    
}

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


    // CLOSE MODAL HANDLING
    var closeBtn = document.getElementById('close-btn');
    console.log(closeBtn)
    console.log("closeee")
    closeBtn.addEventListener("click", closeModal);
    
    // COLOR AND SIZE
    var colorOptionEl = productModalEl.getElementsByClassName("color-opt");
    var sizeOptionEl = productModalEl.getElementsByClassName("size-opt");

    colorOptionEl[0].classList.add("selected")
    sizeOptionEl[0].classList.add("selected")

    console.log(colorOptionEl)
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

function checkClasslist(className, nodeList) {
    for(let node of nodeList) {
        if(node.classList.contains(className)) {
            node.classList.remove(className);
            return;
        }
    }
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
    const cartSubtotalEl = document.getElementById("cartSubtotal")
    const cartShippingEl = document.getElementById("cartShipping")
    const cartTotalEl = document.getElementById("cartTotal")
    const cartHeaderEl = document.getElementById("cartHeader");
    const cartFooterEl = document.getElementById("cartFooter");
    

    cartItemsEl.innerHTML = '';
    cartHeaderEl.style.display = "flex"
    cartFooterEl.style.display = "flex"
    cartModalContentEl.classList.remove("empty");
    // cartItemsEl.style.width = "default"

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

    // console.log(products)
    products.forEach(productData => {
        const cartItemHTML = `
            <div class="cart-item" data-id=${productData.id}>
                <div class="image">
                    <img src="src/images/${productData.image}" alt="Product 1" />
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
    // oninput="handleQtyChange(event)"
    
    cartItemsEl.querySelectorAll('input').forEach(function(input) {
        input.addEventListener('keydown', function(e) {
            console.log("press input")
            e.preventDefault();
            return false;
        });
    });


    cartSubtotalEl.innerText = `$${totalPrice}`;
    cartShippingEl.innerText = `$${shippingFee}`;
    cartTotalEl.innerText = `$${(totalPrice + shippingFee)}`;
}

function handleQtyChange(e) {
    var inputElement = e.target;
    var oldValue = inputElement.defaultValue || 1; 
    var newValue = inputElement.value;

    if (newValue > oldValue) {
        console.log("add one to cart")
        handleAddToCart(e)
    } else if(newValue < oldValue) {
        console.log("User clicked the down arrow.");
        handleRemoveFromCart(e);
    }

    inputElement.defaultValue = newValue;
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

function findSelectedOption(optionsEl) {
    for(let opt of optionsEl) {
        if(opt.classList.contains("selected")) {
            return opt.id
        }
    }

}

function findExactItem(item, data) {
    const { id, size, color } = item;
    return id.toString() === data.id.toString() && 
            size.toString() === data.size.toString() && 
            color.toString() === data.color.toString();
}

function addToCart(data) {
    let cartItems = fetchLocalStorage()
    // console.log(cartItems)
    let cartProductItems = cartItems.products

    // console.log(data)
    const foundItem = cartProductItems.find(item => {
        const { id, size, color } = item;
        return id.toString() === data.id.toString() && 
               size.toString() === data.size.toString() && 
               color.toString() === data.color.toString();
      });
      
 
    // check if same size and color (maybe change to options)
    if(foundItem) {
        console.log("found" + foundItem.toString())
        cartItems.products = cartItems.products.map(item => item.id.toString() == data.id.toString() && item.size.toString() == data.size.toString() && item.color.toString() == data.color.toString() ? {...item, qty: item.qty + 1} : item)
        // console.log(cartItems.products)
    } else {
        cartItems.products.push(data);
    }

    cartItems.totalPrice = Math.round((cartItems.totalPrice + data.price) * 100) / 100
    cartItems.totalQty += 1;
    cartItems.shippingFee = Math.round((cartItems.shippingFee + (data.price * 0.05)) * 100) / 100
    setLocalStorage(cartItems)
    // console.log("stored")
    // if(cartItems.products.length == 0) {
    //     console.log("Empty cart")
    //     return;
    // }
    displayCartItem();
    openCartModal();
    
}


function handleAddToCart(e){ // pass in id? handle add tocart
    // console.log(e.target)
    var productColor, productSize;
    const targetEl = e.target
    const productID = targetEl.dataset.id;
    // const productData = productsDataMain[productID - 1]
    const productData = productsDataa.filter(data => data.id == productID)[0]
    console.log(productData)
    var filterData;

    // from product card
    if(targetEl.classList.contains("productAddToCart") ) {
        console.log("product card")
        const productEl = targetEl.closest(".product");
        productColor = productEl.querySelector(".color-opt").textContent;
        productSize = productEl.querySelector(".size-opt").textContent;

    } else if(targetEl.classList.contains("modalAddToCart")) {
        console.log("modal cart")
        const colorOptionsEl = document.querySelector(".colorOptions").children;
        const sizeOptionsEl = document.querySelector(".sizeOptions").children;
        productColor = findSelectedOption(colorOptionsEl)
        productSize = findSelectedOption(sizeOptionsEl)
        // console.log(productColor, productSize)
    } else if(targetEl.classList.contains("cartItemAddToCart")) {
        console.log("cart item cart")
        const cartItemEl = targetEl.closest(".cart-item");
        // console.log(cartItemEl)
        productColor = cartItemEl.querySelector(".color-opt").textContent;
        productSize = cartItemEl.querySelector(".size-opt").textContent;
        // console.log(productColor, productSize)
    }

    filterData = {
        id : productData.id,
        title : productData.title,
        image: productData.image,
        price : productData.price,
        color : productColor.toLowerCase(), // change case
        size : productSize.toLowerCase(), // change case
        qty: 1, // change later
    }

    addToCart(filterData)
    // console.log(filterData)

}

function handleRemoveFromCart(e) {
    console.log(e.target + "remove!")
    const cartItemEl = e.target.closest(".cart-item");
    const id = cartItemEl.dataset.id;
    // const target = cartItemEl
    console.log(e.target.tagName)
    const color = cartItemEl.querySelector(".color-opt").textContent;
    const size = cartItemEl.querySelector(".size-opt").textContent;
    removeFromCart({id, color, size}, e.target)
}

function removeFromCart(data, target) {
    const {id, color, size} = data;
    var newPrice, newQty;
    console.log(id, color, size)
    let cartItems = fetchLocalStorage()
    console.log(cartItems.products)
    const sameCartItem =  cartItems.products.find(item => item.id == id && item.color == color && item.size == size)
    console.log(sameCartItem)
    var tagName = target.tagName.toLowerCase()
    if(tagName == "ion-icon" || tagName == "button") {
        console.log("remove")
        cartItems.products = cartItems.products.filter(item => {
            console.log(item, sameCartItem)
            return item != sameCartItem}
        )
        console.log(cartItems.products)
        
        newPrice = sameCartItem.price * sameCartItem.qty
        newQty = sameCartItem.qty;
        console.log(newPrice)
        
        // openCartModal();

    } else if(tagName == "input") {
        console.log("reduce")
        cartItems.products = cartItems.products.map(item => item == sameCartItem ? {...item, qty: item.qty - 1} : item)
        newPrice = sameCartItem.price;
        newQty = 1
        console.log("new ---")
        console.log(cartItems.products)
    }

    cartItems.totalPrice = Math.round((cartItems.totalPrice - newPrice) * 100) / 100
    cartItems.totalQty -= newQty;
    cartItems.shippingFee = Math.round((cartItems.shippingFee - (newPrice * 0.05)) * 100) / 100

    console.log(cartItems)
    setLocalStorage(cartItems)
    displayCartItem();
    console.log("items in cart" + newQty)
    // if click from remove button - remove entire el
    // if click from input, check if qty > 1. if yes reduce qty

}
// handleATC event fn ??
// make rest of th page unresponsive !done
// fix closebtn issue ! done
// set class to product instead of id !done
// active on color/size - radio button fieldset !done
// initally first two are selected !!
// cart local storage !!
// Fetching the data and handling the promise !!
// total price for cart element !!
// round values to 2dp !!
// same product id but different color and size.... !!
// empty cart view !!
// remove cart items !!
// updating quantity !!
// close btn to empty cart view !!
// selected on first color and size in moda !!
// filter buttons !!

// get cart to slide
// if productModal and cartModal are open, close productModal when cartModal is closed
// stop user from manually entering in input number