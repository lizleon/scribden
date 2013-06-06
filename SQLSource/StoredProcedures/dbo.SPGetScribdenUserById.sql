/***************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets a user given a key
Modified: 04/14/2013

CALL SPGetScribdenUserById(2);

****************************************************************************/

delimiter $

CREATE PROCEDURE SPGetScribdenUserById(p_ScribdenUserKey int)
BEGIN

SELECT  ScribdenUserKey,
		Username,
		Password,
		Email,
		Active,
		ModDate
FROM ScribdenUser 
WHERE ScribdenUserKey = p_ScribdenUserKey
	AND Active = 1;

END$

delimiter ;
