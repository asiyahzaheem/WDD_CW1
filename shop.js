const productEl = document.getElementById('product')
const productModalEl = document.getElementById('product-modal')

productEl.addEventListener("click", function() {
    productModalEl.classList.toggle("show");
})