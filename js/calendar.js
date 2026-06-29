// ==========================================
// Calendar Module
// ==========================================

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function initializeCalendar() {

    document
        .getElementById("prevMonth")
        .addEventListener("click", previousMonth);

    document
        .getElementById("nextMonth")
        .addEventListener("click", nextMonth);

    renderCalendar();

}

function previousMonth() {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;
        currentYear--;

    }

    renderCalendar();

}

function nextMonth() {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;
        currentYear++;

    }

    renderCalendar();

}

function renderCalendar() {

    const grid = document.getElementById("calendarGrid");
    const title = document.getElementById("calendarMonth");

    if (!grid || !title) return;

    grid.innerHTML = "";

    const monthNames = [

        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"

    ];

    title.textContent =
        monthNames[currentMonth] + " " + currentYear;

    const firstDay =
        new Date(currentYear, currentMonth, 1).getDay();

    const daysInMonth =
        new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty boxes

    for (let i = 0; i < firstDay; i++) {

        const empty = document.createElement("div");

        empty.className = "empty-day";

        grid.appendChild(empty);

    }

    // Days

    for (let day = 1; day <= daysInMonth; day++) {

        const cell = document.createElement("div");

        cell.className = "calendar-day";

        cell.textContent = day;

        const today = new Date();

        if (

            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()

        ) {

            cell.classList.add("today");

        }

        cell.addEventListener("click", () => {

            showDayEvents(day);

        });

        grid.appendChild(cell);

    }

}

function showDayEvents(day) {

    const container =
        document.getElementById("selectedDayEvents");

    container.innerHTML = "";

    const dateString =
        formatDate(currentYear, currentMonth, day);

    const homework =
        loadHomework().filter(hw => hw.due === dateString);

    const exams =
        loadExams().filter(exam => exam.date === dateString);

    if (homework.length === 0 && exams.length === 0) {

        container.innerHTML =
            "<p>No events on this day.</p>";

        return;

    }

    homework.forEach(hw => {

        container.innerHTML += `
        <div class="card">
            📝 <b>${hw.subject}</b><br>
            ${hw.title}
        </div>
        `;

    });

    exams.forEach(exam => {

        container.innerHTML += `
        <div class="card">
            🧪 <b>${exam.subject}</b><br>
            Exam (${exam.priority})
        </div>
        `;

    });

}

function formatDate(year, month, day) {

    month++;

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

}