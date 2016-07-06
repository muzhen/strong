<!--雨情数据-->
<p> {{ showTime}}，降雨情况统计分布图：</p>
<div class="rain-chart">
      <!-- <img ms-attr-src="http://192.168.110.233:9996/RainfallIsoline/{{rainChart}}" alt="" />-->
    	<img  ms-attr-src="{{imgShow}} "  alt=""/><!-- 雨情 等值面图显示用的 -->
        <ul ms-each="rainBar"><!--雨量条形图 -->
            <li >
               <div ms-css-background="el.color" > </div>
                <span>{{el.num}} </span>
            </li>
       </ul>
 </div>