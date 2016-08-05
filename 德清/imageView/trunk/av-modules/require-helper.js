require.config({
    baseUrl:"../av-modules",
    paths:{
        "jquery": "Jquery/1.11.1/jquery-1.11.1.min",
        "avalon": "avalon/1.5.5/avalon.mobile.shim",
        "bootstrap": "bootstrap/3.3.4/bootstrap.min",
        "swiper": "swiper/3.3.1/swiper.min",
        "swiperpart":'src/swiperpart',
        "JsUtil": "myjs/JsUtil"
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
        "swiper": {
            deps: ['jquery'],
            exports: "swiper"
        },
        "JsUtil": {
            deps: ['jquery'],
            exports: "JsUtil"
        }
    },
    map:{
        "*":{
            "css":"css"
        }
    }
});
