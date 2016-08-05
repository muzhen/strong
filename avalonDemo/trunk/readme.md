过程碰到的知识点：
1、JavaScript push() 方法
--该方法会改变数组的长度。
---arrayObject.push(newelement1,newelement2,....,newelementX)
----arr.push("James") //往数组arr[]增加元素James；

2、JavaScript indexOf() 方法
--indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
--stringObject.indexOf(searchvalue,fromindex)
--注释：indexOf() 方法对大小写敏感！
  注释：如果要检索的字符串值没有出现，则该方法返回 -1。
--var str="Hello world!"
  document.write(str.indexOf("gg"))// -1


3、for in
var arr = new Array("first", "second", "third")
for(var item in arr) {
document.write(arr[item]+",");
}

4、样式设置
$("p").css({ "margin-left": "10px", "background-color": "blue" });

5、JavaScript slice() 方法
---返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
slice() 方法可从已有的数组中返回选定的元素。

6、JavaScript Switch 语句
switch(n)
{
case 1:
  执行代码块 1
  break;
case 2:
  执行代码块 2
  break;
default:
  n 与 case 1 和 case 2 不同时执行的代码
}
7、偏移量
var p = $("p:last");
var offset = p.offset();
p.html("left: " + offset.left + ", top: " + offset.top);


var p = $("p:first");
var position = p.position();
$("p:last").html("left: " + position.left + ", top: " + position.top);

8、html5新特性data_*自定义属性使用
<div id="content" data-age="18">html5 data-*自定义属性 age</div>
//js获取
var content= document.getElementById('content');
alert(content.dataset.age)
//jquery获取
$('#content').data('age');//读

9、jQuery 中bind(),live(),delegate(),on() 区别
---参考：http://blog.csdn.net/panfang/article/details/21705681
$('a').bind('click', function() { alert("That tickles!") });
$( "#members li a" ).bind( "click", function( e ) {} );

10、去重
http://blog.csdn.net/chengxuyuan20100425/article/details/8497277
http://www.cnblogs.com/sosoft/archive/2013/12/08/3463830.html