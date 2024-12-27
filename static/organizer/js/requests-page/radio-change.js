const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  const radios = form.querySelectorAll('input[type="radio"][name="decision"]');
  const textarea = form.querySelector('textarea[name="reason"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      if (event.target.value === "deny") {
        textarea.required = true;
      } else {
        textarea.required = false;
      }
    });
  });
});
