IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPGetScribdenUserById]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPGetScribdenUserById]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/***************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets a user given a key
Modified: 04/14/2013
Exec: EXEC SPGetScribdenUserById 2

****************************************************************************/

CREATE PROCEDURE [dbo].[SPGetScribdenUserById]
	@ScribdenUserKey int

AS

SELECT * 
FROM ScribdenUser 
WHERE ScribdenUserKey = @ScribdenUserKey

GO
