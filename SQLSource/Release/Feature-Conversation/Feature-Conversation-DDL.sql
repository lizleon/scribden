/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the Conversation, Post, and FollowedConversation tables
Modified: 05/18/2013
************************************/

DROP PROCEDURE IF EXISTS FeatureConversationDDL;
delimiter $
CREATE PROCEDURE FeatureConversationDDL()
BEGIN

/********************************** Remove Constraints on table Conversation ********************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Conversation' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE Conversation DROP PRIMARY KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Conversation' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Conversation_fCommonRoomKey') > 0 THEN
	ALTER TABLE ScribdenUser DROP FOREIGN KEY FK_Conversation_fCommonRoomKey;
END IF;

/********************************** Remove Constraints and drop table Post ********************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Post' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE Post DROP PRIMARY KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Post' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Post_fScribdenUserKey') > 0 THEN
	ALTER TABLE Post DROP FOREIGN KEY FK_Post_fScribdenUserKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Post' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Post_fParentConversationKey') > 0 THEN
	ALTER TABLE Post DROP FOREIGN KEY FK_Post_fParentConversationKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Post' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Post_fChildConversationKey') > 0 THEN
	ALTER TABLE Post DROP FOREIGN KEY FK_Post_fChildConversationKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Post') > 0 THEN
	DROP TABLE Post;
END IF;

/********************************** Remove Constraints and drop table FollowedConversation ********************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'FollowedConversation' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE FollowedConversation DROP PRIMARY KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'FollowedConversation' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_FollowedConversation_fScribdenUserKey') > 0 THEN
	ALTER TABLE FollowedConversation DROP FOREIGN KEY FK_FollowedConversation_fScribdenUserKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'FollowedConversation' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_FollowedConversation_fConversationKey') > 0 THEN
	ALTER TABLE FollowedConversation DROP FOREIGN KEY FK_FollowedConversation_fConversationKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'FollowedConversation') > 0 THEN
	DROP TABLE FollowedConversation;
END IF;

/*********************************************** Drop table Conversation *******************************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Conversation') > 0 THEN
	DROP TABLE Conversation;
END IF;

/********** Create Conversation Table ************/

CREATE TABLE Conversation(
ConversationKey int NOT NULL PRIMARY KEY AUTO_INCREMENT,
fCommonRoomKey int NOT NULL,
IsBranch boolean NOT NULL,
IsClosed boolean NOT NULL,
Active boolean NOT NULL,
ModDate timestamp NOT NULL,
CONSTRAINT FK_Conversation_fCommonRoomKey FOREIGN KEY (fCommonRoomKey) REFERENCES CommonRoom (CommonRoomKey)
	ON DELETE CASCADE
);

ALTER TABLE Conversation ALTER COLUMN IsBranch SET DEFAULT false;
ALTER TABLE Conversation ALTER COLUMN IsClosed SET DEFAULT false;
ALTER TABLE Conversation ALTER COLUMN Active SET DEFAULT true;

/********** Create Post Table ************/

CREATE TABLE Post(
PostKey int NOT NULL PRIMARY KEY AUTO_INCREMENT,
Content varchar(700) NOT NULL,
fScribdenUserKey int NOT NULL,
fParentConversationKey int NOT NULL,
fChildConversationKey int NULL,
Active boolean NOT NULL,
ModDate timestamp,
CONSTRAINT FK_Conversation_fScribdenUserKey FOREIGN KEY (fScribdenUserKey) REFERENCES ScribdenUser (ScribdenUser)
	ON DELETE NO ACTION,
CONSTRAINT FK_Conversation_fParentConversationKey FOREIGN KEY (fParentConversationKey) REFERENCES Conversation (ConversationKey)
	ON DELETE CASCADE,
CONSTRAINT FK_Conversation_fChildConversationKey FOREIGN KEY (fChildConversationKey) REFERENCES Conversation (ConversationKey)
	ON DELETE SET NULL
);

ALTER TABLE Conversation ALTER COLUMN Active SET DEFAULT true;

/********** Create FollowedConversation Table ************/

CREATE TABLE FollowedConversation(
FollowedConversationKey int NOT NULL PRIMARY KEY AUTO_INCREMENT,
fScribdenUserKey int NOT NULL,
fConversationKey int NOT NULL,
Active boolean NOT NULL,
ModDate timestamp NOT NULL,
CONSTRAINT FK_FollowedConversation_fScribdenUserKey FOREIGN KEY (fScribdenUserKey) REFERENCES ScribdenUser (ScribdenUser)
	ON DELETE CASCADE,
CONSTRAINT FK_Conversation_fConversationKey FOREIGN KEY (fConversationKey) REFERENCES Conversation (ConversationKey)
	ON DELETE CASCADE,
);

END$

delimiter ;
CALL FeatureConversationDDL();
