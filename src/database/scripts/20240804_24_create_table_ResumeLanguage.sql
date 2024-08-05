CREATE TABLE ResumeLanguage (
    resume_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id),
    FOREIGN KEY (language_id) REFERENCES Language(id),
    PRIMARY KEY (resume_id, language_id)
);