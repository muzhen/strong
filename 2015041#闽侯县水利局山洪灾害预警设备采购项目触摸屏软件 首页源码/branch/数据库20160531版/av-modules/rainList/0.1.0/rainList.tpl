

<!-- 轮播图片 -->
<div class="swiper-container" style="overflow: hidden;  min-height: 150px;">
  <div  class="swiper-wrapper" ms-each="lbimg" data-each-rendered="swiperFun">
    <div class="swiper-slide" ><img ms-attr-src="el.image_path" class="imghw"></div>
  </div>
</div>   


<!-- 行政区划选择 -->
<div  class="col-xs-12 " style="padding-left: 0;padding-right: 0;">
  <div  ms-controller="cityx" ms-include-src="{{tplm}}"  data-include-rendered="xzqhlist" style="overflow:hidden;"></div>
</div>




<!-- 时间段 -->
<div class="col-xs-12 " style="padding-left: 0;padding-right: 0;">
  <div class="time" style="background-color: rgb(245, 245, 245);"><p style="display: inline;">{{startime}}</p><p style="display: inline;">~{{endtime}}</p></div>
</div>


<!-- 页签选择-->
<div class="swiper-container1" style="height:45px;margin-top: 0px;margin-bottom: 0px;overflow: hidden;">
  <div id="sign" class="swiper-wrapper">
    <div class="swiper-slide ra bor" ms-repeat-el="yeqian" ms-attr-id="el.id" ms-on-tap="hdskclick(this.id,this.id,0)">{{el.name}}</div>
    
  </div>
</div>




<!-- 雨量统计子页签 -->
<div class="col-xs-12 " id="tj" style="margin-bottom: 8px;margin-top: 8px;display:none;" >
  <div id="smign" style="border: 2px solid #00B8FF;border-radius: 5px;overflow: hidden;" ms-each="smyeq">
    <div class="col-xs-4 sty" ms-attr-id="el.id" ms-on-tap="hdskclick(this.id,'yltj',1)">
      {{el.name}}
    </div>
  </div>
</div>

<!-- 搜索输入框 -->
<div id="ss" class="col-xs-12 " style="width: 100%;text-align: center;margin-bottom: 5px;margin-top: 7px;" >
  <div style="border-radius: 6px;color: white;font-size: 17px;">
    <input id="sous"  type="text" class="form-control" style="background-color: #DAD5D5;"   placeholder="搜索" ms-click="bgcolor(this.id)" ms-on-keypress="souschange(this.id,this.event)" >
  </div>
</div>


<!-- 表头 -->
<div class="col-xs-12" style="text-align: center;">
  <table class="table table-bordered"  style="margin-bottom: 0px;background-color: white;">
    <col ms-repeat="tite" ms-css-width="el.wid"/>
    <tr ms-each-el="tite" style="background-color: rgb(240, 241, 243);" class="zi">
      <td>{{el.head}}</td>
    </tr>
  </table>
</div>



  <!-- 雨量信息表格 --> 
<div class="col-xs-12">
  <div id="tabdis"  style="height:350px;overflow:auto;overflow-x:hidden;">

    <div id="xxtab" class="col-xs-12 tdd" ms-visible="tabId=='xxtab'">
      <table class="table table-bordered"  ms-each-ec="ylxx" style="background-color: white;"> 
        <col ms-repeat-el="inftab" ms-css-width="el.wid"/>
        <tr  class="zi">
          <td class="wor" ms-repeat-tc="inftab" ms-on-tap="tc.val=='stnm'?hre(ec.stcd,ec.stnm):null" >{{ec[tc.val]}}</td>

         <!-- <td class="wor" >{{el.adnm}}</td>
          <td ms-on-tap="hre(el.stcd,el.stnm)" class="wor" >{{el.stnm}}</td>
          <td class="wor" >{{el.yestsumdrp}}</td>
          <td class="wor">{{el.todaysumdrp}}</td>-->
        </tr>
      </table>
    </div>

    <!-- 雨量统计表格 -->
    <div id="tjtab" class="col-xs-12 tdd" ms-visible="tabId=='tjtab'">
        <table class="table table-bordered"  ms-each-ec="yltj" style="background-color: white;"> 
          <col ms-repeat-el="countab" ms-css-width="el.wid"/>
          <tr class="zi" >
            <td class="wor" ms-repeat-tc="countab">{{ec[tc.val]}}</td>
          </tr>
        </table>
    </div>

    <!-- 区域最大表格 -->
    <div id="zdtab" class="col-xs-12 tdd" ms-visible="tabId=='zdtab'">
      <table class="table table-bordered"  ms-each-ec="qyzd" style="background-color: white;"> 
        <col ms-repeat-el="areatab" ms-css-width="el.wid"/>
        <tr class="zi">
          <td class="wor" ms-repeat-tc="areatab">{{ec[tc.val]}}</td>
        </tr>
      </table>
    </div>


    <!-- 平均雨量表格 -->
    <div id="pjtab" class="col-xs-12 tdd" ms-visible="tabId=='pjtab'">
        <table class="table table-bordered"  ms-each-ec="pjyl" style="background-color: white;"> 
           <col ms-repeat-el="avgetab" ms-css-width="el.wid"/>
          <tr class="zi">
            <td class="wor" ms-repeat-tc="avgetab">{{ec[tc.val]}}</td>
          </tr>
        </table>
    </div>
 </div>
</div>