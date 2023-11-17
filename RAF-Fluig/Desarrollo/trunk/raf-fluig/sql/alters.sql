UPDATE [dbo].[ANEXO_PROCES]
SET [NUM_SEQ_MOVTO_ORIG]=(SELECT MIN([hp].[NUM_SEQ_MOVTO])
                            FROM [dbo].[HISTOR_PROCES] hp 
                           WHERE [hp].[NUM_PROCES] = [dbo].[ANEXO_PROCES].[NUM_PROCES]
                             AND [hp].[NUM_SEQ_ESTADO] = [dbo].[ANEXO_PROCES].[NUM_SEQ_MOVTO_ORIG])
WHERE [DT_ANEXO] IS NULL