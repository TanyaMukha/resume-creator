CREATE TABLE ResumeContact (
    resume_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id),
    FOREIGN KEY (contact_id) REFERENCES Contact(id),
    PRIMARY KEY (resume_id, contact_id)
);