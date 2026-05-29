const form = document.querySelector("#waitlist-form");
const statusMessage = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  const data = Object.fromEntries(new FormData(form).entries());
  const entries = JSON.parse(localStorage.getItem("ghostlineWaitlist") || "[]");

  if (statusMessage) {
    statusMessage.textContent = "Wysyłanie zgłoszenia...";
    statusMessage.classList.remove("success", "error");
  }

  if (submitButton) {
    submitButton.disabled = true;
  }

  fetch(form.action, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new FormData(form),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      entries.push({
        ...data,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("ghostlineWaitlist", JSON.stringify(entries));
      form.reset();

      if (statusMessage) {
        statusMessage.textContent = "Dzięki. Zgłoszenie zostało wysłane na kontakt@ghostline.pl.";
        statusMessage.classList.add("success");
      }
    })
    .catch(() => {
      if (statusMessage) {
        statusMessage.textContent = "Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.";
        statusMessage.classList.add("error");
      }
    })
    .finally(() => {
      if (submitButton) {
        submitButton.disabled = false;
      }
    });
});
