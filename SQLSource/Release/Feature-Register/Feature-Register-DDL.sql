/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the ScribdenUser table
Modified: 04/04/2013
************************************/

/********************************** Remove Constraints and drop table ScribdenUser ********************************************/

delimiter $
CREATE PROCEDURE FeatureRegisterDDL()
BEGIN

IF (SELECT COUNT(*) FROM information_schema.table_constraints WHERE TABLE_NAME = 'ScribdenUser' AND CONSTRAINT_TYPE = 'PRIMARY KEY') > 0 THEN
	ALTER TABLE ScribdenUser DROP PRIMARY_KEY;
END IF;

IF (SELECT COUNT(*) FROM information_schema.tables WHERE TABLE_NAME = 'ScribdenUser') > 0 THEN
	DROP TABLE ScribdenUser;
END IF;

CREATE TABLE ScribdenUser(
ScribdenUserKey int NOT NULL PRIMARY KEY,
Username varchar(32) NOT NULL,
Password varchar(32) NOT NULL,
Email varchar(255) NOT NULL,
Active bit NOT NULL,
ModDate timestamp NOT NULL
) ENGINE=InnoDB;

ALTER TABLE ScribdenUser ALTER COLUMN Active SET DEFAULT 1;

END$

delimiter ;
CALL FeatureRegisterDDL();
