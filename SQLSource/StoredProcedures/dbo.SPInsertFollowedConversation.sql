IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertFollowedConversation]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertFollowedConversation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Follows a given conversation for a particular user
Modified: 04/17/2013
Exec: EXEC SPInsertFollowedConversation 4, 1

********************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertFollowedConversation]
	@ScribdenUserKey int,
	@ConversationKey int

AS

INSERT INTO FollowedConversation( fScribdenUserKey, fConversationKey )
VALUES( @ScribdenUserKey,
		@ConversationKey )

SELECT @@IDENTITY as FollowedConversationKey
GO