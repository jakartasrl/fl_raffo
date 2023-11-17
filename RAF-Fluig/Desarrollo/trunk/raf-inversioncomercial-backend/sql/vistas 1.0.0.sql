-- local
  
CREATE VIEW V_RAF08_AREA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoGteArea AS GRUPO_GTE_AREA
	,codGrupoGteArea AS COD_GRUPO_GTE_AREA
	,grupoGtePromocion AS GRUPO_GTE_PROMOCION
	,codGrupoGtePromocion AS COD_GRUPO_GTE_PROMOCION
FROM [FLUIG_RAFFO].[dbo].[ML001006] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

  CREATE VIEW V_RAF08_AREA_DISTRITO AS 
SELECT 
	di.ID
	,di.codigo AS DISTRITO_CODIGO
	,di.descripcion AS DISTRITO_DESCRIPCION
	,di.grupoGteDistrito AS GRUPO_GTE_DISTRITO
	,di.codGrupoGteDistrito AS COD_GRUPO_GTE_DISTRITO
	,di.grupoAsistDistrito AS GRUPO_ASISTENTE_DISTRITO
	,di.codGrupoAsistDistrito AS COD_GRUPO_ASISTENTE_DISTRITO
	,a.codigo AS AREA_CODIGO
	,a.descripcion AS AREA_DESCRIPCION
	,a.grupoGteArea AS GRUPO_GTE_AREA
	,a.codGrupoGteArea AS COD_GRUPO_GTE_AREA
	,a.grupoGtePromocion AS GRUPO_GTE_PROMOCION
	,a.codGrupoGtePromocion AS COD_GRUPO_GTE_PROMOCION
FROM [FLUIG_RAFFO].[dbo].[ML001006] a, DOCUMENTO da, [FLUIG_RAFFO].[dbo].[ML001007] di, DOCUMENTO ddi 
WHERE da.NR_DOCUMENTO = a.DOCUMENTID 
AND da.nr_versao = a.version 
AND da.cod_empresa = a.companyid 
AND da.versao_ativa = 1
AND ddi.NR_DOCUMENTO = di.DOCUMENTID 
AND ddi.nr_versao = di.version 
AND ddi.cod_empresa = di.companyid 
AND ddi.versao_ativa = 1
AND a.codigo = di.areaCodigo;

CREATE VIEW V_RAF10_LINEA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoSolicitante AS GRUPO_SOLICITANTE
	,codGrupoSolicitante AS COD_GRUPO_SOLICITANTE
	,grupoGteMKT AS GRUPO_GTE_MKT
	,codGrupoGteMKT AS COD_GRUPO_GTE_MKT
FROM [FLUIG_RAFFO].[dbo].[ML001025] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_INVERSION AS 
SELECT 
	ID
	,codigo
	,descripcion
FROM [FLUIG_RAFFO].[dbo].[ML001026] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_PRODUCTO AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoDerivacion AS GRUPO_DERIVACION
	,codGrupoDerivacion AS COD_GRUPO_DERIVACION
FROM [FLUIG_RAFFO].[dbo].[ML001027] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

-- DESA

DROP TABLE V_RAF08_AREA;

  CREATE VIEW V_RAF08_AREA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoGteArea AS GRUPO_GTE_AREA
	,codGrupoGteArea AS COD_GRUPO_GTE_AREA
	,grupoGtePromocion AS GRUPO_GTE_PROMOCION
	,codGrupoGtePromocion AS COD_GRUPO_GTE_PROMOCION
FROM [TOTVS_FLUIG_DESA].[dbo].[ML001105] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

DROP TABLE [dbo].[V_RAF08_AREA_DISTRITO];

  CREATE VIEW V_RAF08_AREA_DISTRITO AS 
SELECT 
	di.ID
	,di.codigo AS DISTRITO_CODIGO
	,di.descripcion AS DISTRITO_DESCRIPCION
	,di.grupoGteDistrito AS GRUPO_GTE_DISTRITO
	,di.codGrupoGteDistrito AS COD_GRUPO_GTE_DISTRITO
	,di.grupoAsistDistrito AS GRUPO_ASISTENTE_DISTRITO
	,di.codGrupoAsistDistrito AS COD_GRUPO_ASISTENTE_DISTRITO
	,a.codigo AS AREA_CODIGO
	,a.descripcion AS AREA_DESCRIPCION
	,a.grupoGteArea AS GRUPO_GTE_AREA
	,a.codGrupoGteArea AS COD_GRUPO_GTE_AREA
	,a.grupoGtePromocion AS GRUPO_GTE_PROMOCION
	,a.codGrupoGtePromocion AS COD_GRUPO_GTE_PROMOCION
FROM [TOTVS_FLUIG_DESA].[dbo].[ML001105] a, DOCUMENTO da, [TOTVS_FLUIG_DESA].[dbo].[ML001106] di, DOCUMENTO ddi 
WHERE da.NR_DOCUMENTO = a.DOCUMENTID 
AND da.nr_versao = a.version 
AND da.cod_empresa = a.companyid 
AND da.versao_ativa = 1
AND ddi.NR_DOCUMENTO = di.DOCUMENTID 
AND ddi.nr_versao = di.version 
AND ddi.cod_empresa = di.companyid 
AND ddi.versao_ativa = 1
AND a.codigo = di.areaCodigo;

  CREATE VIEW V_RAF08_PRODUCTO AS 
SELECT 
	codigoProducto
	,descripcionProducto
