
require.config({
    baseUrl: "../av-modules",
    paths: {
        "jquery": "Jquery/1.11.1/jquery-1.11.1.min",
        "avalon": "avalon/1.5.5/avalon.mobile.shim",
        "JsUtil": "utility/0.1.0/JsUtil",
        "swiper": "swiper/3.3.1/swiper.min",
        "bootstrap": "bootstrap/3.3.4/bootstrap.min",
        "flexible":"flexible/0.1.0/flexible",
        "flexible_Css":"flexible/0.1.0/flexible_css",
		"imageView":"imageView/0.1.1/imageView",
        "imageList":"imageList/0.1.0/imageList",
		//"imageListPaper":"imageList_paper/0.1.0/imageList",
		"multipleDescription":"multipleDescription/0.1.0/multipleDescription",
		    
        "titleTxt":"titleTxt/0.1.0/titleTxt",
		"waterList":"waterList/0.1.0/waterList",
		"rainList":"rainList/0.1.0/rainList",
		"area":"area/0.1.0/area",
		"homePage":"homePage/0.1.0/homePage",
		"hammer": "hammer/0.1.0/hammer",
		//"AreaData":'area/0.1.0/AreaData_min',
        "chartTable":"chartTable/0.1.0/chartTable",
		"search":"search/0.1.0/search",
        "highstock": "Highstock/4.2.3/highstock.src",
        "mobiscroll":"mobiscroll/2.17.1/mobiscroll",
        "exporting": "Highstock/4.2.3/exporting"
    },
    map:{
        "*":{
            "css":"css"
        }
    },
    shim: {

        "jquery": {
            exports: "jQuery"
        },
        "avalon": {
            exports: "avalon"
        },
        "bootstrap": {
            deps: ['jquery']
        },
        "highstock": {
            deps: ['jquery'],
            exports: "Highcharts"
        },
		"hammer":
        {
            exports: "hammer"
        },
        "exporting": {
            deps: ['jquery','highstock'],
            exports: "exporting"
        },
        "mobiscroll":{
            deps: ['jquery'],
            exports:"Mobiscroll"
        },
        "swiper": {
            deps: ['jquery'],
            exports: "swiper"
        },
        "JsUtil": {
            deps: ['jquery'],
            exports: "JsUtil"
        }
    }
});