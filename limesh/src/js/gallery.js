// Declare constants
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
  const description = preview.querySelector(".description"); // Get the description element
  if (description) {
    description.insertAdjacentHTML("beforeend", generateCustomizationHTML());  // Insert the customization HTML

    // Add event listeners for customization changes
    const colorSelect = description.querySelector("#color");
    const fontSelect = description.querySelector("#font");

    colorSelect.addEventListener("change", (e) => {
      preview.style.backgroundColor = e.target.value; // Set the background color of the preview
    });

    fontSelect.addEventListener("change", (e) => {
      description.style.fontFamily = e.target.value; // Set the font family of the description
    });
  }
});

productImages.forEach((photo) => {
  photo.addEventListener("click", () => {
    const name = photo.getAttribute("data-name");
    previewContainer.style.display = "flex"; // Show the preview container
    previewBoxes.forEach((preview) => {
      if (preview.getAttribute("data-target") === name) {
        preview.classList.add("active"); // Add the active class to the preview
      } else {
        preview.classList.remove("active"); // Remove the active class from other previews
      }
    });
  });
});

previewBoxes.forEach((preview) => {
  const closeBtn = preview.querySelector(".close-btn"); // Get the close button element
  closeBtn.addEventListener("click", () => {
    preview.classList.remove("active"); // Remove the active class from the preview
    previewContainer.style.display = "none"; // Hide the preview container
  });
});