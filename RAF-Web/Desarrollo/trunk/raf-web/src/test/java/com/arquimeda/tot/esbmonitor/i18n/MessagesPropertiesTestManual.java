package com.arquimeda.tot.esbmonitor.i18n;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.SortedMap;
import java.util.TreeMap;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.slf4j.Logger;

@RunWith(value=MockitoJUnitRunner.class)
public class MessagesPropertiesTestManual {

	public final static String CONFIG_FILE_NAME = "./src/main/resources/i18n/messages.properties";

	@Mock
	Logger logger; 

	@Test
	public void leerMessagesProperties(){

		try {
			FileReader fileReader = new FileReader(CONFIG_FILE_NAME); 
			BufferedReader bufferedReader = new BufferedReader(fileReader); 

			SortedMap<String, String> treeMap = new TreeMap<String, String>();
			
			validarProperties(bufferedReader, treeMap); 
			
			bufferedReader.close();

			FileOutputStream fileOutputStream = new FileOutputStream(CONFIG_FILE_NAME, false);
			String classNameAnterior = null;

			for (Object object : treeMap.entrySet()) {

				String className = getClassName(object);

				if(classNameAnterior == null || !classNameAnterior.equals(className)){

					fileOutputStream.write(("\n" + "# " + className + "\n\n").getBytes());

					classNameAnterior = className;
				}
				fileOutputStream.write((object.toString() + "\n").getBytes());

			}

			fileOutputStream.flush();
			fileOutputStream.close();


		} catch (FileNotFoundException e) {
			logger.error("El archivo no existe en la ruta especificada");
		} catch (IOException e) {
			logger.error(" No se puede leer el archivo desde la ruta especificada");
		}

	}

	private void validarProperties(BufferedReader bufferedReader,SortedMap<String, String> treeMap) throws IOException {
		
		String line;
		int nroLinea = 1;

		while((line = bufferedReader.readLine()) != null) { 

			if(!line.trim().equals("") && line.trim().charAt(0) != '#'){

				String[] split = line.split("=");
				String key = split[0];
				String value = "";
				
				if(split.length > 1){
					value = split[1];
				}else{
					Assert.fail("Falta agregar el value a la key en la linea " + nroLinea);
				}

				if(!treeMap.containsKey(key)){
					treeMap.put(key, value);
				}else{
					Assert.fail("La key en la linea " + nroLinea + " esta duplicada: " + key);
				}

			}

			nroLinea++;

		}
	}

	private String getClassName(Object line) {

		String[] split = line.toString().split("\\.");

		for (int i = 0; i < split.length ; i++){
			if (Character.isUpperCase(split[i].charAt(0))) {
				return split[i];
			}
		}
		return null;
	}

}

