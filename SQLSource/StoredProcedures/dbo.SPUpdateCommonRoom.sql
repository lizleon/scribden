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