CREATE TABLE [dbo].[CUSTOM_NUMERADOR](
	[CODIGO] [varchar](255) PRIMARY KEY NOT NULL,
	[DESCRIPCION] [varchar](255) NOT NULL,
	[PROXIMONUMERO] [numeric](19, 0) NOT NULL,
)
GO

INSERT INTO [dbo].[CUSTOM_NUMERADOR] ([CODIGO], [DESCRIPCION], [PROXIMONUMERO])
VALUES ('R01_NRO_CONTRATO', 'N�mero de Contrato utilizado para workflow de Gesti�n de Contratos.',1);

INSERT INTO [dbo].[CUSTOM_NUMERADOR] ([CODIGO], [DESCRIPCION], [PROXIMONUMERO])
VALUES ('R01_NRO_REQUERIMIENTO', 'N�mero de Requerimiento utilizado para workflow de Gesti�n de Contratos.',1);