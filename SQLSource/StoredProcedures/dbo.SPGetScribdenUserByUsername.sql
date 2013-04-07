IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPGetScribdenUserByUsername]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPGetScribdenUserByUsername]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/***************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets a user given a username
Modified: 04/04/2013
Exec: EXEC SPGetScribdenUserByUsername 'testUser'

****************************************************************************/

CREATE PROCEDURE [dbo].[SPGetScribdenUserByUsername]
	@Username varchar (255)

AS

SELECT * 
FROM ScribdenUser 
WHERE Username = @Username

GO
