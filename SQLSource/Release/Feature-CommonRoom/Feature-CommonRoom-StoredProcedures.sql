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
Exec: EXEC SPGetCommonRoomsByScribdenUser 4

********************************************************************************/

CREATE PROCEDURE [dbo].[SPGetCommonRoomsByScribdenUser]
	@ScribdenUserKey int

AS

SELECT  CR.CommonRoomKey,
		CR.Name,
		CR.Description,
		CR.isPublic,
		CR.Banner,
		CR.HomeBG,
		M.isModerator,
		CR.Active,
		CR.ModDate
FROM CommonRoom CR
INNER JOIN Members M
	ON M.fCommonRoomKey = CR.CommonRoomKey
WHERE 
	M.fScribdenUserKey = @ScribdenUserKey		-- a member/moderator
	AND M.Approved = 1							-- approved by a moderator
	AND CR.Active = 1							-- common room is currently active
	AND M.Active = 1							-- entry is valid

GO


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


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertCommonRoom]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertCommonRoom]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets all of the common rooms that the user is a member or a moderator of
Modified: 04/17/2013
Exec: EXEC SPInsertCommonRoom 'Test Name', 'Test Description', true, 
	  'http://www.scribden.com/public/gljfsj424hjaksj.jpg', 'http://www.scribden.com/public/gljfsj424hjaksj.jpg'

********************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertCommonRoom]
	@Name varchar (255),
	@Description varchar (255),
	@isPublic bit,
	@Banner varchar(255) = NULL,
	@HomeBG varchar(255) = NULL

AS

INSERT INTO CommonRoom( Name,
						Description,
						isPublic,
						Banner,
						HomeBG )
VALUES( @Name,
		@Description,
		@isPublic,
		@Banner,
		@HomeBG )

SELECT @@IDENTITY as CommonRoomKey
GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertMember]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertMember]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets all of the common rooms that the user is a member or a moderator of
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


IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPUpdateCommonRoom]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPUpdateCommonRoom]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets all of the common rooms that the user is a member or a moderator of
Modified: 04/17/2013
Exec: EXEC SPUpdateCommonRoom 1, 'Test Name', 'Test Description', true, 
	  'http://www.scribden.com/public/gljfsj424hjaksj.jpg', 'http://www.scribden.com/public/gljfsj424hjaksj.jpg'

********************************************************************************/

CREATE PROCEDURE [dbo].[SPUpdateCommonRoom]
	@CommonRoomKey int,
	@Name varchar (255) = NULL,
	@Description varchar (255) = NULL,
	@isPublic bit = NULL,
	@Banner varchar(255) = NULL,
	@HomeBG varchar(255) = NULL

AS

IF @Name IS NOT NULL
BEGIN
	UPDATE CommonRoom SET Name = @Name WHERE CommonRoomKey = @CommonRoomKey
END

IF @Description IS NOT NULL
BEGIN
	UPDATE CommonRoom SET Description = @Description WHERE CommonRoomKey = @CommonRoomKey
END

IF @isPublic IS NOT NULL
BEGIN
	UPDATE CommonRoom SET isPublic = @isPublic WHERE CommonRoomKey = @CommonRoomKey
END

IF @Banner IS NOT NULL
BEGIN
	UPDATE CommonRoom SET Banner = @Banner WHERE CommonRoomKey = @CommonRoomKey
END

IF @HomeBG IS NOT NULL
BEGIN
	UPDATE CommonRoom SET HomeBG = @HomeBG WHERE CommonRoomKey = @CommonRoomKey
END
GO