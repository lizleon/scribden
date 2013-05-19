/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the Conversation, Post, and FollowedConversation tables
Modified: 05/18/2013
************************************/

/********************************** Remove Constraints on table Conversation ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_Conversation_ConversationKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Conversation] DROP CONSTRAINT [PK_Conversation_ConversationKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Conversation_fCommonRoomKey>>CommonRoom_CommonRoomKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Conversation] DROP CONSTRAINT [FK_Conversation_fCommonRoomKey>>CommonRoom_CommonRoomKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Conversation_IsBranch]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Conversation] DROP CONSTRAINT [DF_Conversation_IsBranch]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Conversation_IsClosed]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Conversation] DROP CONSTRAINT [DF_Conversation_IsClosed]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Conversation_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Conversation] DROP CONSTRAINT [DF_Conversation_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Conversation_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Conversation] DROP CONSTRAINT [DF_Conversation_ModDate]
END

GO

/********************************** Remove Constraints and drop table Post ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_Post_PostKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [PK_Post_PostKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Post_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [FK_Post_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Post_fParentConversationKey>>Conversation_ConversationKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [FK_Post_fParentConversationKey>>Conversation_ConversationKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Post_fChildConversationKey>>Conversation_ConversationKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [FK_Post_fChildConversationKey>>Conversation_ConversationKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Post_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [DF_Post_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Post_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [DF_Post_ModDate]
END

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Post]') AND type in (N'U'))
DROP TABLE [dbo].[Post]
GO

/********************************** Remove Constraints and drop table FollowedConversation ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_FollowedConversation_FollowedConversationKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[FollowedConversation] DROP CONSTRAINT [PK_FollowedConversation_FollowedConversationKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_FollowedConversation_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[FollowedConversation] DROP CONSTRAINT [FK_FollowedConversation_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_FollowedConversation_fConversationKey>>Conversation_ConversationKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[FollowedConversation] DROP CONSTRAINT [FK_FollowedConversation_fConversationKey>>Conversation_ConversationKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_FollowedConversation_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[FollowedConversation] DROP CONSTRAINT [DF_FollowedConversation_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_FollowedConversation_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[FollowedConversation] DROP CONSTRAINT [DF_FollowedConversation_ModDate]
END

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[FollowedConversation]') AND type in (N'U'))
DROP TABLE [dbo].[FollowedConversation]
GO

/*********************************************** Drop table Conversation *******************************************************/

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Conversation]') AND type in (N'U'))
DROP TABLE [dbo].[Conversation]
GO

/********** Create Conversation Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Conversation](
[ConversationKey] [int] IDENTITY(1,1) NOT NULL,
[fCommonRoomKey] [int] NOT NULL,
[IsBranch] [bit] NOT NULL,
[IsClosed] [bit] NOT NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Conversation_ConversationKey] PRIMARY KEY CLUSTERED
(
[ConversationKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Conversation_fCommonRoomKey>>CommonRoom_CommonRoomKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Conversation]'))

BEGIN
ALTER TABLE [dbo].[Conversation]  WITH NOCHECK ADD  CONSTRAINT [FK_Conversation_fCommonRoomKey>>CommonRoom_CommonRoomKey] FOREIGN KEY([fCommonRoomKey])
REFERENCES [dbo].[CommonRoom] ([CommonRoomKey])
ALTER TABLE [dbo].[Conversation] CHECK CONSTRAINT [FK_Conversation_fCommonRoomKey>>CommonRoom_CommonRoomKey]
END

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Conversation] ADD CONSTRAINT [DF_Conversation_IsBranch] DEFAULT ((0)) FOR [IsBranch]
GO

ALTER TABLE [dbo].[Conversation] ADD CONSTRAINT [DF_Conversation_IsClosed] DEFAULT ((0)) FOR [IsClosed]
GO

ALTER TABLE [dbo].[Conversation] ADD CONSTRAINT [DF_Conversation_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[Conversation] ADD CONSTRAINT [DF_Conversation_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO

/********** Create Post Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Post](
[PostKey] [int] IDENTITY(1,1) NOT NULL,
[Content] [varchar](700) NOT NULL,
[fScribdenUserKey] [int] NOT NULL,
[fParentConversationKey] [int] NOT NULL,
[fChildConversationKey] [int] NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Post_PostKey] PRIMARY KEY CLUSTERED
(
[PostKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Post_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Post]'))

BEGIN
ALTER TABLE [dbo].[Post]  WITH NOCHECK ADD  CONSTRAINT [FK_Post_fScribdenUserKey>>ScribdenUser_ScribdenUserKey] FOREIGN KEY([fScribdenUserKey])
REFERENCES [dbo].[ScribdenUser] ([ScribdenUserKey])
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Post_fParentConversationKey>>Conversation_ConversationKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Post]'))

BEGIN
ALTER TABLE [dbo].[Post]  WITH NOCHECK ADD  CONSTRAINT [FK_Post_fParentConversationKey>>Conversation_ConversationKey] FOREIGN KEY([fParentConversationKey])
REFERENCES [dbo].[Conversation] ([ConversationKey])
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_fParentConversationKey>>Conversation_ConversationKey]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Post_fChildConversationKey>>Conversation_ConversationKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Post]'))

BEGIN
ALTER TABLE [dbo].[Post]  WITH NOCHECK ADD  CONSTRAINT [FK_Post_fChildConversationKey>>Conversation_ConversationKey] FOREIGN KEY([fChildConversationKey])
REFERENCES [dbo].[Conversation] ([ConversationKey])
ALTER TABLE [dbo].[Post] CHECK CONSTRAINT [FK_Post_fChildConversationKey>>Conversation_ConversationKey]
END

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Post] ADD CONSTRAINT [DF_Post_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[Post] ADD CONSTRAINT [DF_Post_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO

/********** Create FollowedConversation Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[FollowedConversation](
[FollowedConversationKey] [int] IDENTITY(1,1) NOT NULL,
[fScribdenUserKey] [int] NOT NULL,
[fConversationKey] [int] NOT NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_FollowedConversation_FollowedConversationKey] PRIMARY KEY CLUSTERED
(
[FollowedConversationKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_FollowedConversation_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[FollowedConversation]'))

BEGIN
ALTER TABLE [dbo].[FollowedConversation]  WITH NOCHECK ADD  CONSTRAINT [FK_FollowedConversation_fScribdenUserKey>>ScribdenUser_ScribdenUserKey] FOREIGN KEY([fScribdenUserKey])
REFERENCES [dbo].[ScribdenUser] ([ScribdenUserKey])
ALTER TABLE [dbo].[FollowedConversation] CHECK CONSTRAINT [FK_FollowedConversation_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_FollowedConversation_fConversationKey>>Conversation_ConversationKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[FollowedConversation]'))

BEGIN
ALTER TABLE [dbo].[FollowedConversation]  WITH NOCHECK ADD  CONSTRAINT [FK_FollowedConversation_fConversationKey>>Conversation_ConversationKey] FOREIGN KEY([fConversationKey])
REFERENCES [dbo].[Conversation] ([ConversationKey])
ALTER TABLE [dbo].[FollowedConversation] CHECK CONSTRAINT [FK_FollowedConversation_fConversationKey>>Conversation_ConversationKey]
END

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[FollowedConversation] ADD CONSTRAINT [DF_FollowedConversation_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[FollowedConversation] ADD CONSTRAINT [DF_FollowedConversation_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO
