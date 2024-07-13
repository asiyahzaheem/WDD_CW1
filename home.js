// Loop through all elements in .carousel class
document.querySelectorAll(".carousel").forEach((carousel) => {
    
    const images = [// Array of all the images used
      "src/images/homepage/section1.jpg",
      "src/images/homepage/sample2.jpg",
      "src/images/homepage/sample3.jpg"
    ];
    
    // Setting up the initial background
    carousel.style.backgroundImage = `url(${images[0]})`;// 0th element of above array
    carousel.style.backgroundSize = "cover";// Make it so that it covers the whole container
    carousel.style.backgroundPosition = "center";// Center the image

    const buttonsHtml = images.map(() => {// This is used to 'map' over the array and create the below given span element to each element in the images array
      return `<span class="carousel_button"></span>`;
    });
  
    carousel.insertAdjacentHTML(// This is used to add HTML elements to another specified HTML element
      "beforeend",// Used to specify where the element is added
      `<div class="carousel_nav">${buttonsHtml.join("")}</div>`// The element that is added: adds a div with class 'carousel_nav' with all the buttons created using span tags earlier
    );
  
    const buttons = carousel.querySelectorAll(".carousel_button");// Select all buttons and add to array

    // Loop through all buttons and add an event listener to each button
    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {// event = "click" | function = Does not have a function this uses a "anonymous" function | ?tried to use a separate function but did not work
        displayItem(i); // calls displayItem function
        index = i;// Assigns current index to i
      });
    });

    buttons[0].classList.add("carousel_button_selected"); // used to highlight the first button
  
    let index = 0;// used to kee track of currently displayed image

    function displayItem(index) {// function used to update the background image and button
      carousel.style.backgroundImage = `url(${images[index]})`;// Change style.backgroundImage to the new image
      buttons.forEach(button => button.classList.remove("carousel_button_selected"));// Loop through the buttons and clear the selected button css class from all buttons
      buttons[index].classList.add("carousel_button_selected");// Add "carousel_button_selected" to the button
    }
  
    // This function is used to increment the current index
    setInterval(() => {
      index = (index + 1) % images.length;// This modulo operator is used to stay within the limit of the array
      displayItem(index);// calls displayItem and sends the current index as a parameter
    }, 6000);// sets delay to 6s
});
