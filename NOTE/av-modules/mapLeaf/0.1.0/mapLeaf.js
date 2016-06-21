/**
 * Created with JetBrains WebStorm.
 * User: strong
 * Date: 16-5-3
 * Time: 上午11:43
 * To change this template use File | Settings | File Templates.
 */
define(['avalon', 'jquery', 'leaflet','mobiscroll','JsUtil', 'css!bootstrap.css', 'css!leaflet.css', 'css!ionicons.css', 'css!mapLeaf.css'], function (avalon, $, L,mobiscroll,JsUtil) {
    var mapLeaf = {
        options: {
            clid: "",
            //url: {},
            map: {},
            popup:"",//弹出层的样式包含（图标样式，站名/站值的头部）
            drawType: ['point'],
            center:"",
            //isMapData:"",
            AreaRainBounds: [],
            curModuleType: "", //当前的模块类型
            defaultDate: { btm:(new Date(2014, 10, 10)).format('yyyy-MM-dd 08:00'), etm:(new Date(2014, 10, 17)).format('yyyy-MM-dd 08:00') },//默认时间
            legend: {
                water: {
                    rise: "glyphicon glyphicon-play water-icon-rise",//落
                    normal: "ion-record water-icon-normal",  //平
                    fall: "glyphicon glyphicon-play water-icon-fall", //涨
                    overWarn: "ion-record water-icon-overWarn ",       //超汛限/警戒
                    overNormal: "ion-record water-icon-overNor"     //超正常/保证

                },
                rain: {
                    leg_null: "rain-icon-normal rain-icon-null", val_null: "null",
                    leg_0: "rain-icon-normal rain-icon-0", val_0: 0.0,
                    leg_1: "rain-icon-normal rain-icon-1", val_1: 2.9,
                    leg_2: "rain-icon-normal rain-icon-2", val_2: 9.9,
                    leg_3: "rain-icon-normal rain-icon-3", val_3: 19.9,
                    leg_4: "rain-icon-normal rain-icon-4", val_4: 49.9,
                    leg_5: "rain-icon-normal rain-icon-5", val_5: 99.9,
                    leg_6: "rain-icon-normal rain-icon-6", val_6: 100,
                    leg_warn: " rain-icon-warn", val_warn: false
                }
            },
            defZoom: 9//默认的视野等级
        },
        init: function (options) {
            mapLeaf.options = $.extend(mapLeaf.options, options);
            var vm = mapLeaf.initVm();

            // mapLeaf.initMarker();
            return vm;
        },
        getData: function (url,func,date) {
           // var url = mapLeaf.options.url.src;
            //if(map)
            var parms={};
            if(date){
                parms={
                    btm:date.btm,
                    etm:date.etm
                }
                $(".mapLeaf-top-date").html(date.btm+'～'+date.etm);
            }

            $.getJSON(url,parms, func)
        },
        serverDataBind:function(result){
           // mapLeaf.options.mapVm.curDatas=result;
            $.each(mapLeaf.options.drawType, function (i, item) {
                switch (item) {
                    case "point":
                        mapLeaf.initMarker(result);
                        break;
                    case "line":
                        //mapLeaf.initPolyline(result);
                        break;
                    default :break;
                }
            })
        },
        /*
        * 绘制边界线
        * */
        boundaryDataBind:function(result){
            mapLeaf.initPolyline(result);
        },
        /*
         * 地图的相关绑定
         * */
        mapBind: function () {
            var map = mapLeaf.options.map;
            map.on('locationfound', mapLeaf.onLocationFound);
            map.on('locationerror', mapLeaf.onLocationError);
            map.locate({setView: true, maxZoom: 16});
            map.on('moveend', function (e) {
               //var map = mapLeaf.options.map;
            });
            map.on('mousemove', function (e) {
                var vm = mapLeaf.options.mapVm;
                vm.mouseLatLng=[e.latlng.lat,e.latlng.lng];
            });

            map.on('viewreset', mapLeaf.viewReset);
            //avalon.log(map.getMousePosition );
        },
        /*
         * 初始化地图
         * */
        initMap: function () {
            var map = L.map(mapLeaf.options.clid, {
                center: mapLeaf.options.center,//[28.019256987158702, 120.62301635742188],
                attributionControl:false,
                zoomControl:false,
                zoom: 8
            });
            mapLeaf.options.map = map;
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
//                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
            mapLeaf.mapBind();
            //mapLeaf.initTopDate();
            //绘制边界线
           // mapLeaf.getData(mapLeaf.options.url["boundary"],mapLeaf.boundaryDataBind);


        },
        /*
         * 初始化地图的vm
         * */
        initVm: function () {
            var vm = avalon.define({
                    $id: mapLeaf.options.clid,
                    mid: mapLeaf.options.clid,
                   // dataUrl: mapLeaf.options.url.src,
                    popupTpl: require.toUrl('mapLeaf') + '_Popup.html',    //弹出层模版
                    BoundaryLine:[],//边界线
                    popupData: {    //图元点击弹出层数据基本配置
                        iconleft: mapLeaf.options.popup["popupIcon"]||'ion-ios-rainy', //弹出框图标样式
                        fontsize:mapLeaf.options.popup["fontsize"]||'', //弹出框文字信息的大小
                        titles:mapLeaf.options.popup["titles"]||["站名","雨量"], //弹出框固定的文字信息
                        datakeys:mapLeaf.options.popup["vals"]||["STNM","VAL"],  //弹出框固定的文字信息对应的请求key值
                        data:{},    //弹出框的数据源
                        dws:mapLeaf.options.popup["dws"]||["","mm"]    //弹出框固定的文字信息对应的单位
                    },
                    curDatas:[],//当前的请求返回数据,
                    areaRainBounds:mapLeaf.options.AreaRainBounds, //雨量等直面的区域
                    areaRainImg:"", //雨量等直面的图片
                    mouseLatLng:[0,0],
                    curDate:"",
                    isShowTable:false,
                    iconIsImg: false,
                    selectDate:function(){
                        $('#mobiDate').mobiscroll('show');
                    },
                    setCurDate:function(date){
                        mapLeaf.options.mapVm.seletedDate=date.btm+'～'+date.etm;
                    },
                    $curPopupIconLeft: ""
                }
            );
            vm.$watch("areaRainImg",function(data){
                mapLeaf.addAreaValue();
            });

            vm.$watch("BoundaryLine",function(data){
                //mapLeaf.addAreaValue();

                mapLeaf.boundaryDataBind(data.$model);
            });

            vm.$watch("curDatas",function(data){
                //mapLeaf.addAreaValue();
                avalon.log(1);
                mapLeaf.serverDataBind(data.$model);
               // mapLeaf.boundaryDataBind(data);
            });
            mapLeaf.options.mapVm = vm;
            return vm;
        },
        /*
        *   初始化顶部日期栏,底部预警信息
        */
//        initTopDate:function(){
//            var date=mapLeaf.options.defaultDate;
//            var topDateHtml='<span class="mapLeaf-top-date" ms-on-tap="selectDate"></span><input id="mobiDate"  style="display:none"/>';
//
//            //var topDateHtml='<span class="mapLeaf-top-date" ms-on-tap="selectDate"></span><input id="mobiDate"  style="display:none"/>';
//            var colTopDate =L.control
//                .attribution({position:'topleft',prefix:''})
//                .addAttribution(topDateHtml);
//            mapLeaf.options.map.addControl(colTopDate);
////            //添加鼠标的经纬度    待完善
////            var bottomLatLngHtml='<span ></span>';
////            var bottomLatLng =L.control
////                .attribution({position:'bottomleft',prefix:''})
////                .addAttribution(bottomLatLngHtml);
////            mapLeaf.options.map.addControl(bottomLatLng);
//
//            avalon.scan(document.body, mapLeaf.options.mapVm);
////            mapLeaf.options.map.addControl(colBotWarn);
//            mapLeaf.initDateCon();
//            mapLeaf.getData(mapLeaf.options.mapVm.dataUrl,mapLeaf.serverDataBind,date);
//        },
        /*
        * 初始化日期弹窗
        * */
//        initDateCon:function(){
//            //初始化日期组件
//            $('#mobiDate').mobiscroll().range({
//                theme: 'mobiscroll',
//                lang: 'zh',
//                display: 'modal',
//                dateFormat: 'yyyy-mm-dd 08:00:00',
//                onSelect:function(valueTExt,inst){
//                    var val = inst.getVal(); // Call the getVal method
//                    var date={btm:val[0].format('yyyy-MM-dd 08:00'),etm:val[1].format('yyyy-MM-dd 08:00')};
//
//                    mapLeaf.getData(mapLeaf.options.mapVm.dataUrl,mapLeaf.serverDataBind,date);
//                },
//                defaultValue: [mapLeaf.options.defaultDate.btm.toDate(),mapLeaf.options.defaultDate.etm.toDate()]
//
//            });
//        },
        /*
         * 初始化打点之前的数据转化
         * */
        initMarker: function (datas) {
            var points = [];
            for (var n = 0; n < 1; n++) {
                $.each(datas, function (i, item) {
                    var point = {
                        width: 18,
                        height: 20
                    };
                    point = $.extend(point, item);

                    points.push(point);
                });
            }
            mapLeaf.addMapByMarkers(points);
        },
         /*
         * 添加雨量等值面
         * */
        addAreaValue:function(){
            var map= mapLeaf.options.map;
            var vm=mapLeaf.options.mapVm;
            //添加等直面信息
            var imageUrl = vm.areaRainImg,//'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
                imageBounds =  vm.areaRainBounds;//[[28.019256987158702, 120.019256987158702], [29.079256987158702, 121.119256987158702]];
            if(imageUrl){
                L.imageOverlay(imageUrl, imageBounds).addTo(map);
            }
        },
        /*
         * 批量往地图上打点
         * */
        addMapByMarkers: function (markers) {
            var map = mapLeaf.options.map,
                mapVm = mapLeaf.options.mapVm,
                defZoom = mapLeaf.options.defZoom,
                markerArr = [],  //点数组
                iconClassType = {}; //图元样式类型

            switch (mapLeaf.options.curModuleType) {
                case 'rain':
                    iconClassType = mapLeaf.options.legend.rain;
                    //mapVm.$curPopupIconLeft = 'ion-ios-rainy';
                    break;
                case 'water':
                    iconClassType = mapLeaf.options.legend.water;
                   // mapVm.$curPopupIconLeft = 'ion-waterdrop';
                    break;
                default :
                    break;
            }
            //判断图元是否为图片
            mapVm.iconIsImg = markers[0]['icon_img'] ? (markers[0]['icon_img'].lastIndexOf('.') > 0) : false;
            $.each(markers, function (i, item) {
                var divIcon = mapLeaf.setIconStyle(iconClassType, item),
                    myIcon2 = L.divIcon(divIcon),
                    point = [item.lat, item.lng]

                markerArr.push(L.marker(point, {icon: myIcon2, title: "test", data: item}).on('click', function (e) {
                    mapLeaf.initPopup(e, point);
                }));
            });
            // var polyline = L.polyline([[28.09,120.47],[28.1,120.85]], {color: 'red'});
            // L.layerGroup(markerArr).addLayer(polyline).addTo(map);
            L.layerGroup(markerArr).addTo(map);
            //初始化打点时隐藏>于当前视野等级时的点值
            if (map.getZoom() < defZoom) {
                $("span[icontype='value']", map.getPanes().markerPane).addClass('icon-value-hidden');
            }
            else {
                $("span[icontype='value']", map.getPanes().markerPane).removeClass('icon-value-hidden');
            }

            avalon.scan(document.body, mapLeaf.options.mapVm);
        },
        /*
         * 设置图元样式并返回图元
         * */
        setIconStyle: function (iconClassType, itemdata) {

            var iconClass = "", //图元类型
                curModuleType = mapLeaf.options.curModuleType,//当前业务模块类型
                icon = {},
                iconVal = "<span icontype='value' class='icon-value icon-value-color'>" + itemdata.val + "</span>",//图元的val内容
                iconImg = ""; //图元的icon图标内容

            if (mapLeaf.options.mapVm.iconIsImg && curModuleType != 'water' && curModuleType != 'rain') {
                var dir=itemdata["dir"] ? itemdata["dir"]:0;
                iconImg = "<img class='icon-img-style' src='" + itemdata["icon_img"] + "' style='transform: rotate("+dir+"deg);'/>";
            }
            else {
                if (mapLeaf.options.curModuleType == 'water') {
                    //测试水情的涨落类型字段
                    if (!itemdata["waterLeg"]) {
                        //itemdata["waterLeg"] = 0;
                        itemdata["zz"] = 25;   //测试用的正常水位值字段
                        itemdata["xunxian"] = 30;   //测试用的汛限水位值字段
                    }
                    //水情站点的涨落平判断
                    switch (itemdata["waterLeg"]) {
                        case 1:
                            iconClass = iconClassType.fall;  //涨
                            break;
                        case -1:
                            iconClass = iconClassType.rise;  //落
                            break;
                        case 0:
                            iconClass = iconClassType.normal;  //平
                            break;
                        default ://iconClass=iconClassType.normal;
                            //超正常/保证
                            iconClass = itemdata["val"] > itemdata["zz"] ? iconClassType.overNormal : iconClassType.normal;
                            //超汛限/警戒
                            iconClass = itemdata["val"] > itemdata["xunxian"] ? iconClassType.overWarn : iconClass;
                            break;
                    }
                }
                //雨情站点
                else if (mapLeaf.options.curModuleType == 'rain') {
                    //测试雨情的超警的类型字段
                    if (!itemdata["rainWarn"]) {
                        itemdata["rainWarn"] = 20;
                    }

                    switch (itemdata["level_index"]) {
                        case -1:
                            iconClass = iconClassType.leg_null;
                            break;
                        case 0:
                            iconClass = iconClassType.leg_0;
                            break;
                        case 1:
                            iconClass = iconClassType.leg_1;
                            break;
                        case 2:
                            iconClass = iconClassType.leg_2;
                            break;
                        case 3:
                            iconClass = iconClassType.leg_3;
                            break;
                        case 4:
                            iconClass = iconClassType.leg_4;
                            break;
                        case 5:
                            iconClass = iconClassType.leg_5;
                            break;
                        case 6:
                            iconClass = iconClassType.leg_6;
                            break;
                        default :
                            break;
                    }
                    //超警判断
                    if (itemdata["val"] > itemdata["warn_standard"]) {
                        iconClass += iconClassType.leg_warn;
                    }
                }
                else{
                    iconClass=itemdata["icon_img"];
                }
                iconImg = "<span class='" + iconClass + "' aria-hidden='true'></span>";
            }

            icon = {iconSize: itemdata['size'] || 45, className: 'my-div-icon', html: iconImg + iconVal};
            return icon;
        },
        /*
         * 初始化弹出层
         * */
        initPopup: function (event, point) {
            var map = mapLeaf.options.map;
            var targetData = event.target.options.data;
            var latlng = L.latLng(point[0], point[1]);

            mapLeaf.options.mapVm.popupData = {
                iconleft: mapLeaf.options.mapVm.popupData.iconleft,
                titles: mapLeaf.options.mapVm.popupData.titles,
                fontsize:mapLeaf.options.mapVm.popupData.fontsize,
                datakeys: mapLeaf.options.mapVm.popupData.datakeys,
                dws: mapLeaf.options.mapVm.popupData.dws,
                data: targetData};
           // avalon.log(mapLeaf.options.mapVm.popupData.$curPopupIconLeft);
            var popup = L.popup({className: 'mapleft-popup'})
                .setLatLng(latlng)
                // .setContent('<p>' + targetData["STNM"] + '<br />' + targetData["TM"] + '</p>')
                .setContent('<div ms-include-src="popupTpl" class="map-popup-dialog"></div>')
                .openOn(map);
           // avalon.log(mapLeaf.options.mapVm);
            avalon.scan(document.body, mapLeaf.options.mapVm);
            //debugger;

        },
        /*
         * 绘制线函数
         * */
        initPolyline: function (datas) {
            $.each(datas,function(i,item){
                datas[i]=[item[1],item[0]];
            });
            console.log('画线功能待完善！！！');
            var map=mapLeaf.options.map;
            var polyline = L.polyline(datas, {
                color: '#B160D3',
                opacity: 1,
                weight: 4,
                clickable: false
            }).addTo(map);
        },
        /*
         * 视图改变后的执行方法
         * */
        viewReset: function (e) {
            var curZoom = e.target.getZoom();
            //隐藏>于当前视野等级时的点值
            var defZoom = mapLeaf.options.defZoom;
            if (curZoom < defZoom) {
                $("span[icontype='value']", e.target.getPanes().markerPane).addClass('icon-value-hidden');
            }
            else {
                $("span[icontype='value']", e.target.getPanes().markerPane).removeClass('icon-value-hidden');
            }
        },

        /*
         * 图元转为为img标签
         * */
        markerPanesToImg: function () {
            var map = mapLeaf.options.map;
            //console.log(map.getPanes().markerPane);
//            var divContent = map.getPanes().markerPane.innerHTML;
//            var data = "data:image/svg+xml," +
//                "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
//                "<foreignObject width='100%' height='100%'>" +
//                "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +
//                divContent +
//                "</div>" +
//                "</foreignObject>" +
//                "</svg>";
//            var img = new Image();
//            img.src = data;
//            // document.getElementsByTagName('body')[0].appendChild(img);
//            map.getPanes().markerPane.innerHTML= "<img src='"+img.src+"'/>";
        },


        onLocationFound: function (e) {
            var radius = e.accuracy / 2;

            L.marker(e.latlng).addTo(map)
                .bindPopup("You are within " + radius + " meters from this point").openPopup();

            L.circle(e.latlng, radius).addTo(map);
        },
        onLocationError: function (e) {
            // alert(e.message);
        }

    }

    return mapLeaf;

})