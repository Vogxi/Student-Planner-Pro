// ==========================================
// Exam Module
// ==========================================

function initializeExams() {

    document
        .getElementById("addExamBtn")
        .addEventListener("click", addExam);

    renderExams();

}

function addExam() {

    const subject =
        document.getElementById("examSubject").value.trim();

    const date =
        document.getElementById("examDate").value;

    const location =
        document.getElementById("examLocation").value.trim();

    const priority =
        document.getElementById("examPriority").value;

    if (subject === "" || date === "") {

        showToast("Please enter Subject and Date.", "#dc2626");

        return;

    }

    const exams = loadExams();

    exams.push({

        subject,
        date,
        location,
        priority

    });

    exams.sort((a, b) => new Date(a.date) - new Date(b.date));

    saveExams(exams);
    updateStatistics();
    document.getElementById("examSubject").value = "";
    document.getElementById("examDate").value = "";
    document.getElementById("examLocation").value = "";

    renderExams();
    updateStatistics();
    updateDashboard();
    showToast("🧪 Exam added!");

}

function renderExams() {

    const tbody = document.getElementById("examBody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const exams = loadExams();

    exams.forEach((exam, index) => {

        const daysLeft = calculateDaysLeft(exam.date);

        tbody.innerHTML += `
        <tr>
            <td>${exam.subject}</td>
            <td>${exam.date}</td>
            <td>${daysLeft}</td>
            <td>${exam.location}</td>
            <td>${exam.priority}</td>
            <td>

    <button onclick="editExam(${index})">
        ✏️
    </button>

    <button onclick="deleteExam(${index})">
        🗑️
    </button>

</td>
        </tr>
        `;

    });

}

function deleteExam(index) {

    if (!confirm("Delete this exam?")) return;

    const exams = loadExams();

    exams.splice(index, 1);

    saveExams(exams);
    updateStatistics();
    renderExams();
    updateDashboard();
    showToast("🗑 Exam deleted.", "#ef4444");

}

function calculateDaysLeft(dateString) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const examDate = new Date(dateString);

    examDate.setHours(0, 0, 0, 0);

    const diff = examDate - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));

}
function editExam(index) {

    const exams = loadExams();

    const exam = exams[index];

    document.getElementById("examSubject").value = exam.subject;

    document.getElementById("examDate").value = exam.date;

    document.getElementById("examLocation").value = exam.location;

    document.getElementById("examPriority").value = exam.priority;

    exams.splice(index, 1);

    saveExams(exams);

    renderExams();

    updateDashboard();

    updateStatistics();

    showToast("✏️ Editing exam...", "#3b82f6");

}