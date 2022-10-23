DROP TABLE IF EXISTS post;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    PRIMARY KEY (post_id)
);