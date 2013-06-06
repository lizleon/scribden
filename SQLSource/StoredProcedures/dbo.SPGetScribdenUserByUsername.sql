/***************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets a user given a username
Modified: 04/04/2013

CALL SPGetScribdenUserByUsername('scribdentest2');

****************************************************************************/

delimiter $
CREATE PROCEDURE SPGetScribdenUserByUsername(p_Username varchar(255))
BEGIN

SELECT  ScribdenUserKey,
		Username,
		Password,
		Email,
		Active,
		ModDate
FROM ScribdenUser 
WHERE Username = p_Username
	AND Active = 1;

END$

delimiter ;
