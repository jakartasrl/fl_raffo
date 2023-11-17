package com.arquimeda.ic.fdn.control;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;


public class TemplateManager {

	private String templateFileName;
	private File templateDirectory;

	private Configuration configuration;
	
	
	public TemplateManager(String templateFileName) {
		this.templateFileName=templateFileName;
		configuration = new Configuration();
	}
	
	
	public TemplateManager(String templateDir, String templateFileName) {
		configuration = new Configuration();
		try {
			this.templateFileName = templateFileName;
		
			configuration = new Configuration();
			templateDirectory = new File(getTemplateDirectory(templateDir, templateFileName));
			configuration.setDirectoryForTemplateLoading(templateDirectory);

		} catch (Exception e) {
			throw new RuntimeException("Error iniciando configurador de template", e);
		}
	}


	public String getTemplateDirectory(String templateDir, String templateFileName) {
        InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(templateDir + "/" + templateFileName);
        try {
            Field f = inputStream.getClass().getDeclaredField("path");
            f.setAccessible(true);
            String path = (String)f.get(inputStream);
            return path.substring(0, path.length() - templateFileName.length());
        }
        catch (Exception e) {
            throw new RuntimeException("Se produjo un error al obtener el path para el envio de mail. ", e);
        }
    }
	
	public String applyTemplate(Object dataModel) {

		try {

			Template template = configuration.getTemplate(templateFileName);

			File file = File.createTempFile("temp", ".txt");
			Writer out = new OutputStreamWriter(new FileOutputStream(file));

			template.process(dataModel, out);
			out.flush();
			
			StringBuffer buffer = new StringBuffer();
			FileInputStream fis = new FileInputStream(file);
			InputStreamReader isr = new InputStreamReader(fis, "UTF8");
			Reader in = new BufferedReader(isr);
			int ch;
			while ((ch = in.read()) > -1) {
				buffer.append((char) ch);
			}
			in.close();
			
			return buffer.toString();

		} catch (Exception e) {
			throw new RuntimeException("Error aplicando template " + templateFileName, e);
		}
		
	}

}
