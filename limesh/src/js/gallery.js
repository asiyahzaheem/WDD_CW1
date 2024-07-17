const previewContainer = document.querySelector(".image-preview-container");
const previewBoxes = previewContainer.querySelectorAll(".preview");
const productImages = document.querySelectorAll(".photo");

// Function to generate customization HTML
const generateCustomizationHTML = () => {
  return `
            <div class="customization">
                <label for="color">Select Color:</label>
                <select name="color" id="color">
                    <option value="white" selected>White</option>
                    <option value="aqua">Aqua</option>
                    <option value="yellow">Yellow</option>
                    <option value="chartreuse">Green</option>
                </select><br><br>
                <label for="font">Select Font:</label>
                <select name="font" id="font">
                    <option value="Nunito" selected>Nunito</option>
                    <option value="Arial">Arial</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </div>
        `;
};

// Append customization HTML to each preview
previewBoxes.forEach((preview) => {
  const description = preview.querySelector(".description");
  if (description) {
    description.insertAdjacentHTML("beforeend", generateCustomizationHTML());

    // Add event listeners for customization changes
    const colorSelect = description.querySelector("#color");
    const fontSelect = description.querySelector("#font");

    colorSelect.addEventListener("change", (e) => {
      preview.style.backgroundColor = e.target.value;
    });

    fontSelect.addEventListener("change", (e) => {
      description.style.fontFamily = e.target.value;
    });
  }
});

productImages.forEach((photo) => {
  photo.addEventListener("click", () => {
    const name = photo.getAttribute("data-name");
    previewContainer.style.display = "flex";
    previewBoxes.forEach((preview) => {
      if (preview.getAttribute("data-target") === name) {
        preview.classList.add("active");
      } else {
        preview.classList.remove("active");
      }
    });
  });
});

previewBoxes.forEach((preview) => {
  const closeBtn = preview.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    preview.classList.remove("active");
    previewContainer.style.display = "none";
  });
});