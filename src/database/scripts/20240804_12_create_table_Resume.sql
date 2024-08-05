CREATE TABLE Resume (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age INTEGER,
    expectation TEXT,
    unvisible BOOLEAN
);