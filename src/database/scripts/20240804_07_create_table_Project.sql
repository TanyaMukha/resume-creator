CREATE TABLE Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    description TEXT NOT NULL,
    start TEXT NOT NULL,
    finish TEXT,
    unvisible BOOLEAN
);