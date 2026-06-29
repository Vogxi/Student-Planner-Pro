// ==========================================
// Student Planner Pro V3
// Timetable Module
// ==========================================

let selectedDay = "Sunday";

function initializeTimetable() {

    const addButton = document.getElementById("addSubjectBtn");

    if (addButton) {
        addButton.addEventListener("click", addSubject);
    }

    document.querySelectorAll(".day-btn").forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".day-btn").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedDay = button.textContent.trim();

            renderTimetable();

        });

    });

    renderTimetable();

}

function getTimetable() {

    let timetable = loadTimetable();

    if (!timetable[selectedDay]) {
        timetable[selectedDay] = [];
    }

    return timetable;

}

function addSubject() {

    const time = document.getElementById("subjectTime").value.trim();
    const subject = document.getElementById("subjectName").value.trim();
    const teacher = document.getElementById("teacherName").value.trim();
    const room = document.getElementById("roomNumber").value.trim();

    if (time === "" || subject === "") {

        showToast("Please enter Time and Subject.", "#dc2626");

        return;

    }

    const timetable = getTimetable();

    timetable[selectedDay].push({

        time,
        subject,
        teacher,
        room

    });

    timetable[selectedDay].sort((a, b) =>
        a.time.localeCompare(b.time)
    );

    saveTimetable(timetable);
    updateStatistics();
    document.getElementById("subjectTime").value = "";
    document.getElementById("subjectName").value = "";
    document.getElementById("teacherName").value = "";
    document.getElementById("roomNumber").value = "";

    renderTimetable();
    updateSubjectDropdown();
    updateDashboard();
    showToast("📚 Subject added!");
}

function renderTimetable() {

    const tbody = document.getElementById("scheduleBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const timetable = getTimetable();

    timetable[selectedDay].forEach((item, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${item.time}</td>
            <td>${item.subject}</td>
            <td>${item.teacher}</td>
            <td>${item.room}</td>
            <td>
                <button onclick="editSubject('${selectedDay}', ${index})">✏️</button>
                <button onclick="deleteSubject(${index})">🗑️</button>
            </td>
        </tr>
        `;

    });

}

function deleteSubject(index) {

    if (!confirm("Delete this subject?")) return;

    const timetable = getTimetable();

    timetable[selectedDay].splice(index, 1);

    saveTimetable(timetable);
    updateSubjectDropdown();
    updateDashboard();
    updateStatistics();
    renderTimetable();
    showToast("🗑 Subject deleted.", "#ef4444");

}
function editSubject(day, index) {

    const timetable = loadTimetable();

    const subject = timetable[day][index];

    document.getElementById("daySelect").value = day;

    document.getElementById("subjectName").value = subject.subject;

    document.getElementById("subjectTime").value = subject.time;

    timetable[day].splice(index, 1);

    saveTimetable(timetable);

    renderTimetable();

    updateSubjectDropdown();

    updateDashboard();

    updateStatistics();

    showToast("✏️ Editing subject...", "#3b82f6");

}
