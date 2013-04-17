IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPGetCommonRoomsByScribdenUser]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPGetCommonRoomsByScribdenUser]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets all of the common rooms that the user is a member or a moderator of
Modified: 04/17/2013
Exec: EXEC SPGetCommonRoomsByScribdenUser 2

********************************************************************************/

CREATE PROCEDURE [dbo].[SPGetCommonRoomsByScribdenUser]
	@ScribdenUserKey int

AS

SELECT  CR.CommonRoomKey,
		CR.Name,
		CR.Description,
		CR.fScribdenUserKey,
		CR.isPublic,
		CR.Banner,
		CR.HomeBG,
		CR.Active,
		CR.ModDate
FROM CommonRoom CR
INNER JOIN Members M
	ON M.fCommonRoomKey = CR.CommonRoomKey
WHERE 
	(CR.fScribdenUserKey = @ScribdenUserKey		-- user is the moderator
	OR M.fScribdenUserKey = @ScribdenUserKey)	-- or a member
	AND CR.Active = 1							-- common room is currently active
	AND M.Active = 1							-- entry is valid

GO