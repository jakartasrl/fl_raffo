package com.arquimeda.ic.utils;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfImportedPage;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;
import com.lowagie.text.pdf.PdfWriter;

public class PDFUtils {

	public static void concatenar(List<InputStream> inputPdfList, OutputStream outputStream) throws Exception{

		//Create document and pdfReader objects.
		Document document = new Document();
		List<PdfReader> readers = new ArrayList<PdfReader>();
		int totalPages = 0;

		//Create pdf Iterator object using inputPdfList.
		Iterator<InputStream> pdfIterator = inputPdfList.iterator();

		// Create reader list for the input pdf files.
		while (pdfIterator.hasNext()) {
			InputStream pdf = pdfIterator.next();
			PdfReader pdfReader = new PdfReader(pdf);

			Field f = pdfReader.getClass().getDeclaredField("encrypted");
			f.setAccessible(true);
			f.set(pdfReader, false);


			readers.add(pdfReader);
			totalPages = totalPages + pdfReader.getNumberOfPages();
		}

		// Create writer for the outputStream
		PdfWriter writer = PdfWriter.getInstance(document, outputStream);

		//Open document.
		document.open();

		//Contain the pdf data.
		PdfContentByte pageContentByte = writer.getDirectContent();

		PdfImportedPage pdfImportedPage;
		int currentPdfReaderPage = 1;
		Iterator<PdfReader> iteratorPDFReader = readers.iterator();

		// Iterate and process the reader list.
		while (iteratorPDFReader.hasNext()) {
			PdfReader pdfReader = iteratorPDFReader.next();

			Field f = pdfReader.getClass().getDeclaredField("encrypted");
			f.setAccessible(true);
			f.set(pdfReader, false);

			//Create page and add content.
			while (currentPdfReaderPage <= pdfReader.getNumberOfPages()) {
				
				pdfImportedPage = writer.getImportedPage(pdfReader,currentPdfReaderPage);
				document.setPageSize(pdfImportedPage.getBoundingBox());
				document.newPage();
	
				pdfImportedPage = writer.getImportedPage(
						pdfReader,currentPdfReaderPage);
				pageContentByte.addTemplate(pdfImportedPage, 0, 0);
				currentPdfReaderPage++;
			}
			currentPdfReaderPage = 1;
		}

		//Close document and outputStream.
		outputStream.flush();
		document.close();
		outputStream.close();

	}	

	public static void reimprimir(InputStream inputStream, OutputStream outputStream) throws Exception{

		//Create document and pdfReader objects.
		Document document = new Document();
		
		int totalPages = 0;

		PdfReader pdfReader = new PdfReader(inputStream);
						
		Field f = pdfReader.getClass().getDeclaredField("encrypted");
		f.setAccessible(true);
		f.set(pdfReader, false);
		
		totalPages = totalPages + pdfReader.getNumberOfPages();

		// Create writer for the outputStream
		PdfWriter writer = PdfWriter.getInstance(document, outputStream);

		//Open document.
		document.open();

		//Contain the pdf data.
		PdfContentByte pageContentByte = writer.getDirectContent();

		PdfImportedPage pdfImportedPage;
		int currentPdfReaderPage = 1;

		//Create page and add content.
		while (currentPdfReaderPage <= pdfReader.getNumberOfPages()) {
			pdfImportedPage = writer.getImportedPage(pdfReader,currentPdfReaderPage);
			document.setPageSize(pdfImportedPage.getBoundingBox());
			document.newPage();
			pageContentByte.addTemplate(pdfImportedPage, 0, 0);
			currentPdfReaderPage++;
		}

		//Close document and outputStream.
		outputStream.flush();
		document.close();
		outputStream.close();

	}	

	public static void estamparTexto(String texto, InputStream inputStream, OutputStream outputStream) throws Exception {

		PdfReader pdfReader = new PdfReader(inputStream);
		PdfStamper pdfStamper = new PdfStamper(pdfReader,outputStream);

		//			//Salida con clave de seguridad
		//			pdfStamper.setEncryption(null,"password".getBytes(),(PdfWriter.ALLOW_PRINTING|PdfWriter.ALLOW_COPY|PdfWriter.ALLOW_SCREENREADERS|PdfWriter.ALLOW_MODIFY_ANNOTATIONS|PdfWriter.ALLOW_FILL_IN), PdfWriter.STRENGTH128BITS);

		float altoPagina = 0;
		float anchoPagina = 0;

		//Por cada una de las páginas
		for(int i=1; i<= pdfReader.getNumberOfPages(); i++){

			PdfContentByte content = pdfStamper.getOverContent(i);

			//Comprobamos si la página está en vertical o en horizontal
			if((pdfReader.getPageRotation(i)==0)||(pdfReader.getPageRotation(i)==180)){

				altoPagina = pdfReader.getPageSize(i).getHeight();
				anchoPagina = pdfReader.getPageSize(i).getWidth();

			}else{

				altoPagina = pdfReader.getPageSize(i).getWidth();
				anchoPagina = pdfReader.getPageSize(i).getHeight();
			}

			Phrase frase = new Phrase(texto, FontFactory.getFont(BaseFont.HELVETICA, 10));
			ColumnText.showTextAligned(content, Element.ALIGN_LEFT, frase, 30, 30, 0);

		}

		pdfStamper.setFormFlattening(true);

		pdfStamper.close();

	}

	public static void estamparTabla(PdfPTable table, int rows, InputStream inputStream, OutputStream outputStream) throws DocumentException, IOException {

		PdfReader reader = new PdfReader(inputStream);
		PdfStamper stamper = new PdfStamper(reader, outputStream);

		//Por cada una de las páginas
		for(int i=1; i<= reader.getNumberOfPages(); i++){
			ColumnText column = new ColumnText(stamper.getOverContent(i));
			float anchoPagina = reader.getPageSize(i).getWidth();
			column.setSimpleColumn(0, 0, anchoPagina, 20*rows);
			column.addElement(table);
			column.go();
		}
		
		stamper.setFormFlattening(true);
		stamper.close();
		reader.close();

	}

	public static void estamparTablaEnNuevoPdf(PdfPTable table, FileOutputStream fileOutputStream) throws DocumentException, IOException {
		
		Document document = new Document(PageSize.A4, 30, 30, 50, 50);
		PdfWriter.getInstance(document, fileOutputStream);
		document.open();
		document.add(table);
		document.close();
		fileOutputStream.close();
	}

	public static void estamparImagen(byte[] imageByte, FileInputStream inputStream, FileOutputStream outputStream) throws IOException, DocumentException {
	
		PdfReader pdfReader = new PdfReader(inputStream);
		PdfStamper pdfStamper = new PdfStamper(pdfReader,outputStream);

		//Por cada una de las páginas
		for(int i=1; i<= pdfReader.getNumberOfPages(); i++){

			PdfContentByte content = pdfStamper.getOverContent(i);

			Image pdfImage = Image.getInstance(imageByte);
			pdfImage.setAbsolutePosition(50, 50);
//					
//			Phrase frase = new Phrase(texto, FontFactory.getFont(BaseFont.HELVETICA, 10));
//			ColumnText.showTextAligned(content, Element.ALIGN_LEFT, frase, 30, 30, 0);
			
			content.addImage(pdfImage);
			
		}

		pdfStamper.setFormFlattening(true);

		pdfStamper.close();
		
	}

}
