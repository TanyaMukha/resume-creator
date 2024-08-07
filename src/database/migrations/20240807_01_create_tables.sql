CREATE TABLE Resume (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age INTEGER,
    expectation TEXT
);

CREATE TABLE Role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    unvisible BOOLEAN
);

CREATE TABLE Skill (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    "order" INTEGER,
    unvisible BOOLEAN
);
