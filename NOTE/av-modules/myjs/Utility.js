


function StringBuffer() {
    this.array = new Array();
}

StringBuffer.prototype.append = function (value) {
    this.array[this.array.length] = value;
    return this;
}

StringBuffer.prototype.toString = function () {
    var _string = this.array.join("");
    return _string;
}

StringBuffer.prototype.remove = function () {
    this.array = new Array();
}



/*
svg系列的绘图类
*/
function SvgDraw() {
    this.obj = {};
}

/*绘制梯形的角标并填充
    targetObj:目标容器对象
    text:显示的文本
    title:移动上去浮现的文本
    point:图像初始化的点坐标
    strokeColor:边框的颜色
    fillColor：填充的颜色
    strokeWidth：边框线的宽度
*/
SvgDraw.prototype.drawTipTX = function (targetObj, text, point, strokeColor, fillColor, strokeWidth) {
    if (navigator.userAgent.indexOf('MSIE 8.0') > 0) {//ie8的情况下
        targetObj.css('background-image', 'url(../../Images/tip.png)');
    }
    var points = "M" + point.x + "," + point.y + " " + (point.x + 15) + "," + (point.y + 15) + " " + (point.x + 30) + "," + (point.y + 15) + " " + (point.x + 30) + "," + point.y + "Z";
    var html = '<svg >';
    html += '<path   d="' + points + ' " stroke="' + strokeColor + '" fill="' + fillColor + '" stroke-width="' + strokeWidth + '"/>';
    html += '<text  x="' + (point.x + 20) + '" y="' + (point.y + 10) + '" font-size="8" text-anchor="middle" fill="white">' + text + '</text>';
    html += '</svg>';
    targetObj.html(html);

}

/*绘制图像作为背景(svg)
targetObj:目标容器对象
text:显示的文本
title:移动上去浮现的文本
points:图像初始化的点坐标（数组）
strokeColor:边框的颜色
fillColor：填充的颜色
strokeWidth：边框线的宽度
注：ie浏览器仅支持ie8以上版本
*/
SvgDraw.prototype.drawBg = function (targetObj, text, points, strokeColor, fillColor, strokeWidth, fontsize) {
    if (!fontsize) {
        fontsize = 8;
    }
    var d = "";
    for (var i = 0; i < points.length; i++) {
        d += ' ' + points[i].x + ',' + points[i].y;
    }
    //var points = "M" + point.x + "," + point.y + " " + (point.x + 15) + "," + (point.y + 15) + " " + (point.x + 30) + "," + (point.y + 15) + " " + (point.x + 30) + "," + point.y + "Z";
    var html = '<svg >';
    html += '<path   d="' + d + ' " stroke="' + strokeColor + '" fill="' + fillColor + '" stroke-width="' + strokeWidth + '"/>';
    html += '<text  x="' + (point.x + 20) + '" y="' + (point.y + 10) + '" font-size="' + fontsize + '" text-anchor="middle" fill="white">' + text + '</text>';
    html += '</svg>';
    targetObj.html(html);

}


/*
页面加载类
*/
function LoadingPage() {
    this.obj = {};
    this.loadContent = {};
}

LoadingPage.prototype.creatLoading = function (picUrl) {


    this.loadContent = document.createElement("div");

    this.loadContent.style.position = 'fixed';
    this.loadContent.style.width = document.body.clientWidth.toString() + 'px';
    this.loadContent.style.height = document.body.clientHeight.toString() + 'px';
    this.loadContent.style.opacity = '.3';
    this.loadContent.style.display = 'none';
    this.loadContent.style.background = '#000000';
    this.loadContent.style.top = '0';
    this.loadContent.style["z-index"] = '9999';
    //this.loadContent.style["background-image"] = 'url("UtilityImg/Loading002.gif")';


    var img = document.createElement("img");
    if (!picUrl) {
        img.src = './UtitlityTool/UtilityImg/Loading002.gif';
    } else {
        img.src = picUrl;
    }
    

    this.loadContent.appendChild(img);

    document.body.appendChild(this.loadContent);
}

/*
页面加载开始
*/
LoadingPage.prototype.start = function () {
    this.loadContent.style.display = 'block';
}

/*
页面加载结束
*/
LoadingPage.prototype.end = function () {
    this.loadContent.style.display = 'none';

}