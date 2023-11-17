package com.arquimeda.ic.fdn.boundary;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.ejb.Asynchronous;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.Part;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.slf4j.Logger;

import com.arquimeda.ic.fdn.control.TemplateManager;

@Stateless
public class MailSender{

	private static final String JNDI_MAIL_SESSION = "java:jboss/mail/schPortalSession";
	
	@Inject
	ParameterEJB parameterEjb;
	
	@Inject
	Logger logger;

	public MailSender() {

	}
	
	private Session getMailSession() {
		try {
			return (Session) new InitialContext().lookup(JNDI_MAIL_SESSION);
		} catch (NamingException e) {
			logger.warn("No se encontro configurado el servidor de correo en " +JNDI_MAIL_SESSION, e);
			return null;
		}
	}
	
	public void sendMail(String emailDestino, String subject, String templateFileName, Map<String, String> values) {

		Session mailSession = getMailSession();
		
		if (mailSession == null) {
			logger.warn("No se encontro configurado el servidor de correo. Se ignora el envio de mail destino:" + emailDestino + " subject:" + subject);
			return;
		}
		
		Message msg = new MimeMessage(mailSession);
	
		try {

			String fromAddress = parameterEjb.getParameter("portal.email.from");
			
			msg.setSubject(subject);
			msg.setRecipient(RecipientType.TO, new InternetAddress(emailDestino,emailDestino));
			msg.setFrom(new InternetAddress(fromAddress));

			TemplateManager templateManager = new TemplateManager("/com/arquimeda/portal/fdn/email/templates", templateFileName);
			String mensaje = templateManager.applyTemplate(values);

			// This HTML mail have to 2 part, the BODY and the embedded image
			MimeMultipart multipart = new MimeMultipart("related");

			// first part  (the html)
			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(mensaje, "text/html");

			// add it
			multipart.addBodyPart(messageBodyPart);

			// put everything together
			msg.setContent(multipart);

			Transport.send(msg);

		}catch(Exception e) {
			throw new RuntimeException(e);
		}  
	}
	
	@Asynchronous
	public void asyncSendMail(String emailDestino, String subject, String templateFileName, Map<String, String> values) {
		sendMail(emailDestino,subject,templateFileName,values);
	}
	
	@Asynchronous
	public void sendMailWithAttachment(String subject, String templateFileName, byte[] bytes, Map<String, String> values) {

		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String fileName = values.get("nroFactura") + "_" + simpleDateFormat.format(new Date()) + ".pdf";
		
		String emailDestino = parameterEjb.getParameter("portal.factura.wini.email");
		
		Session mailSession = getMailSession();
		
		if (mailSession == null) {
			logger.warn("No se encontro configurado el servidor de correo. Se ignora el envio de mail destino:" + emailDestino + " subject:" + subject);
			return;
		}
		
		Message msg = new MimeMessage(mailSession);

		try {

			String fromAddress = parameterEjb.getParameter("portal.email.from");
			
			msg.setSubject(subject);
			msg.setRecipient(RecipientType.TO, new InternetAddress(emailDestino,emailDestino));
			msg.setFrom(new InternetAddress(fromAddress));

			TemplateManager templateManager = new TemplateManager("/com/arquimeda/portal/fdn/email/templates", templateFileName);
			String mensaje = templateManager.applyTemplate(values);

			// This HTML mail have to 2 part, the BODY and the embedded image
			//
			MimeMultipart multipart = new MimeMultipart("related");

			// first part  (the html)
			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setContent(mensaje, "text/html");

			// add it
			multipart.addBodyPart(messageBodyPart);

			//Adjunto
			messageBodyPart = new MimeBodyPart();
			DataSource attachment = new ByteArrayDataSource(bytes,"application/pdf");
			messageBodyPart.setDataHandler(new DataHandler(attachment));
			messageBodyPart.setFileName(fileName);
			messageBodyPart.setDisposition(Part.ATTACHMENT);
			multipart.addBodyPart(messageBodyPart);

			// put everything together
			msg.setContent(multipart);

			Transport.send(msg);

		}catch(Exception e) {
			throw new RuntimeException(e);
		}  
	}

}
