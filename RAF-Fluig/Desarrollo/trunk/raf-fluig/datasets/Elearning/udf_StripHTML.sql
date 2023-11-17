CREATE FUNCTION [dbo].[udf_StripHTML] (@HTMLText VARCHAR(MAX))
RETURNS VARCHAR(MAX) AS
BEGIN
    DECLARE @Start INT
    DECLARE @End INT
    DECLARE @Length INT
    SET @Start = CHARINDEX('<',@HTMLText)
    SET @End = CHARINDEX('>',@HTMLText,CHARINDEX('<',@HTMLText))
    SET @Length = (@End - @Start) + 1
    WHILE @Start > 0 AND @End > 0 AND @Length > 0
    BEGIN
        SET @HTMLText = STUFF(@HTMLText,@Start,@Length,' ')
        SET @Start = CHARINDEX('<',@HTMLText)
        SET @End = CHARINDEX('>',@HTMLText,CHARINDEX('<',@HTMLText))
        SET @Length = (@End - @Start) + 1
    END
    RETURN REPLACE(REPLACE(LTRIM(RTRIM(@HTMLText)),'&nbsp;',' '),'  ',' ')
END
GO

-- Queries de ayuda:

-- CAPACITACION

SELECT [cei].[ID], [ni].[NAME]
from ELE_TRAINING t
join ELE_CATALOG_ENROLLABLE_ITEM cei ON (t.ID = cei.ID)
join ELE_CATALOG_NORMAL_ITEM ni on (ni.ID = cei.ID)
join ELE_CATALOG_ITEM ci on (ci.ID = cei.ID)
join ELE_TENANT ten on (ci.ID_TENANT = ten.ID) 
left join ELE_FOLDER pi on (ci.ID_PARENT_ITEM = pi.ID)
left join AMS_ASSESSMENT_ITEM pre on (cei.ID_PRE_EXAM = pre.ID)
left join AMS_ASSESSMENT_ITEM pos on (cei.ID_POS_EXAM = pos.ID)
left join AMS_ASSESSMENT_ITEM rea on (cei.ID_REACTION = rea.ID)
WHERE [cei].[ID] = 32334
ORDER BY [ni].NAME;

-- ALUMNO, EVALUACION, TIPO DE EVALUACION, 
-- [uf].full_name AS userName, [a].[NAME] AS assesmentName, app.TYPE as assessmentType, aa.[STARTED_ON] as startDate, [aa].[FINISHED_ON] as finishDate, av.[REQUIRED_SCORE] AS requiredScore,  aa.final_score AS finalScore, aa.[APPROVED] AS approved
SELECT [uf].full_name AS userName, [a].[NAME] AS assesmentName, app.TYPE as assessmentType, aa.[STARTED_ON] as startDate, [aa].[FINISHED_ON] as finishDate, av.[REQUIRED_SCORE] AS requiredScore,  aa.final_score AS finalScore, aa.[APPROVED] AS approved, [app].id AS assessmentApplicationId, cei.[ID] AS learningId
from ELE_CATALOG_ENROLLABLE_ITEM cei 
join ELE_CATALOG_ITEM ci on (ci.ID = cei.ID)
join ELE_TENANT ten on (ci.ID_TENANT = ten.ID) 
join AMS_ASSESSMENT_ITEM pos on (cei.ID_POS_EXAM = pos.ID)
join AMS_ASSESSMENT_VERSION av on (av.ID = pos.ID)
join AMS_ASSESSMENT a on (av.ID_ASSESSMENT = a.ID),
ELE_ENRLLBL_ITM_ASSMNT_APPLCTN app join AMS_ASSESSMENT_APPLICATION aa on (aa.ID = app.ID)
left join ELE_USER u on (aa.ID_EXECUTED_BY = u.ID)
JOIN ELE_PARTY p ON ([p].[ID] = [u].id)
JOIN [dbo].[FDN_USER] uf ON ([p].[ID_FLUIG] = [uf].[USER_ID]),
ELE_ENROLLMENT e
where app.ID_ENROLLABLE_ITEM = cei.ID
and aa.ID_ASSESSMENT_VERSION = a.ID_CURRENT_ASSESSMENT_VERSION -- solo la version actual
and app.ID_ENROLLMENT = e.ID
and app.TYPE = 'POS_EXAM'
AND [cei].[ID] = 32591;

select bl.id as blockId, bl.name as blockName, abv.weight as weight, abv.required_Score as minScore, appb.total_Points as totalPoints, app.id as assessmentApplicationId, appb.id as appBlockId, bv.id as blockVersionId
from AMS_ASSESSMENT_APP_BLOCK appb
join AMS_ASSESSMENT_APPLICATION app on (appb.ID_ASSESSMENT_APPLICATION = app.ID)
join AMS_ASSESSMENT_BLOCK_VERSION abv on (appb.ID_BLOCK_VERSION = abv.ID)
join AMS_BLOCK_VERSION bv on (abv.ID_BLOCK_VERSION = bv.ID) 
join AMS_BLOCK bl on (bv.ID_BLOCK = bl.ID)
join ELE_TENANT ten on (app.ID_TENANT = ten.ID) 
left join ELE_USER u on (app.ID_EXECUTED_BY = u.ID)
WHERE [app].[ID] = 33610;

