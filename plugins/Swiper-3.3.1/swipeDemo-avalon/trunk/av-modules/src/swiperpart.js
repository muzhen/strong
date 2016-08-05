define(["avalon", "jquery", "JsUtil","swiper", 'css!bootstrap.css', 'css!swiper.css', 'css!swiperpart.css'], function (avalon, $, JsUtil) {

    var swiperwrap = {
        options: {
            clid: "",
            swiperwrapVm: {}
        },

        // 初始化数据
        init: function (options) {
            swiperwrap.options = $.extend(swiperwrap.options, options);//传进来的参数和自己定义的参数
            var vm = swiperwrap.swiperpart();//swiperpart
            swiperwrap.getdata(swiperwrap.options);//调用getdata 数据模块，获得数据
            // warn.setINT();//调用setINT刷新模块，初始数据
            return vm;
        },


        swiperpart: function () {
            var vm = avalon.define({
                $id: swiperwrap.options.clid,
                imgdata:[],
                imgpart:require.toUrl('swiperpart'),
                slideImgFn:function(){
                    var swiperss = new Swiper('.swiper-container');
                 //   console.log(swiperss);
                }

            });
            swiperwrap.options.swiperpart = vm;
            return vm;

        },

        //getdata 数据模块
        getdata: function (options) {

            //测试
            $.get(options.data.imgtest, function (result) {
                options.swiperpart.imgdata = result.data;
            });

        }

    }
    return swiperwrap;
});
