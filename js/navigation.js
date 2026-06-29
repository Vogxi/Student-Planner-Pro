// ==========================================
// Student Planner Pro V3
// Navigation
// ==========================================

function initializeNavigation() {

    const navButtons = document.querySelectorAll(".nav-btn");
    const pages = document.querySelectorAll(".page");
    const pageTitle = document.getElementById("pageTitle");

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            navButtons.forEach(btn => btn.classList.remove("active"));
            pages.forEach(page => page.classList.remove("active-page"));

            button.classList.add("active");

            const pageId = button.dataset.page;
            const page = document.getElementById(pageId);

            if (page) {
                page.classList.add("active-page");
            }

            if (pageTitle) {
                pageTitle.textContent = button.textContent.trim();
            }

        });

    });

}