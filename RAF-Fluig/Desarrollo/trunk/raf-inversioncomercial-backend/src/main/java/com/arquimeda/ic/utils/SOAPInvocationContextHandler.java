package com.arquimeda.ic.utils;

import java.io.ByteArrayOutputStream;
import java.util.Set;

import javax.xml.namespace.QName;
import javax.xml.soap.SOAPMessage;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;

public class SOAPInvocationContextHandler implements SOAPHandler<SOAPMessageContext> {

	protected static ThreadLocal<SOAPInvocationContext> context = ThreadLocal.withInitial(() -> new SOAPInvocationContext());
	
	public static SOAPInvocationContext get() {
		return context.get();
	}

	public SOAPInvocationContextHandler() {
	}

	public Set<QName> getHeaders() {
        return null;
    }

    public boolean handleMessage(SOAPMessageContext smc) {
        saveMessageToInvocationContext(smc);
        return true;
    }

    public boolean handleFault(SOAPMessageContext smc) {
        saveMessageToInvocationContext(smc);
        return true;
    }

    public void close(MessageContext messageContext) {
    }

    private void saveMessageToInvocationContext(SOAPMessageContext smc) {
    	
    	ByteArrayOutputStream out = new ByteArrayOutputStream();
    	
        Boolean outboundProperty = (Boolean) smc.get (MessageContext.MESSAGE_OUTBOUND_PROPERTY);

        SOAPMessage message = smc.getMessage();
        
        try {
            message.writeTo(out);
            if (outboundProperty.booleanValue()) {
            	// Mensaje salida -> limpio el contexto
            	context.remove();
            	get().setOutboundMessage(out.toString());
            } else {
            	get().setInboundMessage(out.toString());
            }
        } catch (Exception e) {
        	e.printStackTrace();
        }
    }
}