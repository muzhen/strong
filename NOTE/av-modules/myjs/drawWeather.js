/**
 * Created with JetBrains WebStorm.
 * User: lz
 * Date: 16-2-22
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */
define(function (window) {
    var drawWeather = {
        //最高温度数组的温度差
        tempMaxDiff: 0,
        //最高温度数组中的最低值
        minTempMax: 0,
        //最低温度数组的温度差
        tempMinDiff: 0,
        //最低温度数组中的最低值
        minTempMin: 0,

        //渲染天气折线图
        init: function (id, options) {

            for (var key in options) {
                if (key == 'maxArr') {
                    drawWeather.minTempMax = Math.min.apply(null, options[key]);
                    drawWeather.tempMaxDiff = Math.max.apply(null, options[key]) - Math.min.apply(null, options[key]);
                    drawWeather.tempMaxDiff = drawWeather.tempMaxDiff <= 0 ? 0 : drawWeather.tempMaxDiff;
                } else if (key == 'minArr') {
                    drawWeather.minTempMin = Math.min.apply(null, options[key]);
                    drawWeather.tempMinDiff = Math.max.apply(null, options[key]) - Math.min.apply(null, options[key]);
                    drawWeather.tempMinDiff = drawWeather.tempMinDiff <= 0 ? 0 : drawWeather.tempMinDiff;
                }
            }
            document.body.height = document.documentElement.clientHeight;
            if (options.type=='line'){
                drawWeather.drawLine(id,options);
            }else{
                drawWeather.calDiff(options);
                drawWeather.drawChart(id, options);
            }

        },
        //得到温度数组的温度差
        calDiff: function (options) {

        },
        /*
        * 温度转换成纵坐标
        * degree :温度，type类型（max为最大值，min为最小值）
        * */
        trans: function (degree, type) {
            var chartHeight = 30;
            //var ct= parseFloat(50/50);
            var result = 0;
            if (type == 'max') {
                result = 95 + (chartHeight - parseFloat((degree - drawWeather.minTempMax) * parseFloat(chartHeight / drawWeather.tempMaxDiff)));
            }
            else {
                result = 170 + (chartHeight - parseFloat((degree - drawWeather.minTempMin) * parseFloat(chartHeight / drawWeather.tempMinDiff)));
            }
            return   result;
        },
        /*
        * 绘制文字的圆角矩形背景
        * ctx为canvas的2d实例，x 横坐标，y 纵坐标，w 矩形宽度，h 矩形高度，r 圆角半径，fillColor 填充色
        * */
        BezierEllipse:function (ctx, x, y, w, h, r,fillColor){
            var min_size = Math.min(w, h);
            if (r > min_size / 2) r = min_size / 2;
            // 开始绘制
            ctx.beginPath();
            ctx.fillStyle= fillColor;
            ctx.strokeStyle=fillColor;
            ctx.moveTo(x-w/2 + r, y-h/2);
            ctx.arcTo(x + w-w/2, y-h/2, x + w-w/2, y + h-h/2, r);
            ctx.arcTo(x + w-w/2, y + h-h/2, x-w/2, y + h-h/2, r);
            ctx.arcTo(x-w/2, y + h-h/2, x-w/2, y-h/2, r);
            ctx.arcTo(x-w/2, y-h/2, x + w-w/2, y-h/2, r);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        /*
        * 空气质量对应颜色
        * */
        airQuaColor:function(key){
            var color="#ffffff";
            switch(key){
                case '优': color="#3ec06c"; break;
                case '良': color="#edc00a"; break;
                case '轻': color="#f59b0e"; break;
                case '中': color="#dd2929"; break;
                case '重': color="#b628eb"; break;
                case '严': color="#8b5202"; break;
                default : break;
            }
            return  color
        },
        /*
         *  绘制折线图
         *   canvasId:对象ID，options绘图所需的参数。
         * */
        drawLine:function(canvasId,options){
            var xb = 1, yb = 1,xinte=83;
            var curwid=document.body.offsetWidth;
            var curhid=document.body.offsetHeight;
            var width = 0;//options.width ? (options.width*curwid)/375 : document.documentElement.clientWidth;
            var height = 0;//options.height ? (options.height*curhid)/627 : document.documentElement.clientHeight / 2;
            var dw=options.dw;
            var pi2 = Math.PI * 2;

            var ftcanvas=document.getElementById("canvas_24");

            var c=ftcanvas.getContext("2d");
            //分辨率倍数
            var fd=3;
            width=ftcanvas.width=2000*fd;
            height=ftcanvas.height=200*fd;

            xb = parseFloat(width / 2000);
            yb = parseFloat(height / 150);

            c.font = (1.25*fd)+"rem 微软雅黑";
            //c.font = "0.861rem 微软雅黑";
            c.lineWidth=1*fd;
            c.globalAlpha = 0;
            c.fillRect(0, 0, 1150 * xb, 150 * yb);
            //设置背景渐变
            c.globalAlpha = 1;
            c.fillStyle = "#ffffff";
            c.textAlign = "center";
            var tempData=options.data;

            //绘制横坐标
            var xArrs =  options.xArrs;
            c.strokeStyle="#ffffff";
            c.moveTo(0*xb,118*yb) ;
            c.lineTo(width*xb,118*yb);
            c.stroke();
            for(var i=0;i<xArrs.length;i++){
                c.fillText(xArrs[i],(i*xinte+50)*xb,140*yb);
            }

            //绘纵坐标
            c.beginPath();
            var yArrs =  options.yArrs;
            var ydiff=Math.max.apply(null, yArrs) - Math.min.apply(null, yArrs);
            var ymin=Math.min.apply(null, yArrs);
            var yprop=52/ydiff;   //heigth-90:表示最大值到最小值的高度差。.
            var ystart=82;//起始高度

            //绘制恒温线
            c.beginPath();
           // c.lineWidth=3;
            c.strokeStyle="#ffffff";
            c.globalAlpha=0.3;
            var consTemps=[ymin,ymin+ydiff/2,ymin+ydiff];
            for(var i=0;i<consTemps.length;i++){
                var y=(ystart-(consTemps[i]-ymin)*yprop);
                c.moveTo(0*xb,(y+0.5)*yb);
                c.lineTo(width*xb,(y+0.5)*yb);
            }
            c.stroke();
            c.globalAlpha=1;
            //纵坐标温度
            for(var i=0;i<consTemps.length;i++){
                var y=(ystart-(consTemps[i]-ymin)*yprop);
                c.fillText(consTemps[i]+dw,15*xb,(y-5)*yb);
            }

            //绘制温度折线
            c.beginPath();
            c.moveTo(50*xb,(ystart-(tempData[0].val-ymin)*yprop)*yb);
            for(var i=1;i<tempData.length;i++){
                c.lineTo((i*xinte+50)*xb,(ystart-(tempData[i].val-ymin)*yprop)*yb);
            }
            c.stroke();
            //绘制温度线的基本属性
            c.beginPath();
            for(var i=0;i<tempData.length;i++){
                var x=i*xinte+50,y=(ystart-(tempData[i].val-ymin)*yprop+15);
                //图片
                var img = new Image();
                img.src = tempData[i].img;
                img['numx'] = (x-15)*xb;
                img['numy'] = (y-45)*yb;
                img.onload = function () {
                    c.drawImage(this, this.numx, this.numy, 40*xb, 30*yb);
                };
                //温度值
                c.fillText(tempData[i].val+dw,x*xb,(y+8)*yb);
                //圆点
                c.moveTo(x*xb,(y-15)*yb);
                c.arc(x*xb,(y-15)*yb, 3*xb, 0*yb, pi2*fd);
            }
            c.fill();
        },
        /*
        *  绘制双折线不重叠天气温度图表
        *   canvasId:对象ID，options绘图所需的参数。
        * */
        drawChart: function (canvasId, options) {
            var xb = 1, yb = 1,col=6,colwidth=0;

            var width = options['width'] ? options.width : document.documentElement.clientWidth;

            var height = options['height'] ? options.height : document.documentElement.clientHeight / 2;//361;//
            var weekString = ["周一", "周二"
                , '周三'
                , "周四", "周五", "周六", "周日"];
            var pi2 = Math.PI * 2;
            var canvas = document.getElementById(canvasId);

            //测试
            var fd=4;
            width=canvas.width=420*fd;//460;//
            height=canvas.height=400*fd;//340;//
            //console.log(canvas..width+'||'+canvas.height);
            colwidth=420/col;
            xb = parseFloat(width / 420);
            yb = parseFloat(height / 320);
            var c = canvas.getContext("2d");

            c.font = (0.975*fd)+"rem 微软雅黑";
//设置背景渐变
            c.globalAlpha = 0;
            c.fillStyle = "#000000";

            c.fillRect(0, 0, 420 * xb, 300 * yb);
            c.globalAlpha = 1;
//绘制文字
            c.fillStyle = "#ffffff";
            c.textAlign = "center";

            for (var i = 0; i < col; i++) {
                if(i==0){
                    c.globalAlpha = 0.5;
                    c.fillText("昨天", colwidth/2 * xb, 22 * yb);
                }
                else if(i==1){
                    c.globalAlpha = 1;
                    c.fillText("今天", (colwidth/2+colwidth) * xb, 22 * yb);
                }
                else{
                    c.fillText(weekString[options.weekArr[i]], (colwidth/2 + colwidth * i) * xb, 22 * yb);
                }
                //绘制日期
                c.fillText(options.dateArr[i], (colwidth/2 + colwidth * i) * xb, 38 * yb);
                //绘制最高温度文字天气情况
                c.fillText(options.weatherMaxArr[i].name, (colwidth/2 + colwidth * i) * xb, 58 * yb);
                //绘制最低温度文字天气情况
                c.fillText(options.weatherMinArr[i].name, (colwidth/2 + colwidth * i) * xb, 260 * yb);
                //绘制最高温度图片天气情况
                var imgmax = new Image();
                imgmax.src = options.weatherMinArr[i].img;
                imgmax['num'] = i;
                imgmax.onload = function () {
                    if(this.num==0)
                        c.globalAlpha = 0.5;
                    else
                        c.globalAlpha = 1;
                    c.drawImage(this, ((colwidth*2/9) + colwidth * this.num) * xb, 62 * yb, 35* xb, 25* yb);
                };
                //绘制最低温度图片天气情况
                var imgmin = new Image();
                imgmin.src = options.weatherMinArr[i].img;
                imgmin['num'] = i;
                imgmin.onload = function () {
                    if(this.num==0)
                        c.globalAlpha = 0.5;
                    else
                        c.globalAlpha = 1;
                    c.drawImage(this, ((colwidth*2/9) + colwidth * this.num) * xb, 220 * yb, 35*xb, 25*yb);
                };
            }


            c.lineWidth=1*fd;
//绘制最高温度折线
            c.beginPath();
            c.strokeStyle = "#ffffff";
            for (var i = 0; i < col; i++) {
                if(i===0){

                    c.globalAlpha = 0.3;
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10) * yb);
                }
                else if(i===1){
                    c.lineTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10) * yb);
                    c.stroke();
                    c.beginPath();
                    c.globalAlpha = 1;
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10) * yb);
                }
                else{
                    c.lineTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10) * yb);
                }
            }
            c.strokeStyle = "#ffffff";
            c.stroke();
