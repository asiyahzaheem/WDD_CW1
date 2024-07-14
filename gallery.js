document.addEventListener('DOMContentLoaded', () => {
    const slideContainer = document.querySelector('.slide');
    const items = Array.from(document.querySelectorAll('.item'));
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    function updateItems() {
        const items = Array.from(slideContainer.children);
        items.forEach((item, index) => {
            item.style.left = `calc(50% + ${index * 220}px)`;
            item.style.opacity = index < 6 ? '1' : '0';
            item.querySelector('.content').style.display = index === 1 ? 'block' : 'none';
        });
    }

    function swapImages(target) {
        slideContainer.appendChild(target);
        updateItems();
    }

    // Event listener for each item
    items.forEach(item => {
        item.addEventListener('click', () => {
            swapImages(item);
        });
    });

    // Event listener for next button
    nextButton.addEventListener('click', () => {
        const firstItem = slideContainer.firstElementChild;
        swapImages(firstItem);
    });

    // Event listener for prev button
    prevButton.addEventListener('click', () => {
        const lastItem = slideContainer.lastElementChild;
        slideContainer.insertBefore(lastItem, slideContainer.firstElementChild);
        updateItems();
    });

    updateItems();
});
