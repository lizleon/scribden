IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertPost]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertPost]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Adds a post to a given conversation
Modified: 04/17/2013
Exec: EXEC SPInsertPost 'Test Post', 4, 1

********************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertPost]
	@Content varchar(700),
	@ScribdenUserKey int,
	@ParentConversationKey int,
	@ChildConversationKey int = NULL

AS

INSERT INTO Post( Content, fScribdenUserKey, fParentConversationKey, fChildConversationKey )
VALUES( @Content,
		@ScribdenUserKey,
		@ParentConversationKey,
		@ChildConversationKey )

SELECT @@IDENTITY as PostKey
GO