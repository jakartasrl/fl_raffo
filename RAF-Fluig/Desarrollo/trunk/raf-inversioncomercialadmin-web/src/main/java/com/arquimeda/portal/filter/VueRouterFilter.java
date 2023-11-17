package com.arquimeda.portal.filter;

import java.io.IOException;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter(
		filterName="/VueRouterFilter",
		urlPatterns={"/*"},
		dispatcherTypes={DispatcherType.REQUEST}
)
public class VueRouterFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String url = null;

		// Siempre se atiende con el index.html de vue
		if (request instanceof HttpServletRequest) {
			url = ((HttpServletRequest)request).getRequestURI();
		}

		if (isVueRouterUrl(url)) {
			request.getRequestDispatcher("/index.html").forward(request, response);
		} else {
			chain.doFilter(request, response);
		}


	}

	private boolean isVueRouterUrl(String url) {
		// si NO tiene un "." (ej: index.html, .png, .js, etc
		// asumimos que es una url con parametros
		return url != null && url.indexOf(".") == -1;
	}

	@Override
	public void destroy() {

	}


}
