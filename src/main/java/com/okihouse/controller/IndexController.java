package com.okihouse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by okihouse16 on 2018. 1. 30..
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {
	
    @RequestMapping(method = RequestMethod.GET)
    public String index() {
        return "index";
    }
}
