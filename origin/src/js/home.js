// Loop through each element in the div that contains "carousel" class
document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel_item");// Select all items with the class "carousel_item" within the current carousel
  const buttonsHtml = Array.from(items, () => {// Creates a button for each item in the chosen carousel
    return `<span class="carousel_button"></span>`;
  });

  carousel.insertAdjacentHTML(// USed to place the button HTML String before the carousel div ends
    "beforeend",
    `<div class="carousel_nav">${buttonsHtml.join("")}</div>`
  );

  const buttons = carousel.querySelectorAll(".carousel_button");// Selects all the buttons

  // Loops through all buttons
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {// Adds an eventListener to all buttons, in this case when its clicked
      showItem(i);// The respective mapped item is shown when button is clicked
      currentIndex = i; // Update currentIndex on manual selection
    });
  });

  // Used to show the first item and select the first button when loading the webpage
  items[0].classList.add("carousel_item_selected");// ClassList helps to add and remove classes to and from tags
  buttons[0].classList.add("carousel_button_selected");

  // Auto-cycle
  let currentIndex = 0;// Beginning current index set to 0

  function showItem(index) {
    // Remove all selected classes from al items
    items.forEach(item => item.classList.remove("carousel_item_selected"));
    buttons.forEach(button => button.classList.remove("carousel_button_selected"));

    // Add back those specific classes to its relative button and div
    items[index].classList.add("carousel_item_selected");
    buttons[index].classList.add("carousel_button_selected");
  }

  setInterval(() => {// this is used to time the change of each item transition
    currentIndex = (currentIndex + 1) % items.length;// Loops through the number of items, % is used to stop from overshooting limit 
    showItem(currentIndex);// showItem function is called
  }, 6000); // Change every 6 seconds
});
