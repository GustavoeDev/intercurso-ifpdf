const minMaxButtons = document.querySelectorAll(".min-max-button");

minMaxButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tableContainerClicked = btn.closest(".table-container");
    const tableContainers = document.querySelectorAll(".table-container");

    tableContainers.forEach((table) => {
      const tableButton = table.querySelector(".min-max-button");

      if (table === tableContainerClicked) {
        table.classList.toggle("not-active");
        tableButton.classList.toggle(
          "min",
          !table.classList.contains("not-active")
        );
      } else {
        table.classList.add("not-active");
        tableButton.classList.remove("min");
      }
    });
  });
});
