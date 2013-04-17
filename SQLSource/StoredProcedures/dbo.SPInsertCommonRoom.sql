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
Exec: EXEC SPInsertCommonRoom 'Test Name', 'Test Description', 2, true, 
	  'http://www.scribden.com/public/gljfsj424hjaksj.jpg', 'http://www.scribden.com/public/gljfsj424hjaksj.jpg'

********************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertCommonRoom]
	@Name varchar (255),
	@Description varchar (255),
	@ScribdenUserKey int,
	@isPublic bit,
	@Banner varchar(255),
	@HomeBG varchar(255)

AS

INSERT INTO CommonRoom( Name,
						Description,
						fScribdenUserKey,
						isPublic,
						Banner,
						HomeBG )
VALUES( @Name,
		@Description,
		@ScribdenUserKey,
		@isPublic,
		@Banner,
		@HomeBG )

GO