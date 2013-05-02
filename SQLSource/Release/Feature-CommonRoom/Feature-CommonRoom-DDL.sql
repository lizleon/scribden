/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the Common Room, Members, and ListUserStatus tables
Modified: 04/17/2013
************************************/

/********************************** Remove Constraints and drop table Members ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_Members_MembersKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [PK_Members_MembersKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Members_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [FK_Members_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Members_fListUserStatusKey>>ListUserStatus_ListUserStatusKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [FK_Members_fListUserStatusKey>>ListUserStatus_ListUserStatusKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_Members_fCommonRoomKey>>CommonRoom_CommonRoomKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [FK_Members_fCommonRoomKey>>CommonRoom_CommonRoomKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Members_isModerator]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [DF_Members_isModerator]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Members_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [DF_Members_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_Members_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Members] DROP CONSTRAINT [DF_Members_ModDate]
END

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Members]') AND type in (N'U'))
DROP TABLE [dbo].[Members]
GO

/********************************** Remove Constraints and drop table CommonRoom ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_CommonRoom_CommonRoomKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[CommonRoom] DROP CONSTRAINT [PK_CommonRoom_CommonRoomKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND type = 'F')
BEGIN
ALTER TABLE [dbo].[CommonRoom] DROP CONSTRAINT [FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_CommonRoom_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[CommonRoom] DROP CONSTRAINT [DF_CommonRoom_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_CommonRoom_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[CommonRoom] DROP CONSTRAINT [DF_CommonRoom_ModDate]
END

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CommonRoom]') AND type in (N'U'))
DROP TABLE [dbo].[CommonRoom]
GO


/********************************** Remove Constraints and drop table ListUserStatus ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_ListUserStatus_ListUserStatusKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ListUserStatus] DROP CONSTRAINT [PK_ListUserStatus_ListUserStatusKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_ListUserStatus_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ListUserStatus] DROP CONSTRAINT [DF_ListUserStatus_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_ListUserStatus_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ListUserStatus] DROP CONSTRAINT [DF_ListUserStatus_ModDate]
END

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ListUserStatus]') AND type in (N'U'))
DROP TABLE [dbo].[ListUserStatus]
GO


/********** Create CommonRoom Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[CommonRoom](
[CommonRoomKey] [int] IDENTITY(1,1) NOT NULL,
[Name] [varchar](255) NOT NULL,
[Description] [varchar](255) NULL,
[fScribdenUserKey] [int] NOT NULL,
[isPublic] [bit] NOT NULL,
[Banner] [varchar](255) NULL,
[HomeBG] [varchar](255) NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_CommonRoom_CommonRoomKey] PRIMARY KEY CLUSTERED
(
[CommonRoomKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[CommonRoom]'))

BEGIN
ALTER TABLE [dbo].[CommonRoom]  WITH NOCHECK ADD  CONSTRAINT [FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey] FOREIGN KEY([fScribdenUserKey])
REFERENCES [dbo].[ScribdenUser] ([ScribdenUserKey])
ALTER TABLE [dbo].[CommonRoom] CHECK CONSTRAINT [FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

ALTER TABLE [dbo].[CommonRoom] ADD CONSTRAINT [DF_CommonRoom_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[CommonRoom] ADD CONSTRAINT [DF_CommonRoom_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO


/********** Create ListUserStatus Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ListUserStatus](
[ListUserStatusKey] [int] IDENTITY(1,1) NOT NULL,
[Status] [varchar](255) NOT NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_ListUserStatus_ListUserStatusKey] PRIMARY KEY CLUSTERED
(
[ListUserStatusKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ListUserStatus] ADD CONSTRAINT [DF_ListUserStatus_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[ListUserStatus] ADD CONSTRAINT [DF_ListUserStatus_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO


/********** Create Members Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Members](
[MembersKey] [int] IDENTITY(1,1) NOT NULL,
[fScribdenUserKey] [int] NOT NULL,
[fListUserStatusKey] [int] NOT NULL,
[fCommonRoomKey] [int] NOT NULL,
[Approved] [bit] NOT NULL,
[isModerator] [bit] NOT NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Members_MembersKey] PRIMARY KEY CLUSTERED
(
[MembersKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Members_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Members]'))

BEGIN
ALTER TABLE [dbo].[Members]  WITH NOCHECK ADD  CONSTRAINT [FK_Members_fScribdenUserKey>>ScribdenUser_ScribdenUserKey] FOREIGN KEY([fScribdenUserKey])
REFERENCES [dbo].[ScribdenUser] ([ScribdenUserKey])
ALTER TABLE [dbo].[Members] CHECK CONSTRAINT [FK_Members_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Members_fListUserStatusKey>>ListUserStatus_ListUserStatusKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Members]'))

BEGIN
ALTER TABLE [dbo].[Members]  WITH NOCHECK ADD  CONSTRAINT [FK_Members_fListUserStatusKey>>ListUserStatus_ListUserStatusKey] FOREIGN KEY([fListUserStatusKey])
REFERENCES [dbo].[ListUserStatus] ([ListUserStatusKey])
ALTER TABLE [dbo].[Members] CHECK CONSTRAINT [FK_Members_fListUserStatusKey>>ListUserStatus_ListUserStatusKey]
END

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Members_fCommonRoomKey>>CommonRoom_CommonRoomKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[Members]'))

BEGIN
ALTER TABLE [dbo].[Members]  WITH NOCHECK ADD  CONSTRAINT [FK_Members_fCommonRoomKey>>CommonRoom_CommonRoomKey] FOREIGN KEY([fCommonRoomKey])
REFERENCES [dbo].[CommonRoom] ([CommonRoomKey])
ALTER TABLE [dbo].[Members] CHECK CONSTRAINT [FK_Members_fCommonRoomKey>>CommonRoom_CommonRoomKey]
END

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Members] ADD CONSTRAINT [DF_Members_Approved] DEFAULT ((0)) FOR [Approved]
GO

ALTER TABLE [dbo].[Members] ADD CONSTRAINT [DF_Members_isModerator] DEFAULT ((0)) FOR [isModerator]
GO

ALTER TABLE [dbo].[Members] ADD CONSTRAINT [DF_Members_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[Members] ADD CONSTRAINT [DF_Members_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO

