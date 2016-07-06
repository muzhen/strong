
<!--<div class="col-sm-12 " >
                  Swiper -->
<!--头部轮播图片-->
<div class="swiper-container"  style="overflow:hidden;">
        <div  class="swiper-wrapper" ms-each="lbimg" data-each-rendered="swiperFun">
            <div class="swiper-slide" ><img ms-attr-src="el.image_path" class="imghw"></div>
        </div>
        <!-- Add Pagination 
        <div class="swiper-pagination"></div>-->
        <!-- Add Arrows 
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>-->
</div>   

<!--中部标题-->
<div id="dis1" class="col-sm-12 bti" >
        <div style="background-color:rgba(0, 114, 255, 0.69);border-radius: 3px;padding-top: 9px;margin-top: 5px;">
             <img src="../av-modules/imageList/0.1.0/static/img/xh.jpg">
             <p class="tit">{{midTitle}}</p></a>
        </div> 
</div>
<div id="dis2" class="col-sm-12" style="padding: 0;">
    <div  class="col-sm-12 bti1" >
            <div style="margin-top: 5px;">
                 <p class="tit1">常用资料</p></a>
            </div> 
    </div>
    <!-- 页签选择-->
    <div class="swiper-container1" style="height:45px;margin-top: 0px;margin-bottom: 0px;overflow: hidden;">
      <div id="tite" class="swiper-wrapper" ms-each="yeqian" data-each-rendered="swiperFun2">
        <div class="swiper-slide bor" ms-attr-data-type="el.type" ms-on-tap="conmclick(this.getAttribute('data-type'))">{{el.name}}</div>
      </div>
    </div>
</div>
<!--列表-->
<div class="col-sm-12 pad">
                  
       <ul style="list-style: none;" ms-each="listinf" >
              <li class="xt" ms-on-tap="hre(el.typeid)"ms-css-background-color="el.bgcolor"  ms-class-1="bgco:el.bgcolor==null"  style="border-radius: 3px;margin-bottom: 6px;border-bottom: 1px solid #BDCAD2;">
                  <!--<a ms-attr-href="'../../../title-txt/trunk/examples/slgy.html?s='+el.warning_id" class="as">-->
                     <ul style="list-style: none;padding:6px;overflow: hidden;">
                        <li class="lf" style="width:25%;height:80px;"><img class="minimg" ms-class-1="disp:el.image_path==null" ms-attr-src="el['image_path']==undefined?'':el['image_path']"  >
                        </li>
                        <li class="lf" style="width:65%;height:80px;font-size:14px;">
                            <span class="font over">{{el.title}}</span>
                            <span class="blo tim">{{el.release_time}}</span>
                        </li>
                        <li class="rf fw" ms-class-1="padd:el.sm_img==null">
                          <span class="glyphicon glyphicon-menu-right bfc" ms-css-color="el.color"></span>
                           <img ms-class-1="disp1:el['sm_img']==undefined"  ms-attr-src="el['sm_img']==undefined?'':el['sm_img']" class="tup">
                        </li>
                     </ul>
                  
              </li>   
       </ul>
                        
</div> 

<!--搜索图片-->
 <img id="img" src="../av-modules/imageList/0.1.0/static/img/Search.jpg" class="sec" ms-on-tap="imgclick">
<!--弹出搜索组件-->
  <div id="light" class="white_content" style="padding-left: 0;">
        <div  ms-controller="mySearCh" ms-include-src="{{tplsec}}"  data-include-rendered="funcSec" ></div>
  </div>
<div id="fade" class="black_overlay">
</div>   
