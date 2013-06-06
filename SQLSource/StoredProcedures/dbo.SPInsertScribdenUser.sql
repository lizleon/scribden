/***************************************************************************

Author: Jonathan S. Collins Leon
Desc: Inserts a new user.
Modified: 04/04/2013

CALL SPInsertScribdenUser('testUser', 'testPassword', 'test@email.com');

****************************************************************************/

delimiter $

CREATE PROCEDURE SPInsertScribdenUser(p_Username varchar(32), p_Password varchar(16), p_Email varchar(255))
BEGIN

INSERT INTO ScribdenUser (Username, Password, Email)
VALUES (p_Username, p_Password, p_Email);

END$

delimiter ;
