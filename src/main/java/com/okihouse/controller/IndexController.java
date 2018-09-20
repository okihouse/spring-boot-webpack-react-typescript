package com.okihouse.controller;

import org.springframework.ui.Model;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by okihouse16 on 2018. 1. 30..
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {

    @Autowired
	private Environment environment;

    @RequestMapping(method = RequestMethod.GET)
    public String index(Model model) {
        boolean isProduction = environment.acceptsProfiles("production");
        model.addAttribute("isProduction", isProduction);

        return "index";
    }
}
