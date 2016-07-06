<!--
<div id="fixedMenu_keleyi_com" class="col-sm-12 " style="background-color:white;overflow:hidden;width: 100%;padding: 5px;" >
             <div style="float:left;width:20%;padding-left: 6px;margin-top: 8px;margin-bottom: 5px;">
               <a href="../../../image-list/trunk/examples/index.html"><span class="glyphicon glyphicon-chevron-left"></span></a>
             </div>
             <div style="float:left;width:60%;text-align: center;margin-top: 8px;">
               三防预警
             </div>
             <div style="float:right;width:20%;padding-left: 34px;margin-top: 8px;margin-bottom: 5px;">
            </div>
</div>-->
<div class="col-sm-12 " style="float: left;width: 100%;padding-top: 14px;" ms-each="inf"  data-each-rendered="load"><!--标题-->
       <p class="tit">{{el.title}}</p>
       <p class="tim">{{el.release_time|date("MM-dd HH:mm"}}&nbsp;&nbsp;</p>
       <p class="tim">{{el.unit_name}}</p>
       <!--<img ms-attr-src="el.content_path"style="width:100%;height:230px;margin-top: 7px;"/>名片-->
	   <p id="note" class="txt">
        </p>
	    <a ms-attr-href="el.content_path">查看详情</a>
</div>
<!--正文
<div class="col-sm-12 " style="float: left;width: 100%;margin-top: 20px;">
        <p class="txt">
           {{inf.contents}} 	   {{el.contents}}
        </p>
</div>-->
