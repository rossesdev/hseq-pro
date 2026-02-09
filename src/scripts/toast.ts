const TOAST_DURATION = 4000;

type ToastVariant = "success" | "error" | "info";

const variantStyles: Record<ToastVariant, string> = {
  success: "background: #16a34a; color: #fff;",
  error: "background: #dc2626; color: #fff;",
  info: "background: #1a1a2e; color: #fff;",
};

function getOrCreateContainer(): HTMLElement {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message: string, variant: ToastVariant = "info") {
  const container = getOrCreateContainer();

  const toast = document.createElement("div");
  toast.style.cssText = `
    ${variantStyles[variant]}
    padding: 14px 24px;
    border-radius: 12px;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    pointer-events: auto;
    transform: translateX(120%);
    transition: transform 0.3s ease, opacity 0.3s ease;
    opacity: 0;
    max-width: 380px;
    line-height: 1.4;
  `;
  toast.textContent = message;
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = "translateX(0)";
    toast.style.opacity = "1";
  });

  // Animate out and remove
  setTimeout(() => {
    toast.style.transform = "translateX(120%)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, TOAST_DURATION);
}
