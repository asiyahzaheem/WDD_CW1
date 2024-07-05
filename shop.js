const productsEl = document.getElementById('products')
const mainEl = document.getElementsByTagName('main')[0];
const modalEl = document.getElementById('product-modal')
const productModalEl = document.getElementById('product-modal-content')

async function fetchJSONData() {
    try {
        const res = await fetch("./src/products.json");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
    }
};

displayProducts();

async function displayProducts() {
    var fetchedData =  await fetchJSONData()
    var productsData = fetchedData["products"];
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
                            <button class="btn addToCartBtn" type="button">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `
            productsEl.innerHTML += productHTML;
        });

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
                    <input type="number" value="1" min="1" max="10"/>
                </div>
                <div class="product-btn">
                    <button class="btn addToCartBtn" type="button" data-id="${productData.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    productModalEl.innerHTML += modalHTML;


    var closeBtn = document.getElementById('close-btn');
    console.log(closeBtn)
    console.log("closeee")

    closeBtn.addEventListener("click", closeModal);
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
}

// make rest of th page unresponsive !done
// fix closebtn issue ! done
// set class to product instead of id !done
// active on color/size
// Fetching the data and handling the promise

// fetchJSONData().then((productsData) => {
//     if (productsData) {
//         const data = productsData["products"];
//         data.forEach(product => {
//             const productHTML = `
//             <div class="product" id="${product.id}">
//                     <div class="product-img">
//                         <img src="src/images/${product.image}" alt="Product 1"/>
//                     </div>
//                     <div class="product-content">
//                         <div class="main">
//                              <span class="product-title">${product.title}</span>
//                              <span class="product-price">$ ${product.price}</span>
//                          </div>
//                          <span class="product-options">${product.options.sizes[0]}, ${product.options.colors[0]}</span>
//                          <div class="product-btn">
//                             <button class="btn addToCartBtn" type="button" data-id="${product.id}">Add to Cart</button>
//                         </div>
//                     </div>
//                 </div>
//             `
//             productsEl.innerHTML += productHTML;
//         })

//         const productElList = document.getElementsByClassName('product-img');
//         const addToCartBtns = document.getElementsByClassName("addToCartBtn");
//         console.log(addToCartBtns)
//         for(var i=0; i < productElList.length; i++) {
//             productElList[i].addEventListener('click', openModal)
//         }

//         for(var i=0; i < addToCartBtns.length; i++) {
//             addToCartBtns[i].addEventListener('click', addToCart)
//         }

//         function addToCart(e) {
//             console.log(e.target.dataset.id)
//         }
        
//         var productModalEl= document.getElementById("product-modal")

//         function openModal(e) {
//             console.log("click")
//             var productID = e.target.closest('.product').id
//             // console.log(productID);
//             var productData = data[productID - 1]
//             productModalEl.classList.add("show");
//             mainEl.classList.add("blur");
//             // var modalHTML = '';
//             var modalHTML = `
//                 <div class="modal-image">
//                     <img src="src/images/${productData.image}" alt="Product ${productData.id}"/>
//                 </div>
//                 <div class="modal-content">
//                     <div class="main-content">
//                         <p class="product-title">${productData.title}</p>
//                         <p class="product-desc">${productData.description}</p>
//                         <p class="product-price">$ ${productData.price}</p>
//                         <hr>

//                         <div class="product-color">
//                             <span>Choose a Color </span>
//                             <div class="options">
//                             ${productData.options.colors.map(color => (
//                                 `<button id="${color.toLowerCase()}"></button>`
//                             )).join('')}
//                             </div>
//                         </div>

//                         <hr>

//                         <div class="product-size">
//                             <span>Choose a Size </span>
//                             <div class="options">
//                             ${productData.options.sizes.map(size => (
//                                 `<button id="${size.toLowerCase()}">${size}</button>`
//                             )).join('')}
//                             </div>
//                         </div>

//                         <hr>

//                         <div class="product-qty">
//                             <span>Quantity</span>
//                             <input type="number" value="1" min="1" max="10"/>
//                         </div>
//                         <div class="product-btn">
//                             <button class="btn addToCartBtn" type="button" data-id="${productData.id}">Add to Cart</button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             productModalEl.innerHTML += modalHTML;
//         }

//         var closeBtn = document.getElementById('close-btn');
//         console.log(closeBtn)
//         console.log("closeee")

//         console.log("add")
//         closeBtn.addEventListener("click", closeModal);
//         console.log("add")
//         function closeModal() {
//             console.log("close")
//             productModalEl.style.display = "none";
//             productModalEl.classList.remove("show");
//             mainEl.classList.remove("blur");
//         }


        

        
//     }
// });


// event handler for addToCart event
// addToCart function
// event handler for delete event
// delete function
