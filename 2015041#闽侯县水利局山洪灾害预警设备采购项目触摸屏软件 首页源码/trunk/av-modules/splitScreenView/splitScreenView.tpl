<h1>{{sector}} <span class="pull-right ">{{showTime}}</span></h1>
<div  class="row" >

    <div class="col-sm-6  left-part" >

           <div class="row mar-0">
               <!--卫星云图 cloud -->
               <div class="com-sm-12   pad-15 pad-t-0"  ms-css-height="{{40}}%"   >
                   <img ms-attr-src="{{cloudSrc}}" alt="" />
                   <div class="mark-icon top-15" ms-click="cloudFun"></div>
                   <div class="latestTime top-15">{{showTime}}</div>
               </div>
               <!--台风路径typhoon -->
               <div class="col-sm-6  pad-15 pad-b-0"  ms-css-height="{{60}}%" >
                   <iframe src="http://www.istrongcloud.com:8001/release/index-lstf.html?popularize=false#route" height="100%" width="100%" frameborder="0"></iframe>
                   <div class="mark-icon right-35"  ms-click="typhoonFun"></div>
                   <div class="latestTime left-35">{{showTime}}</div>
               </div>
               <!--气象雷达-->
               <div class="col-sm-6  pad-15 pad-b-0"  ms-css-height="{{60}}%">
                   <img ms-attr-src="{{weatherSrc}}" alt=""/>
                   <div class="mark-icon right-35"  ms-click="weatherFun"></div>
                   <div class="latestTime left-35">{{showTime}}</div>
               </div>
           </div>
    </div>
        <!--雨量等值面及量级统计-->
        <div class="col-sm-6 right-part  pad-0"  >
            <div class=" content  ">
              <div class=" rain-chart" >

                   <img ms-attr-src="../av-modules/splitScreenView/static/img/{{ rainChart }}"  alt=""/>
                    <ul ms-each="rainData"><!--雨量条形图 -->
                      <li   >
                        <div ms-css-background="el.color" >
                        </div>
                         <span>{{el.num}} </span>
                      </li>
                    </ul>
            </div>
            <div class="  rain-info ">
                 <h3 class="text-center">今日降雨实况</h3>
                 <ul  ms-each="cloudData" class="row">
                     <li class="col-sm-6">
                         {{el.level_name}}<small>{{el.level_num}}</small>
                         <span class="pull-right">{{el.value}}</span>
                     </li>
                 </ul>
                 <p>{{rainText.str}}
                 </p>
            </div>
            <div class="mark-icon  "  ms-click="rainFun"></div>
            <div class="latestTime ">{{showTime}}</div>
        </div>
    </div>
</div>