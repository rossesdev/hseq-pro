import { showToast } from "./toast";

export function initContactForm() {
  const form = document.getElementById(
    "contact-form",
  ) as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      showToast("Por favor complete todos los campos.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Por favor ingrese un email válido.", "error");
      return;
    }

    const submitBtn = form.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(
          "¡Gracias por contactarnos! Le responderemos en menos de 24 horas.",
          "success",
        );
        form.reset();
      } else {
        showToast(
          data.error ||
            "Hubo un error al enviar el mensaje. Por favor intente de nuevo.",
          "error",
        );
      }
    } catch {
      showToast(
        "Error de conexión. Por favor verifique su internet e intente de nuevo.",
        "error",
      );
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
