/**
 * Created with JetBrains WebStorm.
 * User: strong
 * Date: 16-4-13
 * Time: 下午2:42
 * To change this template use File | Settings | File Templates.
 */

define(["avalon", "jquery", "swiper","highstock","exporting","mobiscroll","JsUtil","css!swiper.css","css!mobiscroll.css","css!bootstrap.css","css!chartTable.css"], function (avalon, $, swiper,highstock,exporting,mobiscroll) {

    var charDT=[
        [Date.UTC(2016,2,16,8),140],
        [Date.UTC(2016,2,16,9),141],
        [Date.UTC(2016,2,16,10),142],
        [Date.UTC(2016,2,16,11),131],
        [Date.UTC(2016,2,16,12),132],
        [Date.UTC(2016,2,16,13),133],
        [Date.UTC(2016,2,16,14),135],
        [Date.UTC(2016,2,16,15),138],
        [Date.UTC(2016,2,16,16),132],
        [Date.UTC(2016,2,16,17),133],
        [Date.UTC(2016,2,16,18),135],
        [Date.UTC(2016,2,16,19),138],
        [Date.UTC(2016,2,16,20),138],
        [Date.UTC(2016,2,16,21),132],
        [Date.UTC(2016,2,16,22),133],
        [Date.UTC(2016,2,16,23),135],
        [Date.UTC(2016,2,17,6),138],
        [Date.UTC(2016,2,17,7),138],
        [Date.UTC(2016,2,17,8),141],
        [Date.UTC(2016,2,18,8),142],
        [Date.UTC(2016,2,19,8),131],
        [Date.UTC(2016,2,20,8),132],
        [Date.UTC(2016,2,21,8),133],
        [Date.UTC(2016,2,22,8),135],
        [Date.UTC(2016,2,23,8),138],
        [Date.UTC(2016,2,24,8),132],
        [Date.UTC(2016,2,25,8),133],
        [Date.UTC(2016,2,26,8),135],
        [Date.UTC(2016,2,27,8),138],

        [Date.UTC(2016,2,28,8),132],
        [Date.UTC(2016,2,29,8),133],
        [Date.UTC(2016,2,30,8),135],
        [Date.UTC(2016,2,31,8),138],
        [Date.UTC(2016,3,1,8),138],
        [Date.UTC(2016,3,2,8),135],
        [Date.UTC(2016,3,3,8),138],
        [Date.UTC(2016,3,4,8),132],
        [Date.UTC(2016,3,5,8),133],
        [Date.UTC(2016,3,6,8),135],
        [Date.UTC(2016,3,7,8),138],
        [Date.UTC(2016,3,8,8),138],
        [Date.UTC(2016,3,9,8),132],
        [Date.UTC(2016,3,10,8),133],
        [Date.UTC(2016,3,11,8),135],
        [Date.UTC(2016,3,12,8),138],
        [Date.UTC(2016,3,13,8),138] ,
        [Date.UTC(2016,3,14,8),132],
        [Date.UTC(2016,3,15,8),133],
        [Date.UTC(2016,3,16,8),135],
        [Date.UTC(2016,3,17,8),138],
        [Date.UTC(2016,3,18,8),138],
        [Date.UTC(2016,3,19,8),132],
        [Date.UTC(2016,3,20,8),133],
        [Date.UTC(2016,3,21,8),135],
        [Date.UTC(2016,3,22,8),138],
        [Date.UTC(2016,3,23,8),138]
    ];
    var tableDT=[
        {tm:"2016-3-14 08:00:00",rz:140,w:5},
        {tm:"2016-3-14 09:00:00",rz:141,w:5},
        {tm:"2016-3-15 10:00:00",rz:142,w:5},
        {tm:"2016-3-15 11:00:00",rz:131,w:5},
        {tm:"2016-3-15 12:00:00",rz:132,w:5},
        {tm:"2016-3-16 13:00:00",rz:133,w:5},
        {tm:"2016-3-16 14:00:00",rz:135,w:5},
        {tm:"2016-3-16 15:00:00",rz:138,w:5},
    ];

    var waterCurrent={z:"145",w:"5",fsltdz:"123",fsltdw:"122"};

    var chartTable = {
        //该模块的基本参数
        options: {
            clid:"",
            url:"",   //请求接口的路径
            urlType:{},//请求接口的各个类型
            chartTableVm: {},
            chartOptions:{type:"",name:""},//报图类型
            currentDK:{chart:"",info:""},
            //tableColumnHead:[{date:"时间",w:"水位"}],//["data","w"],
            tableColumn:["data","w"],
            tableHead:["时间","水位"],
            isShowDetail:true      //是否显示当前详细数据模块
        },
        //初始化该模块所必需的参数，以及返回该模块的vm对象
        init: function (options) {
            chartTable.options=$.extend(chartTable.options,options);
            return chartTable.chartTableVm();
        },
        //该模块的请求数据
        getDataTest:function(option){
            var urlType=chartTable.options.urlType;
            var vm=chartTable.options.chartTableVm;
            var now=new Date();
            var etm=now.format("yyyy-MM-dd HH:mm:ss");
            var btm=__DataUtil.dateAdd(now,"d",-3).format("yyyy-MM-dd HH:mm:ss");
            if(option["btm"]){
                btm =option["btm"];
                etm =option["etm"];
            }
            var parms={stcd:"",time:"["+btm.replace(' ','T')+","+etm.replace(' ','T')+"]"};
            //时间标题的数据绑定
            vm.currentDate={btm:btm,etm:etm};
            for(var key in urlType){
                var url= chartTable.options.url;//+"?";
                switch (key){
                    case "chart":   //报图表格数据接口
                        parms["stcd"]= __JsUtil.GetQuery("stcd")||"80617300";
                        $.getJSON(url+urlType[key],parms,chartTable.bindChartTable);
                        //测试
                        //chartTable.bindChartTable({data:[]});
                        break;
                    case "info":   //详细数据接口
                        parms["stcd"]= __JsUtil.GetQuery("stcd")||"80607800";
                        $.getJSON(url+urlType[key],parms,chartTable.bindDetailInfo);
                        //测试
                        //chartTable.bindDetailInfo({data:[]});
                        break
                    default:
                        break;
                }
            }

        },
        //报图和表格的数据绑定
        bindChartTable:function(result){
            var vm=chartTable.options.chartTableVm;
            // ctvm的数据绑定
            //titile绑定
            vm.title=decodeURI(__JsUtil.GetQuery("stnm"))||"青年";
            //var chartData=报图数据绑定 b
            var cd=chartTable.chartDataDt(result["data"]);
            vm.chartData= cd.length>0? cd:charDT;
            //table数据绑定
            vm.tableData=result["data"].length>0 ? result["data"]:tableDT;
            //获得数据时获得前5条记录
            vm.currenCount=0;
            //初始化时默认加载前五条记录
            vm.loadData();
            avalon.scan();
        },
        //报图数据的规范整理，返回符合报图绑定的数据
        chartDataDt:function(data){
            var charKey=chartTable.options.chartTableVm.chartColumn;
            var resultData=[];
            for(var i in data){
                var cur=data[i][charKey[0]].toDate();
                var x= Date.UTC(cur.getFullYear(),cur.getMonth(),cur.getDate(),cur.getHours(),cur.getMinutes(),cur.getMinutes(),0);
                var arr=[x,data[i][charKey[1]]];
                resultData.unshift(arr);
            }
            return resultData;
        },
        //绑定详细数据的数据初始化
        bindDetailInfo:function(result){
            var vm=chartTable.options.chartTableVm;

            vm.currentData=result.data.length>0? result.data[0]:waterCurrent;
            //avalon.log(result.data[0]);
        },
        //该模块的生成vm方法
        chartTableVm: function () {
            var ctvm = avalon.define({
                $id: chartTable.options.clid,
                $skipArray: ["tableData"],
                isShowDetail:chartTable.options.isShowDetail,
                currenCount: 0,  //当前第几次数据 （表格数据使用）
                currentIndex: 5,//1次显示数据条数   （表格数据使用）
                isFinish: false,//是否已展示出全部数据   （表格数据使用）
                title: "",
                tableColumn:chartTable.options.tableColumn,
                tableHead:chartTable.options.tableHead,
                currentDate: {},
                currentDK:chartTable.options.currentDK,
                currentData: {},
                chartColumn: chartTable.options.chartColumn,
                chartData: [],
                curTableData: [],
                tableData: [],
                renderVm: function () {
                    //初始化请求数据
                    chartTable.getDataTest({btm:"2016-03-15 08:00:00",etm:"2016-04-15 08:00:00"});
                },
                //表格中的按钮点击的数据加载
                loadData: function () {
                    var td=ctvm.tableData;
                    ctvm.$fire("chartTable-loadData", td);
                },
                //报图初始化
                highStockInit:function(){
                    highstock.setOptions({
                        lang:{
                            months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月',  '十月','十一月', '十二月'],
                            shortMonths:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月',  '十月','十一月', '十二月'],
                            weekdays:['星期日',  '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
							rangeSelectorZoom:'日期:'
							
                        }
                    });
                    var stockChart=$('#chartTable').highcharts('StockChart', {
                        rangeSelector: {
                            buttons: [{//定义一组buttons,下标从0开始
                                type: 'day',
                                count: 1,
                                text: '1天'
                            },{
                                type: 'day',
                                count: 3,
                                text: '3天'
                            },{
                                type: 'day',
                                count: 7,
                                text: '7天'
                            },{
                                type: 'month',
                                count: 1,
                                text: '1月'
                            }],
                            buttonTheme: {
                                width: 36,
                                height: 16,
                                padding: 1,
								fontSize:12,
                                r: 0,
                                stroke: '#68A',
                                zIndex: 7
                            },
                            inputEnabled: false,
                            selected: 1//表示以上定义button的index,从0开始
                        },
                        exporting:{
                           enabled:false
                        },
                        title : {
                            text : ''
                        },
                        credits:{
                            enabled:false
                        },
                        yAxis : {
                            title : {
                                text : ''
                            },
                            labels:{
                                align:"right",
                                x:-5,
                                formatter: function () {
                                    return this.value.toFixed(2);
                                }
                            },
                            opposite:false,
                            lineWidth:1,
                            plotLines : [{
                                value : 170.00,
                                color : 'green',
                                dashStyle : 'shortdash',
                                width : 2,
                                label : {
                                    text : '正常水位'
                                }
                            }, {
                                value : 180.00,
                                color : 'red',
                                dashStyle : 'shortdash',
                                width : 2,
                                label : {
                                    text : '警戒水位'
                                }
                            }]
                        },
                        xAxis:{
                            type: 'datetime', //定义x轴上日期的显示格式
							dateTimeLabelFormats: {
								second: '%Y-%m-%d<br/>%H:%M:%S',
								minute: '%Y-%m-%d<br/>%H:%M',
								hour: '%Y-%m-%d<br/>%H:%M',
								day: '%Y年<br/>%m-%d',
								week: '%Y<br/>%m-%d',
								month: '%Y-%m',
								year: '%Y'
							},
                            labels: {
                               /* formatter: function() {
                                    var vDate=new Date(this.value);
                                    //alert(this.value);
                                    var diffDay=Math.floor((this.axis.max-this.axis.min)/(24*3600*1000));
                                    var isKyear=new Date(this.axis.max).getFullYear()-new Date(this.axis.min).getFullYear();
                                    var isKmonth=(new Date(this.axis.max).getMonth()+1)-(new Date(this.axis.min).getMonth()+1);
                                    var isKday=new Date(this.axis.max).getDate()-new Date(this.axis.min).getDate();

                                    if(isKyear!=0){
                                        return vDate.getFullYear()+"年"+(vDate.getMonth()+1)+"月";
                                           // +vDate.getDate()+"日"+vDate.getHours()+"时";
                                    }
                                    else if(isKmonth!=0){
                                        return (vDate.getMonth()+1)+"月"+vDate.getDate()+"日";
                                    }
                                    else if(isKday!=0){
                                        return vDate.getDate()+"日"+vDate.getHours()+"时";
                                    }
                                    else{
                                        return vDate.getHours()+"时"+vDate.getMinutes()+"分";
                                    }
                                },*/
                                align: 'center'
                            },
                            events:{
                                setExtremes:function(e){
                                    //数据请求
                                    var chart = $('#chartTable').highcharts();
                                    var tm={btm:new Date(e.min).format("yyyy-MM-dd HH:mm:ss"),etm:new Date(e.max).format("yyyy-MM-dd HH:mm:ss")};
									ctvm.currentDate=tm;
                                    //chartTable.getDataTest(tm);
                                    //ctvm.currentDate=tm;
                                   // alert(tm.btm+'~'+tm.etm);
                                    chart.hideLoading();
                                    //alert('发起请求数据');

                                }
                            }
                        },
                        chart:{
                            //width:"200"
                            resetZoomButton: {
                                theme: {
                                    display: 'none'
                                }
                            }
                        },
                        scrollbar:{
                            height:0,
                            enabled:false
                        },
                        navigator:{
                            margin:1,
                            enabled:false,
                            height:60
                        },
                        series : [{
                            type:chartTable.options.chartOptions.type,
                            name : chartTable.options.chartOptions.name,
                            data : ctvm.chartData,
                            tooltip : {
                                valueDecimals : 2
                            }/*,
							dataGrouping: {
								units: [[
									'week', // unit name
									[1] // allowed multiples
								]]
							}*/
                        }]
                    });
                },
                tapDate:function(){
                    //$('#mobiDate');
                },
                datemiscroll:function(){
                    $('#mobiDate').mobiscroll().range({
                        theme: 'mobiscroll',
                        lang: 'zh',
                        display: 'modal',
                        dateFormat: 'yyyy-mm-dd 08:00:00',
                        defaultValue: [ new Date(2014, 10, 10), new Date(2014, 10, 17) ]

                    });
                    $('#mobiDate').change(function(e){

                        var arr=$(this).val().split(" - ");
                        var tm={btm:arr[0],etm:arr[1]};
                        chartTable.getDataTest(tm);
                        avalon.log(tm);
                    });
                }
            });

            //报图数据改变后的回调
            ctvm.$watch("chartData",function(a,b){
                ctvm.highStockInit();
            });
            //表格中点击数据加载按钮的回调
            ctvm.$watch("chartTable-loadData", function (data) {
                var lastcount = ctvm.currenCount;
                var cnewcount = lastcount + 1;
                var index = ctvm.currentIndex;
                var loadLength = 0;//index*cnewcount>data.length? data.length:index*cnewcount;
                var curData = ctvm.curTableData.$model;
                var tableData = data;

                if (index * cnewcount > data.length) {
                    loadLength = data.length;
                    ctvm.isFinish = true;
                }
                else {
                    loadLength = index * cnewcount
                }
                for (var i = index * lastcount; i < loadLength; i++) {
                    var obj = {};
                    for(var key in ctvm.tableColumn){
                        var item= ctvm.tableColumn[key];
                        obj[item] = tableData[i][item];
                    }
                    curData.push(obj);
                }
                ctvm.curTableData = curData;
                ctvm.currenCount=cnewcount;
            });
            chartTable.options.chartTableVm=ctvm;
            return ctvm;
        }

    }

    return chartTable;
})
