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

SELECT  ScribdenUserKey,
		Username,
		Password,
		Email,
		Active,
		ModDate
FROM ScribdenUser 
WHERE ScribdenUserKey = @ScribdenUserKey
	AND Active = 1

GO


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
Exec: EXEC SPGetScribdenUserByUsername 'scribdentest2'

****************************************************************************/

CREATE PROCEDURE [dbo].[SPGetScribdenUserByUsername]
	@Username varchar (255)

AS

SELECT  ScribdenUserKey,
		Username,
		Password,
		Email,
		Active,
		ModDate
FROM ScribdenUser 
WHERE Username = @Username
	AND Active = 1

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertScribdenUser]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertScribdenUser]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/***************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets a user given a username
Modified: 04/04/2013
Exec: EXEC SPInsertScribdenUser 'testUser', 'testPassword', 'test@email.com'

****************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertScribdenUser]
	@Username varchar (32),
	@Password varchar (16),
	@Email varchar (255)
AS

INSERT INTO ScribdenUser (Username, Password, Email)
VALUES (@Username, @Password, @Email)

GO
