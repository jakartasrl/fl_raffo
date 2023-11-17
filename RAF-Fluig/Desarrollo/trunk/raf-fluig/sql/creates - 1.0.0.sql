USE [FLUIG_DESA]
GO

--CONVENIO
CREATE TABLE [dbo].[Z_RAF_CONVENIO](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
)
GO

--CATEGORIA
CREATE TABLE [dbo].[Z_RAF_CATEGORIA](
	[codigo] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](400) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
	[convenio_numero] [int] FOREIGN KEY REFERENCES [dbo].[Z_RAF_CONVENIO]([numero]) NOT NULL,
)
GO

--CENTRO DE COSTO
CREATE TABLE [dbo].[Z_RAF_CENTRO_COSTO](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NOT NULL,
)
GO

--ESPECIALIDAD
CREATE TABLE [dbo].[Z_RAF_ESPECIALIDAD](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--ZONA
CREATE TABLE [dbo].[Z_RAF_ZONA](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--CONTRATO
CREATE TABLE [dbo].[Z_RAF_CONTRATO](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
	[leyContrato] [varchar](1000) NOT NULL,
	[tiempo] [varchar](50) NOT NULL,
)
GO

--HORARIO
CREATE TABLE [dbo].[Z_RAF_HORARIO](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--TRANSPORTE
CREATE TABLE [dbo].[Z_RAF_TRANSPORTE](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--CARRERA
CREATE TABLE [dbo].[Z_RAF_CARRERA](
	[codigo] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[descripcionExtendida] [varchar](2000) NOT NULL,
)
GO

--AREA
CREATE TABLE [dbo].[Z_RAF_AREA](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--SECTOR
CREATE TABLE [dbo].[Z_RAF_SECTOR](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--SUBSECTOR
CREATE TABLE [dbo].[Z_RAF_SUBSECTOR](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--APERTURA_POR_SECTOR
CREATE TABLE [dbo].[Z_RAF_APERTURA_POR_SECTOR](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--GERENCIA
CREATE TABLE [dbo].[Z_RAF_GERENCIA](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--PUESTO
CREATE TABLE [dbo].[Z_RAF_PUESTO](
	[codigo] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
)
GO

--EMPLEADO
CREATE TABLE [dbo].[Z_RAF_EMPLEADO](
	[matricula] [int] PRIMARY KEY NOT NULL,
	[nombre] [varchar](1000) NOT NULL,
	[puesto] [varchar](1000) NOT NULL,
	[categoria] [varchar](1000) NOT NULL,
	[estado] [varchar](8) NOT NULL,
)
GO

--REGIMEN HORARIO
CREATE TABLE [dbo].[Z_RAF_REGIMEN_HORARIO](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
)
GO

--ESTADO CIVIL
CREATE TABLE [dbo].[Z_RAF_ESTADO_CIVIL](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO

--NACIONALIDAD
CREATE TABLE [dbo].[Z_RAF_NACIONALIDAD](
	[numero] [int] PRIMARY KEY NOT NULL,
	[descripcion] [varchar](1000) NOT NULL,
	[codigoExterno] [varchar](4) NULL,
)
GO
