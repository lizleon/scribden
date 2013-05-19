IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPInsertConversation]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPInsertConversation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Adds a new conversation to a given common room
Modified: 04/17/2013
Exec: EXEC SPInsertConversation 1

********************************************************************************/

CREATE PROCEDURE [dbo].[SPInsertConversation]
	@CommonRoomKey int

AS

INSERT INTO Conversation( fCommonRoomKey )
VALUES( @CommonRoomKey )

SELECT @@IDENTITY as ConversationKey
GO