FROM [FLUIG_RAFFO].[dbo].[ML001006] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_LINEA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoSolicitante AS GRUPO_SOLICITANTE
	,codGrupoSolicitante AS COD_GRUPO_SOLICITANTE
	,grupoGteMKT AS GRUPO_GTE_MKT
	,codGrupoGteMKT AS COD_GRUPO_GTE_MKT
FROM [TOTVS_FLUIG_DESA].[dbo].[ML001121] m, DOCUMENTO d     
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_INVERSION AS 
SELECT 
	ID
	,codigo
	,descripcion
FROM [TOTVS_FLUIG_DESA].[dbo].[ML001122] m, DOCUMENTO d    
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_PRODUCTO AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoDerivacion AS GRUPO_DERIVACION
	,codGrupoDerivacion AS COD_GRUPO_DERIVACION
FROM [TOTVS_FLUIG_DESA].[dbo].[ML001123] m, DOCUMENTO d     
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;


-- PROD

DROP TABLE V_RAF08_AREA;

  CREATE VIEW V_RAF08_AREA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoGteArea AS GRUPO_GTE_AREA
	,codGrupoGteArea AS COD_GRUPO_GTE_AREA
	,grupoGtePromocion AS GRUPO_GTE_PROMOCION
	,codGrupoGtePromocion AS COD_GRUPO_GTE_PROMOCION
FROM [TOTVS_FLUIG_PROD].[dbo].[ML001080] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

DROP TABLE [dbo].[V_RAF08_AREA_DISTRITO];

  CREATE VIEW V_RAF08_AREA_DISTRITO AS 
SELECT 
	di.ID
	,di.codigo AS DISTRITO_CODIGO
	,di.descripcion AS DISTRITO_DESCRIPCION
	,di.grupoGteDistrito AS GRUPO_GTE_DISTRITO
	,di.codGrupoGteDistrito AS COD_GRUPO_GTE_DISTRITO
	,di.grupoAsistDistrito AS GRUPO_ASISTENTE_DISTRITO
	,di.codGrupoAsistDistrito AS COD_GRUPO_ASISTENTE_DISTRITO
	,a.codigo AS AREA_CODIGO
	,a.descripcion AS AREA_DESCRIPCION
	,a.grupoGteArea AS GRUPO_GTE_AREA
	,a.codGrupoGteArea AS COD_GRUPO_GTE_AREA
	,a.grupoGtePromocion AS GRUPO_GTE_PROMOCION
	,a.codGrupoGtePromocion AS COD_GRUPO_GTE_PROMOCION
FROM [TOTVS_FLUIG_PROD].[dbo].[ML001080] a, DOCUMENTO da, [TOTVS_FLUIG_PROD].[dbo].[ML001081] di, DOCUMENTO ddi 
WHERE da.NR_DOCUMENTO = a.DOCUMENTID 
AND da.nr_versao = a.version 
AND da.cod_empresa = a.companyid 
AND da.versao_ativa = 1
AND ddi.NR_DOCUMENTO = di.DOCUMENTID 
AND ddi.nr_versao = di.version 
AND ddi.cod_empresa = di.companyid 
AND ddi.versao_ativa = 1
AND a.codigo = di.areaCodigo;


--La vista V_RAF08_PRODUCTO no se utiliza
  CREATE VIEW V_RAF08_PRODUCTO AS 
SELECT 
	codigoProducto
	,descripcionProducto
FROM [TOTVS_FLUIG_PROD].[dbo].[ML001006] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_LINEA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoSolicitante AS GRUPO_SOLICITANTE
	,codGrupoSolicitante AS COD_GRUPO_SOLICITANTE
	,grupoGteMKT AS GRUPO_GTE_MKT
	,codGrupoGteMKT AS COD_GRUPO_GTE_MKT
FROM [TOTVS_FLUIG_PROD].[dbo].[ML001093] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_INVERSION AS 
SELECT 
	ID
	,codigo
	,descripcion
FROM [TOTVS_FLUIG_PROD].[dbo].[ML001094] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;


CREATE VIEW V_RAF10_TIPO_PRODUCTO AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoDerivacion AS GRUPO_DERIVACION
	,codGrupoDerivacion AS COD_GRUPO_DERIVACION
FROM [TOTVS_FLUIG_PROD].[dbo].[ML001095] m, DOCUMENTO d 
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;


---VALI
CREATE VIEW V_RAF10_LINEA AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoSolicitante AS GRUPO_SOLICITANTE
	,codGrupoSolicitante AS COD_GRUPO_SOLICITANTE
	,grupoGteMKT AS GRUPO_GTE_MKT
	,codGrupoGteMKT AS COD_GRUPO_GTE_MKT
FROM [TOTVS_FLUIG_VALI].[dbo].[ML001121] m, DOCUMENTO d  
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_INVERSION AS 
SELECT 
	ID
	,codigo
	,descripcion
FROM [TOTVS_FLUIG_VALI].[dbo].[ML001122] m, DOCUMENTO d  
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;

CREATE VIEW V_RAF10_TIPO_PRODUCTO AS 
SELECT 
	ID
	,codigo
	,descripcion
	,grupoDerivacion AS GRUPO_DERIVACION
	,codGrupoDerivacion AS COD_GRUPO_DERIVACION
FROM [TOTVS_FLUIG_VALI].[dbo].[ML001123] m, DOCUMENTO d  
WHERE d.NR_DOCUMENTO = m.DOCUMENTID 
AND d.nr_versao = m.version 
AND d.cod_empresa = m.companyid 
AND d.versao_ativa = 1;