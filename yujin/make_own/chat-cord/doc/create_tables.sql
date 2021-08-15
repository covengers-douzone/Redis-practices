CREATE TABLE ROOM
(
    `no`         INT                           NOT NULL    AUTO_INCREMENT COMMENT 'no', 
    `title`      VARCHAR(45)                   NOT NULL    COMMENT 'title', 
    `password`   VARCHAR(45)                   NULL        COMMENT 'password', 
    `type`       ENUM("private","public" )    NOT NULL    COMMENT 'type', 
    `createdAt`  DATETIME                      NOT NULL    COMMENT 'createdAt', 
    CONSTRAINT PK_ROOM PRIMARY KEY (no)
);

ALTER TABLE ROOM COMMENT 'ROOM';



CREATE TABLE USER
(
    `no`                  INT            NOT NULL    AUTO_INCREMENT COMMENT 'no', 
    `userId`              VARCHAR(45)    NOT NULL    COMMENT 'userID', 
    `name`                VARCHAR(45)    NOT NULL    COMMENT 'name', 
    `isDeleted`           CHAR(1)        NOT NULL    DEFAULT 'N' COMMENT 'N:탈퇴 Y:활성', 
    `createdAt`           DATETIME       NOT NULL    DEFAULT now() COMMENT 'createdAt', 
    `backgroundImageUrl`  TEXT           NULL        COMMENT 'backgroundImageUrl', 
    `profileImageUrl`     TEXT           NULL        COMMENT 'profileImageUrl', 
    `updateAt`            DATETIME       NULL        DEFAULT now() on update now() COMMENT '어떠한 이벤트 발생된 날짜', 
    `role`                VARCHAR(45)    NULL        COMMENT '이거 enum으로 고치기', 
    CONSTRAINT PK_USER PRIMARY KEY (no)
);

ALTER TABLE USER COMMENT 'USER';



CREATE TABLE PARTICIPANT
(
    `no`          INT                     NOT NULL    AUTO_INCREMENT COMMENT 'no', 
    `role`        VARCHAR(45)             NOT NULL    COMMENT '이거 enum으로 변경하기', 
    `status`      enum('true','false')    NOT NULL    COMMENT '현재 접속 여부', 
    `createdAt`   DATETIME                NOT NULL    DEFAULT now() COMMENT 'createdAt', 
    `lastReadAt`  DATETIME                NOT NULL    COMMENT '마지막 접속시간', 
    `roomNo`      INT                     NOT NULL    COMMENT 'roomNo', 
    `userNo`      INT                     NOT NULL    COMMENT 'userNo', 
    CONSTRAINT PK_MEMBER PRIMARY KEY (no)
);

ALTER TABLE PARTICIPANT COMMENT 'PARTICIPANT';

ALTER TABLE PARTICIPANT
    ADD CONSTRAINT FK_PARTICIPANT_roomNo_ROOM_no FOREIGN KEY (roomNo)
        REFERENCES ROOM (no) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE PARTICIPANT
    ADD CONSTRAINT FK_PARTICIPANT_userNo_USER_no FOREIGN KEY (userNo)
        REFERENCES USER (no) ON DELETE RESTRICT ON UPDATE RESTRICT;


CREATE TABLE FRIEND
(
    `userNo`    INT    NOT NULL    COMMENT 'userNo', 
    `friendNo`  INT    NOT NULL    COMMENT '.', 
    CONSTRAINT PK_FRIEND PRIMARY KEY (userNo, friendNo)
);

ALTER TABLE FRIEND COMMENT 'FRIEND';

ALTER TABLE FRIEND
    ADD CONSTRAINT FK_FRIEND_friendNo_USER_no FOREIGN KEY (friendNo)
        REFERENCES USER (no) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE FRIEND
    ADD CONSTRAINT FK_FRIEND_userNo_USER_no FOREIGN KEY (userNo)
        REFERENCES USER (no) ON DELETE RESTRICT ON UPDATE RESTRICT;



CREATE TABLE CHAT
(
    `no`             INT            NOT NULL    AUTO_INCREMENT COMMENT 'no', 
    `type`           VARCHAR(45)    NOT NULL    DEFAULT 'text' COMMENT 'enum으로 하기:파일인지,텍스트 인지', 
    `createdAt`      DATETIME       NOT NULL    COMMENT 'createdAt', 
    `contents`       LONGTEXT       NOT NULL    COMMENT '채팅내용', 
    `read`           INT            NOT NULL    COMMENT '총 안 읽은 사람 수', 
    `participantNo`  INT            NOT NULL    COMMENT 'participantNo', 
    CONSTRAINT PK_CHAT PRIMARY KEY (no)
);

ALTER TABLE CHAT COMMENT 'CHAT';

ALTER TABLE CHAT
    ADD CONSTRAINT FK_CHAT_participantNo_PARTICIPANT_no FOREIGN KEY (participantNo)
        REFERENCES PARTICIPANT (no) ON DELETE RESTRICT ON UPDATE RESTRICT;