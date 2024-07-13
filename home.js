  // Loop through each carousel item
  document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel_item");
    // Loop through each button
  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel_button"></span>`;
  });

  //Generate HTML
  carousel.insertAdjacentHTML(
    "beforeend",
    `
        <div class="carousel_nav">
            ${buttonsHtml.join("")}
        </div>
        `
  );

  const buttons = carousel.querySelectorAll(".carousel_button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
        // unselect all the items
        items.forEach(item => item.classList.remove("carousel_item_selected"));
        buttons.forEach(button => button.classList.remove("carousel_button_selected"));

        items[i].classList.add("carousel_item_selected");
        button.classList.add("carousel_button_selected");
    })
  });
  items[0].classList.add("carousel_item_selected");
  buttons[0].classList.add("carousel_button_selected");
});
