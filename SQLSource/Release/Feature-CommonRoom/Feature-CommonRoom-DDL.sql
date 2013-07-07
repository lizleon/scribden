/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the Common Room, Members, and ListUserStatus tables
Modified: 04/17/2013
************************************/

DROP PROCEDURE IF EXISTS FeatureCommonRoomDDL;
delimiter $
CREATE PROCEDURE FeatureCommonRoomDDL()
BEGIN

/********************************** Remove Constraints and drop table Members ********************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Members' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE Members DROP PRIMARY KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Members' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Members_fScribdenUserKey') > 0 THEN
	ALTER TABLE Members DROP FOREIGN KEY FK_Members_fScribdenUserKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Members' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Members_fListUserStatusKey') > 0 THEN
	ALTER TABLE Members DROP FOREIGN KEY FK_Members_fListUserStatusKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Members' AND CONSTRAINT_TYPE = 'FOREIGN KEY' AND CONSTRAINT_NAME = 'FK_Members_fCommonRoomKey') > 0 THEN
	ALTER TABLE Members DROP FOREIGN KEY FK_Members_fCommonRoomKey;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'Members') > 0 THEN
	DROP TABLE Members;
END IF;

/********************************** Remove Constraints and drop table CommonRoom ********************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'CommonRoom' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE CommonRoom DROP PRIMARY KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'CommonRoom') > 0 THEN
	DROP TABLE CommonRoom;
END IF;

/********************************** Remove Constraints and drop table ListUserStatus ********************************************/

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'ListUserStatus' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE ListUserStatus DROP PRIMARY KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'ListUserStatus') > 0 THEN
	DROP TABLE ListUserStatus;
END IF;

/********** Create CommonRoom Table ************/

CREATE TABLE CommonRoom(
CommonRoomKey int NOT NULL PRIMARY KEY AUTO_INCREMENT,
Name varchar(255) NOT NULL,
Description varchar(255) NULL,
isPublic boolean NOT NULL,
Banner varchar(255) NULL,
HomeBG varchar(255) NULL,
Active boolean NOT NULL,
ModDate timestamp NOT NULL
);

ALTER TABLE CommonRoom ALTER COLUMN Active SET DEFAULT true;

/********** Create ListUserStatus Table ************/

CREATE TABLE ListUserStatus(
ListUserStatusKey int NOT NULL PRIMARY KEY AUTO_INCREMENT,
Status varchar(255) NOT NULL,
Active boolean NOT NULL,
ModDate timestamp NOT NULL
);

ALTER TABLE ListUserStatus ALTER COLUMN Active SET DEFAULT true;

/********** Create Members Table ************/

CREATE TABLE Members(
MembersKey int NOT NULL PRIMARY KEY AUTO_INCREMENT,
fScribdenUserKey int NOT NULL,
fListUserStatusKey int NOT NULL,
fCommonRoomKey int NOT NULL,
Approved boolean NOT NULL,
isModerator boolean NOT NULL,
Active boolean NOT NULL,
ModDate timestamp NOT NULL,
CONSTRAINT FK_Members_fScribdenUserKey FOREIGN KEY (fScribdenUserKey) REFERENCES ScribdenUser (ScribdenUserKey)
	ON DELETE CASCADE,
CONSTRAINT FK_Members_fListUserStatusKey FOREIGN KEY (fListUserStatusKey) REFERENCES ListUserStatus (ListUserStatusKey)
	ON DELETE SET NULL,
CONSTRAINT FK_Members_fCommonRoomKey FOREIGN KEY (fCommonRoomKey) REFERENCES CommonRoom (fCommonRoomKey)
	ON DELETE CASCADE
) ENGINE=InnoDB;

ALTER TABLE Members ALTER COLUMN Approved SET DEFAULT false;
ALTER TABLE Members ALTER COLUMN isModerator SET DEFAULT false;
ALTER TABLE Members ALTER COLUMN Active SET DEFAULT true;

END$

delimiter ;

CALL FeatureCommonRoomDDL();
