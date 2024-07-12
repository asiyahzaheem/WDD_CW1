function swapImage(element) {
    const imagePath = element.src;
    const images = document.querySelectorAll('.photo img');
    images.forEach(img => {
        if (img !== element) {
            img.src = imagePath;
        }
    });
}