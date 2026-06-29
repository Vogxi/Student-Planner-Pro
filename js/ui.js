// ==========================================
// UI Utilities
// ==========================================

function showToast(message, color = "#4f46e5") {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.style.background = color;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}