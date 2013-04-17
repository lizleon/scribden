/***********************************
Author: Jonathan S. Collins Leon
Desc: Fills out the ListUserStatus table.
Modified: 04/17/2013
************************************/

IF NOT EXISTS (SELECT ListUserStatusKey FROM ListUserStatus WHERE ListUserStatusKey = 1)

BEGIN
SET IDENTITY_INSERT ListUserStatus ON

INSERT INTO ListUserStatus (ListUserStatusKey, Status)
VALUES (1, 'Active')

SET IDENTITY_INSERT ListUserStatus OFF

END
GO

IF NOT EXISTS (SELECT ListUserStatusKey FROM ListUserStatus WHERE ListUserStatusKey = 2)

BEGIN
SET IDENTITY_INSERT ListUserStatus ON

INSERT INTO ListUserStatus (ListUserStatusKey, Status)
VALUES (2, 'Suspended')

SET IDENTITY_INSERT ListUserStatus OFF

END
GO

IF NOT EXISTS (SELECT ListUserStatusKey FROM ListUserStatus WHERE ListUserStatusKey = 3)

BEGIN
SET IDENTITY_INSERT ListUserStatus ON

INSERT INTO ListUserStatus (ListUserStatusKey, Status)
VALUES (3, 'Banned')

SET IDENTITY_INSERT ListUserStatus OFF

END
GO