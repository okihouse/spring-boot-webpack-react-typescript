package com.okihouse.interceptor;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.fasterxml.jackson.core.type.TypeReference;

public class Interceptor extends HandlerInterceptorAdapter {

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		Resource resource = new ClassPathResource("dist/manifest.json");
		if(resource.exists()) {
			ObjectMapper objectMapper = new ObjectMapper();
			HashMap<String, String> manifests = objectMapper.readValue(resource.getFile(), new TypeReference<HashMap<String, String>>(){});
			
			manifests.forEach((k, v) -> {
				modelAndView.addObject(k, v);
			});
		}
		
		super.postHandle(request, response, handler, modelAndView);
	}

}
