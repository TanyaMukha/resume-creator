CREATE TABLE Certificate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    link TEXT NOT NULL,
    unvisible BOOLEAN,
    resume_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id)
);

CREATE TABLE Contact (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    value TEXT NOT NULL,
    "order" INTEGER,
    unvisible BOOLEAN,
    resume_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id)
);

CREATE TABLE Education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university TEXT NOT NULL,
    unvisible BOOLEAN,
    resume_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id)
);

CREATE TABLE Experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    location TEXT,
    type TEXT,
    start TEXT NOT NULL,
    finish TEXT,
    position TEXT NOT NULL,
    description TEXT,
    unvisible BOOLEAN,
    resume_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id)
);

CREATE TABLE Language (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    unvisible BOOLEAN,
    resume_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id)
);

CREATE TABLE Position (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    salary INTEGER NOT NULL,
    summary TEXT NOT NULL,
    expectation TEXT,
    unvisible BOOLEAN,
    resume_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id)
);