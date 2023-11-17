-- Cambiar ML001071 por la tabla que corresponda a Motivo  (1065 en prod)
-- Cambiar ML001072 por la tabla que corresponda a Motivo (grupos) (1066 en prod)
CREATE VIEW [dbo].[V_RAF07-Motivos] AS
	SELECT m.*
	  FROM ML001065 as m
	  JOIN DOCUMENTO d
	    ON d.NR_DOCUMENTO = m.documentid
	   AND d.NR_VERSAO = m.version
	 WHERE d.VERSAO_ATIVA = 1;
GO
	  
CREATE VIEW [dbo].[V_RAF07-Motivos-Grupos] AS
	SELECT *
	  FROM ML001066;
GO