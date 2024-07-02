const productEl = document.getElementById('product')
const productsEl = document.getElementById('products')
const mainEl = document.getElementsByTagName('main')[0];
const productModalEl = document.getElementById('product-modal')

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
}

// Fetching the data and handling the promise
fetchJSONData().then((productsData) => {
    if (productsData) {
        const data = productsData["products"];
        data.forEach(product => {
            const productHTML = `
            <div class="product" id="product">
                    <div class="product-img">
                        <img src="src/images/${product.image}" alt="Product 1"/>
                    </div>
                    <div class="product-content">
                        <div class="main">
                            <span class="product-title">${product.title}</span>
                            <span class="product-price">$ ${product.price}</span>
                        </div>
                        <span class="product-options">UK 6, White</span>
                        <div class="product-btn">
                            <button class="btn" type="button">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `

            productsEl.innerHTML += productHTML;
            
        });
    }
});


productEl.addEventListener("click", function() {
    productModalEl.classList.toggle("show");
    mainEl.classList.toggle("blur");
    
})