//绘制最低温度折线

            c.beginPath();
            for (var i = 0; i < col; i++) {
                if(i===0){
                    c.globalAlpha = 0.3;
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5) * yb);
                }
                else if(i===1){
                    c.lineTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5) * yb);
                    c.stroke();
                    c.beginPath();
                    c.globalAlpha = 1;
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5) * yb);
                }
                else{
                    c.lineTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5) * yb);
                }
            }
            //c.strokeStyle = "#ffffff";
            c.stroke();
            //绘制最高温度点
            c.fillStyle = "#ffffff";
            c.beginPath();
            for (var i = 0; i < col; i++) {
                if(i===0){
                    c.globalAlpha = 0.3;
                    c.fillText(options.maxArr[i] + '℃', (colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') +2) * yb);
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10 ) * yb);
                    c.arc((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10) * yb, 3*xb, 0*yb, pi2*fd);
                    c.fill();
                    c.beginPath();
                    c.globalAlpha = 1;
                }
                else {
                    c.fillText(options.maxArr[i] + '℃', (colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') +2) * yb);
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10 ) * yb);
                    c.arc((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.maxArr[i], 'max') + 10) * yb, 3*xb, 0*yb, pi2*fd);
                }
            }
            c.fill();
            //绘制最低温度点
            c.beginPath();
            for (var i = 0; i < col; i++) {
                if(i===0){
                    c.globalAlpha = 0.3;
                    c.fillText(options.minArr[i] + '℃', (colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') - 3) * yb);
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5 ) * yb);
                    c.arc((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5 ) * yb, 3*xb, 0*yb, pi2*fd);
                    c.fill();
                    c.beginPath();
                    c.globalAlpha = 1;
                }
                else{
                    c.fillText(options.minArr[i] + '℃', (colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') - 3) * yb);
                    c.moveTo((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5 ) * yb);
                    c.arc((colwidth/2 + colwidth * i) * xb, (drawWeather.trans(options.minArr[i], 'min') + 5 ) * yb, 3*xb, 0*yb, pi2*fd);
                }
            }
            c.fill();

            //绘制空气质量文字
            for (var i = 0; i < col; i++) {
                var textCount=parseInt(options.airQuality[i].length);
                drawWeather.BezierEllipse(c,(colwidth/2 + colwidth * i) * xb,279 * yb,((12 * textCount)+12)*xb,16*yb,10*fd,drawWeather.airQuaColor(options.airQuality[i]));
                c.fillStyle ="#ffffff";
                c.fillText(options.airQuality[i], (colwidth/2 + colwidth * i) * xb, 282.5 * yb);
            }
            c.strokeStyle ="#ffffff";
            //绘制纵向分割线
            c.globalAlpha = 0.5;
            for (var i = 1; i < col; i++) {
                c.beginPath();
                c.moveTo(( colwidth * i) * xb, 0 * yb);
                c.lineTo(( colwidth * i) * xb, 300 * yb);
               // c.strokeStyle = "#ffffff";
                c.stroke();
            }
            //绘制底部封闭线
            //c.strokeStyle="#ffffff";
            c.globalAlpha = 0.5;
            c.moveTo(0,300.5 * yb);
            c.lineTo(width,300.5 * yb);
            c.stroke();
            c.globalAlpha=1;
        }


    }

    return drawWeather;
});

