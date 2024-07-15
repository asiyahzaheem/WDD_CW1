document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.querySelector('.image-preview-container');
    const previewBoxes = previewContainer.querySelectorAll('.preview');
    const productImages = document.querySelectorAll('.photo');

    productImages.forEach(photo => {
        photo.addEventListener('click', () => {
            const name = photo.getAttribute('data-name');
            previewContainer.style.display = 'flex';
            previewBoxes.forEach(preview => {
                if (preview.getAttribute('data-target') === name) {
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        });
    });

    previewBoxes.forEach(preview => {
        const closeBtn = preview.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            preview.classList.remove('active');
            previewContainer.style.display = 'none';
        });
    });
});
