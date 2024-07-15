document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel_item");
  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel_button"></span>`;
  });

  carousel.insertAdjacentHTML(
    "beforeend",
    `<div class="carousel_nav">${buttonsHtml.join("")}</div>`
  );

  const buttons = carousel.querySelectorAll(".carousel_button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      showItem(i);
      currentIndex = i; // Update currentIndex on manual selection
    });
  });

  items[0].classList.add("carousel_item_selected");
  buttons[0].classList.add("carousel_button_selected");

  // Auto-cycle
  let currentIndex = 0;

  function showItem(index) {
    items.forEach(item => item.classList.remove("carousel_item_selected"));
    buttons.forEach(button => button.classList.remove("carousel_button_selected"));

    items[index].classList.add("carousel_item_selected");
    buttons[index].classList.add("carousel_button_selected");
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  }, 6000); // Change every 10 seconds
});
