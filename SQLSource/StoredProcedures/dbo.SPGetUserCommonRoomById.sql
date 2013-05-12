IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPGetUserCommonRoomById]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPGetUserCommonRoomById]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets a common room's data in relation to the user who requested access
Modified: 04/17/2013
Exec: EXEC SPGetUserCommonRoomById 1, 4

********************************************************************************/

CREATE PROCEDURE [dbo].[SPGetUserCommonRoomById]
	@CommonRoomKey int,
	@ScribdenUserKey int

AS

SELECT  CR.CommonRoomKey,
		CR.Name,
		CR.Description,
		CR.isPublic,
		CR.Banner,
		CR.HomeBG,
		M.isModerator,
		M.Approved,
		M.fListUserStatusKey
FROM CommonRoom CR
INNER JOIN Members M
	ON M.fCommonRoomKey = CR.CommonRoomKey
WHERE
	CR.CommonRoomKey = @CommonRoomKey
	AND M.fScribdenUserKey = @ScribdenUserKey	-- get user data related to common room
	AND CR.Active = 1							-- common room is currently active
	AND M.Active = 1							-- entry is valid

GO