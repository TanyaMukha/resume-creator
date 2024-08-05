CREATE TABLE Contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    value TEXT NOT NULL,
    "order" INTEGER,
    unvisible BOOLEAN
);