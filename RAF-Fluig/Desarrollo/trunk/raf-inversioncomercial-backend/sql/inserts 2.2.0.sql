/****** Z_RAF_COUNTRY ******/

CREATE TABLE [dbo].[Z_RAF_COUNTRY](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[CODE] [varchar](50) NOT NULL,
	[DESCRIPTION] [varchar](300) NOT NULL,
	[ENABLED] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

--SET IDENTITY_INSERT Z_RAF_COUNTRY ON;
INSERT INTO Z_RAF_COUNTRY (id, CODE, DESCRIPTION, ENABLED) VALUES 								
(	1	 , 'AR', 'ARGENTINA', 1	),
(	2	 , 'ES', 'ESPA�A', 1	),
(	3	 , 'CL', 'CHILE', 1	),
(	4	 , 'BR', 'BRASIL', 1	),
(	5	 , 'US', 'ESTADOS UNIDOS', 1	),
(	6	 , 'FR', 'FRANCIA', 1	),
(	7	 , 'CN', 'CHINA', 1	),
(	8	 , 'VN', 'VIETNAM', 1	),
(	9	 , 'TH', 'TAILANDIA', 1	),
(	10	 , 'PY', 'PARAGUAY', 1	),
(	11	 , 'IT', 'ITALIA', 1	),
(	12	 , 'CO', 'COLOMBIA', 1	),
(	13	 , 'EC', 'ECUADOR', 1	),
(	14	 , 'BE', 'BELGICA', 1	),
(	15	 , 'UY', 'URUGUAY', 1	),
(	16	 , 'IN', 'INDIA', 1	),
(	17	 , 'PE', 'PERU', 1	),
(	18	 , 'HK', 'HONG KONG', 1	),
(	19	 , 'DE', 'ALEMANIA', 1	),
(	20	 , 'TW', 'TAIWAN', 1	),
(	21	 , 'GR', 'GRECIA', 1	),
(	22	 , 'ID', 'INDONESIA', 1	),
(	23	 , 'PA', 'PANAMA', 1	),
(	24	 , 'CA', 'CANADA', 1	),
(	25	 , 'NL', 'HOLANDA', 1	),
(	26	 , 'PT', 'PORTUGAL', 1	),
(	27	 , 'AF', 'AFGANIST�N', 1	),
(	28	 , 'AX', 'ISLAS GLAND', 1	),
(	29	 , 'AL', 'ALBANIA', 1	),
(	30	 , 'AD', 'ANDORRA', 1	),
(	31	 , 'AO', 'ANGOLA', 1	),
(	32	 , 'AI', 'ANGUILLA', 1	),
(	33	 , 'AQ', 'ANT�RTIDA', 1	),
(	34	 , 'AG', 'ANTIGUA Y BARBUDA', 1	),
(	35	 , 'AN', 'ANTILLAS HOLANDESAS', 1	),
(	36	 , 'SA', 'ARABIA SAUD�', 1	),
(	37	 , 'DZ', 'ARGELIA', 1	),
(	38	 , 'AM', 'ARMENIA', 1	),
(	39	 , 'AW', 'ARUBA', 1	),
(	40	 , 'AU', 'AUSTRALIA', 1	),
(	41	 , 'AT', 'AUSTRIA', 1	),
(	42	 , 'AZ', 'AZERBAIY�N', 1	),
(	43	 , 'BS', 'BAHAMAS', 1	),
(	44	 , 'BH', 'BAHR�IN', 1	),
(	45	 , 'BD', 'BANGLADESH', 1	),
(	46	 , 'BB', 'BARBADOS', 1	),
(	47	 , 'BY', 'BIELORRUSIA', 1	),
(	48	 , 'BZ', 'BELICE', 1	),
(	49	 , 'BJ', 'BENIN', 1	),
(	50	 , 'BM', 'BERMUDAS', 1	),
(	51	 , 'BT', 'BHUT�N', 1	),
(	52	 , 'BO', 'BOLIVIA', 1	),
(	53	 , 'BA', 'BOSNIA Y HERZEGOVINA', 1	),
(	54	 , 'BW', 'BOTSUANA', 1	),
(	55	 , 'BV', 'ISLA BOUVET', 1	),
(	56	 , 'BN', 'BRUN�I', 1	),
(	57	 , 'BG', 'BULGARIA', 1	),
(	58	 , 'BF', 'BURKINA FASO', 1	),
(	59	 , 'BI', 'BURUNDI', 1	),
(	60	 , 'CV', 'CABO VERDE', 1	),
(	61	 , 'KY', 'ISLAS CAIM�N', 1	),
(	62	 , 'KH', 'CAMBOYA', 1	),
(	63	 , 'CM', 'CAMER�N', 1	),
(	64	 , 'CF', 'REP�BLICA CENTROAFRICANA', 1	),
(	65	 , 'TD', 'CHAD', 1	),
(	66	 , 'CZ', 'REP�BLICA CHECA', 1	),
(	67	 , 'CY', 'CHIPRE', 1	),
(	68	 , 'CX', 'ISLA DE NAVIDAD', 1	),
(	69	 , 'VA', 'CIUDAD DEL VATICANO', 1	),
(	70	 , 'CC', 'ISLAS COCOS', 1	),
(	71	 , 'KM', 'COMORAS', 1	),
(	72	 , 'CD', 'REP�BLICA DEMOCR�TICA DEL CONGO', 1	),
(	73	 , 'CG', 'CONGO', 1	),
(	74	 , 'CK', 'ISLAS COOK', 1	),
(	75	 , 'KP', 'COREA DEL NORTE', 1	),
(	76	 , 'KR', 'COREA DEL SUR', 1	),
(	77	 , 'CI', 'COSTA DE MARFIL', 1	),
(	78	 , 'CR', 'COSTA RICA', 1	),
(	79	 , 'HR', 'CROACIA', 1	),
(	80	 , 'CU', 'CUBA', 1	),
(	81	 , 'DK', 'DINAMARCA', 1	),
(	82	 , 'DM', 'DOMINICA', 1	),
(	83	 , 'DO', 'REP�BLICA DOMINICANA', 1	),
(	84	 , 'EG', 'EGIPTO', 1	),
(	85	 , 'SV', 'EL SALVADOR', 1	),
(	86	 , 'AE', 'EMIRATOS �RABES UNIDOS', 1	),
(	87	 , 'ER', 'ERITREA', 1	),
(	88	 , 'SK', 'ESLOVAQUIA', 1	),
(	89	 , 'SI', 'ESLOVENIA', 1	),
(	90	 , 'UM', 'ISLAS ULTRAMARINAS DE ESTADOS UNIDOS', 1	),
(	91	 , 'EE', 'ESTONIA', 1	),
(	92	 , 'ET', 'ETIOP�A', 1	),
(	93	 , 'GB', 'INGLATERRA', 1	),
(	94	 , 'FO', 'ISLAS FEROE', 1	),
(	95	 , 'PH', 'FILIPINAS', 1	),
(	96	 , 'FI', 'FINLANDIA', 1	),
(	97	 , 'FJ', 'FIYI', 1	),
(	98	 , 'GA', 'GAB�N', 1	),
(	99	 , 'GM', 'GAMBIA', 1	),
(	100	 , 'GE', 'GEORGIA', 1	),
(	101	 , 'GS', 'ISLAS GEORGIAS DEL SUR Y SANDWICH DEL SUR', 1	),
(	102	 , 'GH', 'GHANA', 1	),
(	103	 , 'GI', 'GIBRALTAR', 1	),
(	104	 , 'GD', 'GRANADA', 1	),
(	105	 , 'GL', 'GROENLANDIA', 1	),
(	106	 , 'GP', 'GUADALUPE', 1	),
(	107	 , 'GU', 'GUAM', 1	),
(	108	 , 'GT', 'GUATEMALA', 1	),
(	109	 , 'GF', 'GUAYANA FRANCESA', 1	),
(	110	 , 'GN', 'GUINEA', 1	),
(	111	 , 'GQ', 'GUINEA ECUATORIAL', 1	),
(	112	 , 'GW', 'GUINEA-BISSAU', 1	),
(	113	 , 'GY', 'GUYANA', 1	),
(	114	 , 'HT', 'HAIT�', 1	),
(	115	 , 'HM', 'ISLAS HEARD Y MCDONALD', 1	),
(	116	 , 'HN', 'HONDURAS', 1	),
(	117	 , 'HU', 'HUNGR�A', 1	),
(	118	 , 'IR', 'IR�N', 1	),
(	119	 , 'IQ', 'IRAQ', 1	),
(	120	 , 'IE', 'IRLANDA', 1	),
(	121	 , 'IS', 'ISLANDIA', 1	),
(	122	 , 'IL', 'ISRAEL', 1	),
(	123	 , 'JM', 'JAMAICA', 1	),
(	124	 , 'JP', 'JAP�N', 1	),
(	125	 , 'JO', 'JORDANIA', 1	),
(	126	 , 'KZ', 'KAZAJST�N', 1	),
(	127	 , 'KE', 'KENIA', 1	),
(	128	 , 'KG', 'KIRGUIST�N', 1	),
(	129	 , 'KI', 'KIRIBATI', 1	),
(	130	 , 'KW', 'KUWAIT', 1	),
(	131	 , 'LA', 'LAOS', 1	),
(	132	 , 'LS', 'LESOTHO', 1	),
(	133	 , 'LV', 'LETONIA', 1	),
(	134	 , 'LB', 'L�BANO', 1	),
(	135	 , 'LR', 'LIBERIA', 1	),
(	136	 , 'LY', 'LIBIA', 1	),
(	137	 , 'LI', 'LIECHTENSTEIN', 1	),
(	138	 , 'LT', 'LITUANIA', 1	),
(	139	 , 'LU', 'LUXEMBURGO', 1	),
(	140	 , 'MO', 'MACAO', 1	),
(	141	 , 'MK', 'ARY MACEDONIA', 1	),
(	142	 , 'MG', 'MADAGASCAR', 1	),
(	143	 , 'MY', 'MALASIA', 1	),
(	144	 , 'MW', 'MALAWI', 1	),
(	145	 , 'MV', 'MALDIVAS', 1	),
(	146	 , 'ML', 'MALI', 1	),
(	147	 , 'MT', 'MALTA', 1	),
(	148	 , 'FK', 'ISLAS MALVINAS', 1	),
(	149	 , 'MP', 'ISLAS MARIANAS DEL NORTE', 1	),
(	150	 , 'MA', 'MARRUECOS', 1	),
(	151	 , 'MH', 'ISLAS MARSHALL', 1	),
(	152	 , 'MQ', 'MARTINICA', 1	),
(	153	 , 'MU', 'MAURICIO', 1	),
(	154	 , 'MR', 'MAURITANIA', 1	),
(	155	 , 'YT', 'MAYOTTE', 1	),
(	156	 , 'MX', 'M�XICO', 1	),
(	157	 , 'FM', 'MICRONESIA', 1	),
(	158	 , 'MD', 'MOLDAVIA', 1	),
(	159	 , 'MC', 'M�NACO', 1	),
(	160	 , 'MN', 'MONGOLIA', 1	),
(	161	 , 'MS', 'MONTSERRAT', 1	),
(	162	 , 'MZ', 'MOZAMBIQUE', 1	),
(	163	 , 'MM', 'MYANMAR', 1	),
(	164	 , 'NA', 'NAMIBIA', 1	),
(	165	 , 'NR', 'NAURU', 1	),
(	166	 , 'NP', 'NEPAL', 1	),
(	167	 , 'NI', 'NICARAGUA', 1	),
(	168	 , 'NE', 'N��GER', 1	),
(	169	 , 'NG', 'NIGERIA', 1	),
(	170	 , 'NU', 'NIUE', 1	),
(	171	 , 'NF', 'ISLA NORFOLK', 1	),
(	172	 , 'NO', 'NORUEGA', 1	),
(	173	 , 'NC', 'NUEVA CALEDONIA', 1	),
(	174	 , 'NZ', 'NUEVA ZELANDA', 1	),
(	175	 , 'OM', 'OM�N', 1	),
(	176	 , 'PK', 'PAKIST�N', 1	),
(	177	 , 'PW', 'PALAU', 1	),
(	178	 , 'PS', 'PALESTINA', 1	),
(	179	 , 'PG', 'PAP�A NUEVA GUINEA', 1	),
(	180	 , 'PN', 'ISLAS PITCAIRN', 1	),
(	181	 , 'PF', 'POLINESIA FRANCESA', 1	),
(	182	 , 'PL', 'POLONIA', 1	),
(	183	 , 'PR', 'PUERTO RICO', 1	),
(	184	 , 'QA', 'QATAR', 1	),
(	185	 , 'RE', 'REUNI�N', 1	),
(	186	 , 'RW', 'RUANDA', 1	),
(	187	 , 'RO', 'RUMANIA', 1	),
(	188	 , 'RU', 'RUSIA', 1	),
(	189	 , 'EH', 'SAHARA OCCIDENTAL', 1	),
(	190	 , 'SB', 'ISLAS SALOM�N', 1	),
(	191	 , 'WS', 'SAMOA', 1	),
(	192	 , 'AS', 'SAMOA AMERICANA', 1	),
(	193	 , 'KN', 'SAN CRIST�BAL Y NEVIS', 1	),
(	194	 , 'SM', 'SAN MARINO', 1	),
(	195	 , 'PM', 'SAN PEDRO Y MIQUEL�N', 1	),
(	196	 , 'VC', 'SAN VICENTE Y LAS GRANADINAS', 1	),
(	197	 , 'SH', 'SANTA HELENA', 1	),
(	198	 , 'LC', 'SANTA LUC�A', 1	),
(	199	 , 'ST', 'SANTO TOM� Y PR�NCIPE', 1	),
(	200	 , 'SN', 'SENEGAL', 1	),
(	201	 , 'CS', 'SERBIA Y MONTENEGRO', 1	),
(	202	 , 'SC', 'SEYCHELLES', 1	),
(	203	 , 'SL', 'SIERRA LEONA', 1	),
(	204	 , 'SG', 'SINGAPUR', 1	),
(	205	 , 'SY', 'SIRIA', 1	),
(	206	 , 'SO', 'SOMALIA', 1	),
(	207	 , 'LK', 'SRI LANKA', 1	),
(	208	 , 'SZ', 'SUAZILANDIA', 1	),
(	209	 , 'ZA', 'SUD�FRICA', 1	),
(	210	 , 'SD', 'SUD�N', 1	),
(	211	 , 'SE', 'SUECIA', 1	),
(	212	 , 'CH', 'SUIZA', 1	),
(	213	 , 'SR', 'SURINAM', 1	),
(	214	 , 'SJ', 'SVALBARD Y JAN MAYEN', 1	),
(	215	 , 'TZ', 'TANZANIA', 1	),
(	216	 , 'TJ', 'TAYIKIST�N', 1	),
(	217	 , 'IO', 'TERRITORIO BRIT�NICO DEL OC�ANO �NDICO', 1	),
(	218	 , 'TF', 'TERRITORIOS AUSTRALES FRANCESES', 1	),
(	219	 , 'TL', 'TIMOR ORIENTAL', 1	),
(	220	 , 'TG', 'TOGO', 1	),
(	221	 , 'TK', 'TOKELAU', 1	),
(	222	 , 'TO', 'TONGA', 1	),
(	223	 , 'TT', 'TRINIDAD Y TOBAGO', 1	),
(	224	 , 'TN', 'T�NEZ', 1	),
(	225	 , 'TC', 'ISLAS TURCAS Y CAICOS', 1	),
(	226	 , 'TM', 'TURKMENIST�N', 1	),
(	227	 , 'TR', 'TURQU�A', 1	),
(	228	 , 'TV', 'TUVALU', 1	),
(	229	 , 'UA', 'UCRANIA', 1	),
(	230	 , 'UG', 'UGANDA', 1	),
(	231	 , 'UZ', 'UZBEKIST�N', 1	),
(	232	 , 'VU', 'VANUATU', 1	),
(	233	 , 'VE', 'VENEZUELA', 1	),
(	234	 , 'VG', 'ISLAS V�RGENES BRIT�NICAS', 1	),
(	235	 , 'VI', 'ISLAS V�RGENES DE LOS ESTADOS UNIDOS', 1	),
(	236	 , 'WF', 'WALLIS Y FUTUNA', 1	),
(	237	 , 'YE', 'YEMEN', 1	),
(	238	 , 'DJ', 'YIBUTI', 1	),
(	239	 , 'ZM', 'ZAMBIA', 1	),
(	240	 , 'ZW', 'ZIMBABUE', 1	);
	
--update Z_RAF_COUNTRY set DESCRIPTION = UPPER(DESCRIPTION);

/****** Z_RAF_STATE ******/

CREATE TABLE [dbo].[Z_RAF_STATE](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[CODE] [varchar](50) NOT NULL,
	[DESCRIPTION] [varchar](300) NOT NULL,
	[ENABLED] [bit] NOT NULL,
	[COUNTRY_ID] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Z_RAF_STATE]  WITH CHECK ADD  CONSTRAINT [FKqdcm3s301hkslbfcsr1rsjy17] FOREIGN KEY([COUNTRY_ID])
REFERENCES [dbo].[Z_RAF_COUNTRY] ([id])
GO

ALTER TABLE [dbo].[Z_RAF_STATE] CHECK CONSTRAINT [FKqdcm3s301hkslbfcsr1rsjy17]
GO



INSERT INTO Z_RAF_STATE (ENABLED, CODE, DESCRIPTION, COUNTRY_ID) VALUES 
	(1, '1','TUCUMAN',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '2','SALTA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '3','JUJUY',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '4','FORMOSA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '5','CHACO',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '6','MISIONES',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '7','SAN JUAN',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '8','MENDOZA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '9','CORRIENTES',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '10','SANTA FE',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '11','CORDOBA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '12','ENTRE RIOS',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '13','BUENOS AIRES',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '14','LA PAMPA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '17','CHUBUT',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '18','RIO NEGRO',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '19','TIERRA DEL FUEGO',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '20','SAN LUIS',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '21','LA RIOJA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '22','SGO.DEL ESTERO',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '23','CATAMARCA',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '24','NEUQU�N',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '25','SANTA CRUZ',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR')),
	(1, '99','CAPITAL FEDERAL',(SELECT country.ID FROM Z_RAF_COUNTRY country WHERE country.code='AR'));
	
--Se creará en la BD un registro 'raf08.congresos.nro.2023'	por cada año de forma automática, en desarrollo hay que insertarlo porque ya habia registros en uso
INSERT INTO Z_FDN_NUMERADOR (ID_NUMERADOR,FECHA_ALTA, FECHA_ULTIMA_MODIFICACION, OPTLOCK, CODIGO, ULTIMO_NUMERO) 
VALUES (1, GETDATE(), GETDATE(), 1, 'raf08.congresos.nro.2023', 17);

--'0029-2023'
INSERT INTO Z_FDN_NUMERADOR (ID_NUMERADOR,FECHA_ALTA, FECHA_ULTIMA_MODIFICACION, OPTLOCK, CODIGO, ULTIMO_NUMERO) 
VALUES (1, GETDATE(), GETDATE(), 1, 'raf08.congresos.nro.2023', 29);