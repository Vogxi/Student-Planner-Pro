// ==========================================
// Settings Module
// ==========================================

function initializeSettings() {

    const themeBtn = document.getElementById("themeToggleBtn");
    const exportBtn = document.getElementById("exportData");
    const importBtn = document.getElementById("importData");
    const clearBtn = document.getElementById("clearData");

    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
    if (exportBtn) exportBtn.addEventListener("click", exportPlannerData);
    if (importBtn) importBtn.addEventListener("click", importPlannerData);
    if (clearBtn) clearBtn.addEventListener("click", clearPlannerData);

    loadTheme();

}

function toggleTheme() {

    document.body.classList.toggle("dark");

    const settings = loadSettings();

    settings.darkMode = document.body.classList.contains("dark");

    saveSettings(settings);

}

function loadTheme() {

    const settings = loadSettings();

    if (settings.darkMode) {

        document.body.classList.add("dark");

    }

}

function exportPlannerData() {

    const data = {

        timetable: loadTimetable(),
        homework: loadHomework(),
        exams: loadExams(),
        settings: loadSettings()

    };

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "StudentPlannerBackup.json";

    a.click();

    URL.revokeObjectURL(url);

}

function importPlannerData() {

    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".json";

    input.onchange = function () {

        const file = input.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            try {

                const data = JSON.parse(e.target.result);

                if (data.timetable) saveTimetable(data.timetable);
                if (data.homework) saveHomework(data.homework);
                if (data.exams) saveExams(data.exams);
                if (data.settings) saveSettings(data.settings);

                location.reload();

            } catch {

                showToast("Invalid backup file.", "#dc2626");

            }

        };

        reader.readAsText(file);

    };

    input.click();

}

function clearPlannerData() {

    if (!confirm("Delete ALL planner data?")) return;

    localStorage.clear();

    location.reload();

}