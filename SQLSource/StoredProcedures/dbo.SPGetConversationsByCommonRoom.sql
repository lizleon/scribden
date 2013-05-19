IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[SPGetConversationsByCommonRoom]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[SPGetConversationsByCommonRoom]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*******************************************************************************

Author: Jonathan S. Collins Leon
Desc: Gets all of the conversations that are associated with a common room
Modified: 04/17/2013
Exec: EXEC SPGetConversationsByCommonRoom 1

********************************************************************************/

CREATE PROCEDURE [dbo].[SPGetConversationsByCommonRoom]
	@CommonRoomKey int

AS

SELECT	C.ConversationKey,
		MIN(P.PostKey) as PostKey,		-- First post
		C.IsClosed,
		P.Content,
		P.fScribdenUserKey,
		SU.Username						-- Add user profile pic later
FROM	Conversation C
INNER JOIN Post P
	ON P.fParentConversationKey = C.ConversationKey
INNER JOIN ScribdenUser SU
	ON SU.ScribdenUserKey = P.fScribdenUserKey
WHERE
	C.fCommonRoomKey = @CommonRoomKey
	AND C.IsBranch = 0
	AND C.Active = 1
	AND P.Active = 1
GROUP BY C.ConversationKey, C.IsClosed, P.Content, P.fScribdenUserKey, SU.Username, C.ModDate
ORDER BY C.ModDate DESC
GO