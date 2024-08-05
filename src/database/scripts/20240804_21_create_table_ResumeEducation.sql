CREATE TABLE ResumeEducation (
    resume_id INTEGER NOT NULL,
    education_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id),
    FOREIGN KEY (education_id) REFERENCES Education(id),
    PRIMARY KEY (resume_id, education_id)
);