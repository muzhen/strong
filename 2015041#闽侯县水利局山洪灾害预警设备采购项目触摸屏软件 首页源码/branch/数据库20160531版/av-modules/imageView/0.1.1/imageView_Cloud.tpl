 <!--城市页签-->
 <!-- <div class="col-sm-12 " > 
       <div class="swiper-container" style="height:35px;">
          <div id="borsty" class="swiper-wrapper">
                <div class="swiper-slide ra satellite-normal" ms-on-tap="addrclick('风云二号')" ms-class-1="satellite-action:currentYT=='风云二号'">风云二号</div>
                <div class="swiper-slide ra satellite-normal" ms-on-tap="addrclick('广东')" ms-class-1="satellite-action:currentYT=='广东'">广东</div>
                <div class="swiper-slide ra satellite-normal" ms-on-tap="addrclick('日本')" ms-class-1="satellite-action:currentYT=='日本'">日本</div>

          </div>
      </div>
</div>-->
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" > 
       <div class="swiper-container" style="height:35px;">
          <div id="borsty" class="swiper-wrapper" ms-each="AllTitle">
                <div class="swiper-slide ra satellite-normal" ms-on-tap="addrclick(el)" ms-class-1="satellite-action:currentYT==el">{{el}}</div>
          </div>
      </div>
</div>

<!-- 图片+按钮 -->
<div style="background: #42d692; width: 100%; height: 245px;overflow:hidden;">
    <div id="hit" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 " style="padding: 0;"> 
         <img ms-attr-src="scc" style="width:100%;height:245px;">
    </div>
</div>
<table class="table table-bordered">
          <tr style="text-align: center;font-size: xx-large;">
             <td  style="height:65px;color: #00ABFF;vertical-align: middle;"><span ms-on-tap="clickleft" class="glyphicon glyphicon-menu-left" ms-css-opacity="op"></span></td>
             <td style="height: 65px;color: #00ABFF;vertical-align: middle;"><span ms-on-tap="clickstop" ms-class="{{sp}}"></span></td>
             <td style="height: 65px;color: #00ABFF;vertical-align: middle;"><span ms-on-tap="clickright"class="glyphicon glyphicon-menu-right" ms-css-opacity="op"></span></td>
         </tr>
</table>

<!-- 存放8张小图片的轮播页签 -->
<div class="swiper-container1" style="overflow-x: hidden;">
  <div class="swiper-wrapper">
    <div class="swiper-slide" ms-repeat-el="ig" data-repeat-rendered="swiperFun2" style="position:relative;margin-right:20px;">
     
      <div id="widrow" class="row" style="text-align: center;margin: auto;width:100%;position:absolute;left:0;top:0;">

          <div class="divhw" ms-repeat-elem="el" ms-attr-id="$index+pageNum*$outer.$index" ms-on-tap="clickImg($index+pageNum*$outer.$index)">
            <img ms-attr-src="elem.image_path" class="imghw" ms-css-width="wid" ms-css-height="wid">
            <p style="margin-bottom:0;">{{elem.tm}}</p>
          </div> 

      </div>

    </div>

  </div>
</div>
  



 
