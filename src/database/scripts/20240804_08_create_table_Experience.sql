CREATE TABLE Experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    location TEXT,
    type TEXT,
    start TEXT NOT NULL,
    finish TEXT,
    position TEXT NOT NULL,
    description TEXT,
    unvisible BOOLEAN
);