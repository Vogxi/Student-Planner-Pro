// ==========================================
// Student Planner Pro V3
// Storage Module
// ==========================================

const STORAGE_KEYS = {

    timetable: "planner_timetable",

    homework: "planner_homework",

    exams: "planner_exams",

    settings: "planner_settings"

};

// ==========================================
// Default Data
// ==========================================

const defaultTimetable = {

    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []

};

const defaultHomework = [];

const defaultExams = [];

const defaultSettings = {

    darkMode: false

};

// ==========================================
// Generic Storage Functions
// ==========================================

function save(key, data) {

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

function load(key, defaultValue) {

    const data = localStorage.getItem(key);

    if (!data) {

        return structuredClone(defaultValue);

    }

    try {

        return JSON.parse(data);

    }

    catch {

        return structuredClone(defaultValue);

    }

}

// ==========================================
// Timetable
// ==========================================

function saveTimetable(data) {

    save(STORAGE_KEYS.timetable, data);

}

function loadTimetable() {

    return load(

        STORAGE_KEYS.timetable,

        defaultTimetable

    );

}

// ==========================================
// Homework
// ==========================================

function saveHomework(data) {

    save(STORAGE_KEYS.homework, data);

}

function loadHomework() {

    return load(

        STORAGE_KEYS.homework,

        defaultHomework

    );

}

// ==========================================
// Exams
// ==========================================

function saveExams(data) {

    save(STORAGE_KEYS.exams, data);

}

function loadExams() {

    return load(

        STORAGE_KEYS.exams,

        defaultExams

    );

}

// ==========================================
// Settings
// ==========================================

function saveSettings(data) {

    save(STORAGE_KEYS.settings, data);

}

function loadSettings() {

    return load(

        STORAGE_KEYS.settings,

        defaultSettings

    );

}