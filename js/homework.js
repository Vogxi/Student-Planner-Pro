// ==========================================
// Homework Module
// ==========================================

function initializeHomework() {

    document
        .getElementById("addHomeworkBtn")
        .addEventListener("click", addHomework);

    updateSubjectDropdown();

    renderHomework();

    updateHomeworkProgress();

}

function updateSubjectDropdown() {

    const select = document.getElementById("hwSubject");

    if (!select) return;

    select.innerHTML =
        `<option value="">Select Subject</option>`;

    const timetable = loadTimetable();

    const added = new Set();

    Object.values(timetable).forEach(day => {

        day.forEach(subject => {

            if (!added.has(subject.subject)) {

                added.add(subject.subject);

                select.innerHTML += `
                    <option>
                        ${subject.subject}
                    </option>
                `;

            }

        });

    });

}

function addHomework() {

    const day =
        document.getElementById("hwDay").value;

    const subject =
        document.getElementById("hwSubject").value;

    const title =
        document.getElementById("hwTitle").value.trim();

    const due =
        document.getElementById("hwDue").value;

    const priority =
        document.getElementById("hwPriority").value;

    if (!day || !subject || !title) {

        showToast("⚠ Please complete all required fields.", "#f59e0b");

        return;

    }

    const homework = loadHomework();

    homework.push({

        day,
        subject,
        title,
        due,
        priority,
        completed: false

    });

    saveHomework(homework);

    document.getElementById("hwTitle").value = "";
    document.getElementById("hwDue").value = "";

    renderHomework();

    updateHomeworkProgress();

    updateDashboard();

    updateStatistics();

    showToast("✅ Homework added!");

}

function renderHomework() {

    const tbody = document.getElementById("homeworkBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const homework = loadHomework();

    homework.forEach((hw, index) => {

        tbody.innerHTML += `

<tr>

<td>${hw.subject}</td>

<td>${hw.title}</td>

<td>${hw.due}</td>

<td>${hw.priority}</td>

<td>

<input
type="checkbox"
${hw.completed ? "checked" : ""}
onchange="toggleHomework(${index})">

</td>

<td>

<button onclick="editHomework(${index})">
✏️
</button>

<button onclick="deleteHomework(${index})">
🗑️
</button>

</td>

</tr>

`;

    });

}

function toggleHomework(index) {

    const homework = loadHomework();

    homework[index].completed = !homework[index].completed;

    saveHomework(homework);

    renderHomework();

    updateHomeworkProgress();

    updateDashboard();

    updateStatistics();

    showToast(
        homework[index].completed
            ? "✅ Homework completed!"
            : "↩ Homework marked incomplete!",
        "#10b981"
    );

}

function deleteHomework(index) {

    if (!confirm("Delete homework?")) return;

    const homework = loadHomework();

    homework.splice(index, 1);

    saveHomework(homework);

    renderHomework();

    updateHomeworkProgress();

    updateDashboard();

    updateStatistics();

    showToast("🗑 Homework deleted.", "#ef4444");

}
function editHomework(index) {

    const homework = loadHomework();

    const hw = homework[index];

    document.getElementById("hwDay").value = hw.day;
    document.getElementById("hwSubject").value = hw.subject;
    document.getElementById("hwTitle").value = hw.title;
    document.getElementById("hwDue").value = hw.due;
    document.getElementById("hwPriority").value = hw.priority;

    homework.splice(index, 1);

    saveHomework(homework);

    renderHomework();

    updateHomeworkProgress();

    updateDashboard();

    updateStatistics();

    showToast("✏️ Editing homework...", "#3b82f6");

}
function updateHomeworkProgress() {

    const homework = loadHomework();

    const completed = homework.filter(hw => hw.completed).length;
    const total = homework.length;

    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const fill = document.getElementById("progressFill");
    const text = document.getElementById("progressText");

    if (fill) fill.style.width = percent + "%";

    if (text) text.textContent = `${completed}/${total} Completed (${percent}%)`;

}