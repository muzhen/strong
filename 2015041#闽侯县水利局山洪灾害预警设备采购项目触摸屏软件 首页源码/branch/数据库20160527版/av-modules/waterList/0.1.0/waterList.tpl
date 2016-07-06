
<!--头部图片轮播 -->
<div class="swiper-container" style="overflow:hidden; min-height: 150px;">
    <div  class="swiper-wrapper" ms-each="lbimg" data-each-rendered="swiperFun">
      <div class="swiper-slide" ><img ms-attr-src="el.image_path" class="imghw"></div>
    </div>
        
</div>   



      <!--行政区划 -->
<div  class="col-sm-12 " style="padding-left: 0;padding-right: 0;" >
      <div  ms-controller="city" ms-include-src="{{tplm}}"  data-include-rendered="xzqhlist" style="overflow:hidden;"></div>
</div>

    <!--河道水库页签 -->
<div class="swiper-container1" style="height:45px;margin-top: 0px;overflow:hidden;">
      <div id="sign" class="swiper-wrapper">
          <div class="swiper-slide ra bor" ms-repeat-el="yeqian" ms-attr-id="el.id" ms-on-tap="hdskclick(this.id)">{{el.name}}</div>
       
     </div>
</div>




     <!--搜索框 -->
<div class="col-sm-12 ">

      <div class="sos">
          <label class="la">{{count}}条</label>
          <input id="sous"  type="text" class="form-control" style="background-color: #DAD5D5;width: 7.4rem;display: initial;" placeholder="搜索" ms-click="bgcolor(this.id)" ms-on-keypress="souschange(this.id,this.event)"> 
     </div>
</div>

  <!--表头 -->
<div class="col-sm-12" style="text-align: center;">

    <table class="table table-bordered"  style="margin-bottom: 0px;background-color: white;">
  <col ms-repeat="tite" ms-css-width="el.wid"/>
     <tr ms-each-el="tite" style="background-color:rgb(240, 241, 243);" class="zi">
       <td>{{el.head}}</td>
     </tr>
   </table>

 </div>

 
<div class="col-xs-12" style="padding: 0;">
  <div style="height:350px;overflow:auto;overflow-x:hidden;">
  <!--河道表格 -->
    <div id="hd" class="col-xs-12" style="text-align: center;">
        <table class="table table-bordered" style="background-color: white;"  ms-each-ec="tabdata"> 
          <col ms-repeat-el="hedaotab" ms-css-width="el.wid"/>
           <tr>

             <td ms-repeat-tc="hedaotab" ms-on-tap="tc.val=='stnm'?hre(ec.stcd,ec.stnm,ec.type):null" class="zi"  rowspan="2">
                   <span ms-if="tc.val!='tm'&&tc.val!='wptn'" ms-class-1="red:tc.val=='z'&&ec['flag_cjx']=='1'" >{{ec[tc.val]}}</span>
                   <div ms-if="tc.val=='tm'">
                        <div class="zi co" style="padding-bottom: 2px;">{{ec[tc.val]|date("yy-MM-dd")}}</div>
                        <div class="zi" style="padding-top: 2px;">{{ec[tc.val]|date("HH时")}}</div>
                   </div>
                   <span ms-if="tc.val=='wptn'" ms-class="{{ec[tc.val]}}"></span>
            </td>
           </tr>
      </table>
    </div>

    <!--水库表格
    <div id="sk" class="col-sm-12" ms-visible="current=='shuiku'" style="text-align: center;">
          <table class="table table-bordered" style="background-color: white;"   ms-each-ec="shuiku"> 
             <col ms-repeat-el="shuikutab" ms-css-width="el.wid"/>
             <tr >
                <td ms-repeat-tc="shuikutab" ms-on-tap="tc.val=='stnm'?hre(ec.stcd,ec.stnm):null" class="zi" rowspan="2">
                    <span ms-if="tc.val!='tm'&&tc.val!='rwptn'">{{ec[tc.val]}}</span>
                    <span ms-if="tc.val=='rwptn'" ms-class="{{ec[tc.val]}}"></span>
                    <div ms-if="tc.val=='tm'">
                        <div class="zi co" style="padding-bottom: 2px;">{{ec[tc.val]|date("yy-MM-dd")}}</div>
                        <div class="zi" style="padding-top: 2px;">{{ec[tc.val]|date("HH时")}}</div>
                    </div>
                </td>
             </tr>
        </table>
    </div>-->
  </div>
</div>