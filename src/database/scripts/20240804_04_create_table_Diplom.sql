CREATE TABLE Diplom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    education_id INTEGER NOT NULL,
    start TEXT NOT NULL,
    finish TEXT NOT NULL,
    degree TEXT NOT NULL,
    specialization TEXT NOT NULL,
    unvisible BOOLEAN,
    FOREIGN KEY (education_id) REFERENCES Education(id)
);