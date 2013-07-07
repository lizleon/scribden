/***********************************
Author: Jonathan S. Collins Leon
Desc: Fills out the ListUserStatus table.
Modified: 04/17/2013
************************************/

DROP PROCEDURE IF EXISTS FeatureCommonRoomDML;
delimiter $
CREATE PROCEDURE FeatureCommonRoomDML()
BEGIN

IF (SELECT COUNT(ListUserStatusKey) FROM ListUserStatus WHERE ListUserStatusKey = 1 ) = 0 THEN

INSERT INTO ListUserStatus (ListUserStatusKey, Status)
VALUES (1, 'Active');

END IF;

IF (SELECT COUNT(ListUserStatusKey) FROM ListUserStatus WHERE ListUserStatusKey = 2) = 0 THEN

INSERT INTO ListUserStatus (ListUserStatusKey, Status)
VALUES (2, 'Suspended');

END IF;

IF (SELECT COUNT(ListUserStatusKey) FROM ListUserStatus WHERE ListUserStatusKey = 3) = 0 THEN

INSERT INTO ListUserStatus (ListUserStatusKey, Status)
VALUES (3, 'Banned');

END IF;

END$

delimiter ;

CALL FeatureCommonRoomDML();
