DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token; 
DROP TABLE IF EXISTS user_account;

-- If there are leftover tables, kill them so I can create new ones. 
-- POST and TOKEN don't depend on anything, so you have to delete them BEFORE you delete user_account, as it has dependencies. 



-- SQL doesn't like tables called "user" so we've named it "user_account"
-- user_password will be created via bcrypt and should always be 60 characters in length 
-- if there was a different number in this field, then SQL would add extra whitespace to fill the space 
-- then bcrypt would always fail as it would be comparing the 60 character has plus any extra characters created
CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id) 

);

-- recipient can be null - so that users can send messages to anyone
-- They have to be valid people on the services
-- password is always the same length as it's hash
-- linked to table called post

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    sender_id INT NOT NULL,
    recipient_id INT,
    PRIMARY KEY (post_id),
    FOREIGN KEY (sender_id) REFERENCES user_account("user_id"),
    FOREIGN KEY (recipient_id) REFERENCES user_account("user_id")
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL, 
    token CHAR(36) NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