select aqv.id AS assessmentQuestionVersionId,  dbo.udf_StripHTML(aqv.[QUESTION]) AS title  , tci.title as topicTitle, aq.difficulty as difficulty, appq.total_Points AS totalPoints, CASE WHEN appq.[CANCELED_APPLICATION] IS NULL THEN 'false' ELSE 'true' END as isCanceled, app.id as assessmentApplicationId, block.id AS appBlockId, p.ID_FLUIG AS userId,
-- [oq].[ID], mq.ID, clq.ID, orq.ID, laq.ID, scq.ID, esq.ID, 
CASE 
  WHEN [oq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.ObjectiveQuestion'
  WHEN [mq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.MultipleQuestion'
  WHEN [clq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.CorrelationQuestion'
  WHEN [orq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.OrdinationQuestion'
  WHEN [laq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.LacunaQuestion'
  WHEN [scq].[ID] IS NOT NULL THEN 'class com.totvs.elearning.core.assessment.ScaleQuestion'
  ELSE 'class com.totvs.elearning.core.assessment.EssayQuestion'
END as TYPE,
CASE
  WHEN [oq].[ID] IS NOT NULL THEN alt.[DESCRIPTION]
  WHEN esq.ID IS NOT NULL THEN aaeq.[ESSAY_RESPONSE]
  WHEN mq.ID IS NOT NULL THEN alt2.[DESCRIPTION]
END AS response
from AMS_ASSESSMENT_APP_QUESTION appq
join AMS_ASSESSMENT_QUESTION_VRSN aqv on (appq.ID_ASSESSMENT_QUESTION_VRSN = aqv.ID)
left join AMS_CLOSED_QUESTION cq on (aqv.ID = cq.ID)
left join AMS_OBJECTIVE_QUESTION oq on (aqv.ID = oq.ID) -- class com.totvs.elearning.core.assessment.ObjectiveQuestion
left join AMS_MULTIPLE_QUESTION mq on (aqv.ID = mq.ID) -- class com.totvs.elearning.core.assessment.MultipleQuestion
left join AMS_CORRELATION_QUESTION clq on (aqv.ID = clq.ID) -- class com.totvs.elearning.core.assessment.CorrelationQuestion
left join AMS_ORDINATION_QUESTION orq on (aqv.ID = orq.ID) -- class com.totvs.elearning.core.assessment.OrdinationQuestion
left join AMS_LACUNA_QUESTION laq on (aqv.ID = laq.ID) -- class com.totvs.elearning.core.assessment.LacunaQuestion
left join AMS_SCALE_QUESTION scq on (aqv.ID = scq.ID) -- class com.totvs.elearning.core.assessment.ScaleQuestion
left join AMS_ESSAY_QUESTION esq on (aqv.ID = esq.ID) -- class com.totvs.elearning.core.assessment.EssayQuestion
join AMS_ASSESSMENT_QUESTION aq on (aqv.ID_ASSESSMENT_QUESTION = aq.ID)
join AMS_ASSESSMENT_CATALOG_ITEM ci on (aq.ID = ci.ID)
join AMS_ASSESSMENT_TOPIC pt on (ci.ID_PARENT_ITEM = pt.ID)
join AMS_ASSESSMENT_CATALOG_ITEM tci on (tci.ID = pt.ID)
join AMS_ASSESSMENT_APP_BLOCK block on (appq.ID_APP_BLOCK = block.ID)
join AMS_ASSESSMENT_APPLICATION app on (block.ID_ASSESSMENT_APPLICATION = app.ID)
left join ELE_USER u on (app.ID_EXECUTED_BY = u.ID)
left join ELE_PARTY p on (u.ID = p.ID)
join ELE_TENANT ten on (app.ID_TENANT = ten.ID)
JOIN  [dbo].[AMS_ASSESSMENT_APP_QUESTION] aaq ON block.[ID] = [aaq].[ID_APP_BLOCK] AND aaq.[ID_ASSESSMENT_QUESTION_VRSN] = aqv.[ID]
-- RESPUESTAS
LEFT JOIN [dbo].[AMS_ASSMNT_APP_OBJCTV_QSTN] aaoq ON [aaoq].[ID] = [aaq].[ID]
LEFT JOIN [dbo].[AMS_ALTERNATIVE] alt ON alt.[ID] = [aaoq].[ID_ALTERNATIVE]
LEFT JOIN [dbo].[AMS_ASSMNT_APP_ESSAY_QSTN] aaeq ON aaeq.[ID] = [aaq].[ID]
LEFT JOIN [dbo].[AMS_ASSMNT_APP_MULTIPLE_QUSTN] aamq ON aamq.[ID] = [aaq].[ID]
LEFT JOIN [dbo].[AMS_ASSMNT_APP_MLTPL_ALTRNTV] aamqa ON aamqa.[ASSMNT_APP_MLTPL_QSTN_ID] = [aamq].[ID]
LEFT JOIN  [dbo].[AMS_ALTERNATIVE] alt2 ON alt2.[ID] = [aamqa].[ALTERNATIVE_ID]
WHERE [app].[ID] = 33610;