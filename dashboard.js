// ==========================================
// Dashboard Module
// ==========================================

function initializeDashboard() {

    updateDashboard();

}

function updateDashboard() {

    updateCards();

    updateTodaySchedule();

    updateTodayHomework();

}

function updateCards() {

    const timetable = loadTimetable();
    const homework = loadHomework();
    const exams = loadExams();

    const today = getTodayName();

    const todayClasses =
        timetable[today] || [];

    document.getElementById("todayClassesCount").textContent =
        todayClasses.length;

    document.getElementById("homeworkCount").textContent =
        homework.filter(h => !h.completed).length;

    document.getElementById("examCount").textContent =
        exams.length;

    const total = homework.length;

    const completed =
        homework.filter(h => h.completed).length;

    const percent =
        total === 0
            ? 0
            : Math.round(completed / total * 100);

    document.getElementById("completionRate").textContent =
        percent + "%";

}

function updateTodaySchedule() {

    const container =
        document.getElementById("todaySchedule");

    const timetable =
        loadTimetable();

    const today =
        getTodayName();

    const classes =
        timetable[today] || [];

    if (classes.length === 0) {

        container.innerHTML =
            "<p>No classes today.</p>";

        return;

    }

    container.innerHTML = "";

    classes.forEach(subject => {

        container.innerHTML += `

<div class="card" style="margin-bottom:10px;">

<b>${subject.time}</b>

${subject.subject}

</div>

`;

    });

}

function updateTodayHomework() {

    const container =
        document.getElementById("todayHomework");

    const today =
        getTodayName();

    const homework =
        loadHomework().filter(hw =>

            hw.day === today && !hw.completed

        );

    if (homework.length === 0) {

        container.innerHTML =
            "<p>No homework today.</p>";

        return;

    }

    container.innerHTML = "";

    homework.forEach(hw => {

        container.innerHTML += `

<div class="card" style="margin-bottom:10px;">

<b>${hw.subject}</b><br>

${hw.title}

</div>

`;

    });

}

function getTodayName() {

    const days = [

        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"

    ];

    return days[new Date().getDay()];

}
// ==========================================
// Statistics Module
// ==========================================

function updateStatistics() {

    const timetable = loadTimetable();
    const homework = loadHomework();
    const exams = loadExams();

    // Count unique subjects
    const subjects = new Set();

    Object.values(timetable).forEach(day => {

        day.forEach(item => {

            subjects.add(item.subject);

        });

    });

    const totalSubjects = subjects.size;

    const totalHomework = homework.length;

    const completedHomework =
        homework.filter(hw => hw.completed).length;

    const upcomingExams =
        exams.filter(exam =>
            new Date(exam.date) >= new Date()
        ).length;

    document.getElementById("statSubjects").textContent =
        totalSubjects;

    document.getElementById("statHomework").textContent =
        totalHomework;

    document.getElementById("statCompleted").textContent =
        completedHomework;

    document.getElementById("statExams").textContent =
        upcomingExams;

}