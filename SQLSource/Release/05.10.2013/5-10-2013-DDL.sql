/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the ScribdenUser table
Modified: 04/04/2013
************************************/

/********************************** Remove Constraints and drop table ScribdenUser ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_ScribdenUser_ScribdenUserKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ScribdenUser] DROP CONSTRAINT [PK_ScribdenUser_ScribdenUserKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_ScribdenUser_Active]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ScribdenUser] DROP CONSTRAINT [DF_ScribdenUser_Active]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[DF_ScribdenUser_ModDate]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[ScribdenUser] DROP CONSTRAINT [DF_ScribdenUser_ModDate]
END

GO

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ScribdenUser]') AND type in (N'U'))
DROP TABLE [dbo].[ScribdenUser]
GO

/********** Create ScribdenUser Table ************/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[ScribdenUser](
[ScribdenUserKey] [int] IDENTITY(1,1) NOT NULL,
[Username] [varchar](32) NOT NULL,
[Password] [varchar](16) NOT NULL,
[Email] [varchar](255) NOT NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_ScribdenUser_ScribdenUserKey] PRIMARY KEY CLUSTERED
(
[ScribdenUserKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[ScribdenUser] ADD CONSTRAINT [DF_ScribdenUser_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[ScribdenUser] ADD CONSTRAINT [DF_ScribdenUser_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO


/***********************************
Author: Jonathan S. Collins Leon
Desc: Creates the CommonRoom table
Modified: 04/15/2013
************************************/

/********************************** Remove Constraints and drop table CommonRoom ********************************************/

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[PK_CommonRoom_CommonRoomKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[CommonRoom] DROP CONSTRAINT [PK_CommonRoom_CommonRoomKey]
END

GO

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[FK_CommonRoom_fScribdenUserKey]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[CommonRoom] DROP CONSTRAINT [PK_CommonRoom_fScribdenUserKey]
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
[fScribdenUserKey] [int] NOT NULL,
[Active] [bit] NOT NULL,
[ModDate] [datetime] NOT NULL,
 CONSTRAINT [PK_CommonRoom_CommonRoomKey] PRIMARY KEY CLUSTERED
(
[CommonRoomKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]') AND parent_object_id = OBJECT_ID(N'[dbo].[CommonRoom]'))

BEGIN
ALTER TABLE [dbo].[CommonRoom]  WITH NOCHECK ADD  CONSTRAINT [FK_ScribdenUser_fScribdenUserKey>>ScribdenUser_ScribdenUserKey] FOREIGN KEY([fScribdenUserKey])
REFERENCES [dbo].[ScribdenUser] ([ScribdenUserKey])
ALTER TABLE [dbo].[CommonRoom] CHECK CONSTRAINT [FK_CommonRoom_fScribdenUserKey>>ScribdenUser_ScribdenUserKey]
END

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[CommonRoom] ADD CONSTRAINT [DF_CommonRoom_Active] DEFAULT ((1)) FOR [Active]
GO

ALTER TABLE [dbo].[CommonRoom] ADD CONSTRAINT [DF_CommonRoom_ModDate] DEFAULT (getdate()) FOR [ModDate]
GO
