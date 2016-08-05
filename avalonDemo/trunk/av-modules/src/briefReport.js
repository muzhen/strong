define(["avalon", "jquery", "JsUtil", 'css!bootstrap.css', 'css!briefReport.css'], function (avalon, $, JsUtil) {
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
            // warn.setINT();//调用setINT刷新模块，初始数据
            return vm;
        },


        tableVm: function () {
            var vm = avalon.define({
                $id: table.options.clid,
                weatherForecast: " "//天气预告
            });
            table.options.tableVm = vm;
            return vm;

        },

        //getdata 数据模块,初始化table数据
        getdata: function (options) {

            //天气预告
            $.get(options.data.weather, function (result) {
                options.tableVm.weatherForecast = result.data.contents;
            });

        }

    }
    return table;
});
