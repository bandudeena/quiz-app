-- Quiz Table
CREATE TABLE quiz (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_by VARCHAR(36),
    created_at DATETIME,
    FOREIGN KEY (created_by) REFERENCES user(id)
);

-- Question Table
CREATE TABLE question (
    id VARCHAR(36) PRIMARY KEY,
    description TEXT,
    mandatory BOOLEAN,
    quiz_id VARCHAR(36),
    created_at DATETIME,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

-- Choice Table
CREATE TABLE choice (
    id VARCHAR(36) PRIMARY KEY,
    description VARCHAR(255),
    right_answer BOOLEAN,
    question_id VARCHAR(36),
    created_at DATETIME,
    FOREIGN KEY (question_id) REFERENCES question(id)
);

-- User Table
CREATE TABLE user (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at DATETIME
);
