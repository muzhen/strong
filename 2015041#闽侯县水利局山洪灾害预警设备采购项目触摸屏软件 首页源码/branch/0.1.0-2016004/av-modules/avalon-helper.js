
require.config({
    baseUrl:"../av-modules",
    paths:{
        jquery:'Jquery/1.10.1/jquery',
        jq:'Jquery/1.10.1/jquery-1.9.1.min',
        js:'Jquery/1.10.1/JsUtil',
        avalon:'avalon/avalon',
        mmPromise:'avalon/mmPromise',
        bootstrap:'bootstrap/js/bootstrap.min',
        homePage:'src/homePage',
        Swiper:'swiper/js/swiper.min',
        mmRequest:'avalon/mmRequest'
    },
    shim: {
        jquery: {
            exports: "jQuery"
        },
        Swiper: {
            exports: "Swiper"
        },
         bootstrap: {
            exports: "bootstrap"
        },
        avalon:{
            exports:"avalon"
        },
        js:{
            exports:"js"
        },
        jq:{
              exports:"jq"
        }
    },
    map:{
        "*":{
            "css":"css"
        }
    }
});