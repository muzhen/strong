
<!-- 轮播图片 -->
<div class="swiper-container" style="overflow:hidden;min-height: 150px;">
    <div  class="swiper-wrapper" ms-each="lbimg" data-each-rendered="swiperFun">
        <div class="swiper-slide" ><img ms-attr-src="el.image_path" class="imghw"></div>
    </div>
</div>   


<!--页签选择-->
<div id="mode" class="swiper-container1" style="height:46px;overflow:hidden;margin-top: 0;margin-bottom: 0;position: absolute; top: 154px;">
    <div class="swiper-wrapper"  ms-each="list" data-each-rendered="swiperFun2">
        <div class="swiper-slide ra" ms-on-tap="onclick(this.id)" ms-attr-id="$index" style="display: block;padding-top: 10px;">
             <h3 style="margin-top: 0;margin-bottom: 0;font-size: 20px;">{{el}}</h3>
             <h4 style="visibility: hidden;margin-top: 0;margin-bottom: 0;"><span class="glyphicon glyphicon-triangle-top"></h4>          
       </div>
   </div>
 
</div>


<!--显示菜单表格-->
<div style="background-color: white;text-align: center;overflow: hidden;">
      <div class="col-xs-6 col-sm-6"   ms-repeat-el="show" style="border-right: 1px solid rgba(128, 128, 128, 0.17);border-bottom: 1px solid rgba(128, 128, 128, 0.17);padding-top: 20px;padding-bottom: 12px;">
           <a ms-attr-href="el.menu_path"><img ms-attr-src="el.image_path" style="width: 60px;height: 60px;">
           <p style="font-size:15px;font-family:微软雅黑;">{{el.menu_name}}</p></a>
      </div>
</div>
  