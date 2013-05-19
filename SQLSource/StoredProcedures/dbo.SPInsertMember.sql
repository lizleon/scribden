IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertMember]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertMember]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Adds a new member to a common room
Modified: 04/17/2013
Exec: EXEC SPInsertMember 4, 1, 1, 1, 1

********************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertMember]
	@fScribdenUserKey int,
	@fListUserStatusKey int,
	@fCommonRoomKey int,
	@Approved bit,
	@isModerator bit

AS

INSERT INTO Members( fScribdenUserKey,
					 fListUserStatusKey,
					 fCommonRoomKey,
					 Approved,
					 isModerator)
VALUES( @fScribdenUserKey,
		@fListUserStatusKey,
		@fCommonRoomKey,
		@Approved,
		@isModerator)

GO