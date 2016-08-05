define(["avalon", "jquery", "JsUtil", "swiper", 'css!bootstrap.css', 'css!swiper.css', 'css!swiperpart.css'], function (avalon, $, JsUtil) {

    var table = {
        options: {
            clid: "",
            tableVm: {}
        },

        // 初始化数据
        init: function (options) {
            table.options = $.extend(table.options, options);//传进来的参数和自己定义的参数
            var vm = table.tableVm();//调用tableVm模块
            table.getdata(table.options);//调用getdata 数据模块，获得数据
            return vm;
        },


        tableVm: function () {
            var vm = avalon.define({
                $id: table.options.clid,
                imgdata: [],//存放图片名称
                clouddata: [],//存放云图名称
                radardata: [],//存放雷达图名称
                imgpart: require.toUrl('swiperpart'),//图片路径
                //tabs:["雷达图","云图","台风路径"],//页签标题
                tabs: [
                    {
                        "name": "雷达图",
                        "icon": "01.png"
                    },
                    {
                        "name": "云图",
                        "icon": "02.png"
                    },
                    {
                        "name": "台风路径",
                        "icon": "03.png"
                    },
                ],//页签标题
                slideImgFn: function () {//图片加载后触发swiper事件
                    var swiperss = new Swiper('.radar');
                    $(".ms-tabs").height($(document).height() - $("footer").height() );
                    vm.toggle(0);
                },
                slideImgFn1: function () {//图片加载后触发swiper事件
                    var swiperss = new Swiper('.cloud');
                    $(".ms-tabs").height($(document).height() - $("footer").height() );
                    //  vm.toggle(0);
                },
                currentIndex: 0,

                toggle: function (index) {//点击切换
                    vm.currentIndex = index;
                    var sd = $("footer >div:eq(" + index + ")");
                    sd.siblings().removeClass("active");
                    sd.addClass("active");
                    /*
                     var imgpath = sd.find("img").attr("src");
                     var activeimg = imgpath.replace("-1", "-2");
                     sd.find("img").attr("src", activeimg); */
                
                },
            });
            table.options.tableVm = vm;
            return vm;

        },

        //getdata 数据模块,初始化table数据
        getdata: function (options) {
            //测试
            $.get(options.data.imgtest, function (result) {
                options.tableVm.imgdata = result.data;
            });
            //雷达图
            $.get(options.data.imgradar, function (result) {
                options.tableVm.radardata = result.data;
            });
            //云图
            $.get(options.data.imgcloud, function (result) {
                options.tableVm.clouddata = result.data;
            });

        }

    }
    return table;
});
