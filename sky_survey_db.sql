-- Recreate tables (optional, if needed)

-- Drop tables if they exist
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
    description TEXT
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    required BOOLEAN NOT NULL,
    text TEXT NOT NULL,
    description TEXT
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    value VARCHAR(255) NOT NULL,
    multiple BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    response_text TEXT,
    date_responded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    response_id INTEGER REFERENCES responses(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_format VARCHAR(10) NOT NULL,
    max_file_size_mb DOUBLE PRECISION NOT NULL,
    multiple BOOLEAN NOT NULL
);


-- Sample Data Insertion for Testing
INSERT INTO questions (name, type, required, text, description) VALUES
('full_name', 'short_text', TRUE, 'What is your full name?', '[Surname] [First Name] [Other Name]'),
('email_address', 'email', TRUE, 'What is your email address?', ''),
('description', 'long_text', TRUE, 'Tell us a bit more about yourself', ''),
('gender', 'choice', TRUE, 'What is your gender?', ''),
('programming_stack', 'choice', TRUE, 'What programming stack are you familiar with?', 'You can select multiple'),
('certificates', 'file', TRUE, 'Upload any of your certificates?', 'You can upload (.pdf)');

INSERT INTO options (question_id, value, multiple) VALUES
(4, 'MALE', FALSE),
(4, 'FEMALE', FALSE),
(4, 'OTHER', FALSE),
(5, 'Frontend', TRUE),
(5, 'Backend', TRUE),
(5, 'Fullstack', TRUE);

-- Clear existing options for programming_stack
DELETE FROM options WHERE question_id = 5;

-- Insert correct options for programming_stack
INSERT INTO options (question_id, value, multiple) VALUES
(5, 'REACT', TRUE),
(5, 'ANGULAR', TRUE),
(5, 'VUE', TRUE),
(5, 'SQL', TRUE),
(5, 'POSTGRES', TRUE),
(5, 'MYSQL', TRUE),
(5, 'MSSQL', TRUE),
(5, 'Java', TRUE),
(5, 'PHP', TRUE),
(5, 'GO', TRUE),
(5, 'RUST', TRUE);

