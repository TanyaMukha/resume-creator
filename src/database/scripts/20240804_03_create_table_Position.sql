CREATE TABLE Position (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    salary INTEGER NOT NULL,
    summary TEXT NOT NULL,
    expectation TEXT,
    unvisible BOOLEAN
);