    <!-- 雷达图 -->
    <div class="ms-tabs " ms-if="currentIndex === 0">
         <div class="swiper-container radar">
             <div class="swiper-wrapper"  ms-each="radardata" data-each-rendered="slideImgFn">
                 <div class="swiper-slide"  >
                     <img ms-attr-src="{{imgpart}}/radar/{{el.name}}" alt=""/>
                 </div>
             </div>
         </div>
    </div>

    <!-- 云图 -->
    <div class="ms-tabs" ms-if="currentIndex === 1">
        <div class="swiper-container cloud">
             <div class="swiper-wrapper"  ms-each="clouddata" data-each-rendered="slideImgFn1">
                 <div class="swiper-slide"  >
                     <img ms-attr-src="{{imgpart}}/cloud/{{el.name}}" alt=""/>
                 </div>
             </div>
         </div>
    </div>

    <!-- 台风 -->
    <div class="ms-tabs" ms-if="currentIndex === 2">
        <iframe src="http://120.27.49.192:8002/release/index.html#route" frameborder="0" style="height:100%; width:100%"></iframe>
    </div>
    <footer>
        <div ms-repeat="tabs"  ms-click="toggle($index)">
            <span ms-css-background-image="url({{imgpart}}/img/{{el.icon}})"> 
            </span>
            {{el.name}}
        </div>
    </footer>


