
require.config({
    baseUrl:"../av-modules",
    paths:{
        "jquery": "Jquery/1.11.1/jquery-1.11.1.min",
        "avalon": "avalon/1.5.5/avalon.mobile.shim",
        "bootstrap": "bootstrap/3.3.4/bootstrap.min",
        "multipleDescription":'src/multipleDescription',
        "imgShowSrc":'multipleDescription/0.1.0/static/img/sea',
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
