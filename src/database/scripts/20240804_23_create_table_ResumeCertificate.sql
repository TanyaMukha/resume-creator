CREATE TABLE ResumeCertificate (
    resume_id INTEGER NOT NULL,
    certificate_id INTEGER NOT NULL,
    FOREIGN KEY (resume_id) REFERENCES Resume(id),
    FOREIGN KEY (certificate_id) REFERENCES Certificate(id),
    PRIMARY KEY (resume_id, certificate_id)
);