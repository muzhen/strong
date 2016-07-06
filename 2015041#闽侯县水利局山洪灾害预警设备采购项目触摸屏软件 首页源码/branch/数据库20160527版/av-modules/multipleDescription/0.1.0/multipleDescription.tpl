<!--雨情数据-->
<h4>【雨情】 </h4>
<p> {{ showTime}}，全省降雨情况统计：</p>
<table class="table table-bordered text-center" >
    <thead>
         <tr  ms-each="rainTitle ">
             <th class=" text-center bg-primary  text-nowrap">{{el}}</th>
         </tr>
    </thead>
    <tbody >
       <tr ms-repeat="rainData">
         <td >{{el.level}}</td>
         <td >{{el.num}}</td>
         <td >{{el.addvcd}}</td>
       </tr>
    <tbody>
</table>

 <!-- <p>文本案例： 全省有24个省（市）发生降雨，最大降雨出现在长乐市,累计雨量为250毫米：<br/><br/><br/></p>-->
 <p>{{rainText.str}}</p>

 <p>降雨情况统计分布图：</p>
 <div class="rain-chart">
        <!-- <img ms-attr-src="http://192.168.110.233:9995/RainfallIsoline/{{rainChart}}" alt="" />-->
        <img  ms-attr-src="{{imgShow}} "  alt=""/>
	<!--<img src="../av-modules/src/static/img/sea.jpg" alt=""/> -->
        <p> {{rainChart.url}}</p>
        <ul ms-each="rainBar"><!--雨量条形图 -->
             <li >
               <div ms-css-background="el.color" >  </div>
                <span>{{el.num}} </span>
             </li>
        </ul>
  </div>

 <!--水情数据-->
 <h4>【水情】 </h4>
 <p> <strong>  河道超警戒 ：（<span class="text-red">{{flag}}</span>个） </strong> </p>
 <table class="table table-bordered text-center" >
     <thead>
          <tr  ms-each="waterTitle ">
              <th class=" text-center bg-primary  text-nowrap">{{el}}</th>
          </tr>
     </thead>
     <tbody >
        <tr ms-repeat="waterData">
          <td >{{el.name}}</td>
          <td >{{el.num}}</td>
          <td >{{el.limitNum}}</td>
          <td class=" text-nowrap">{{el.time}}</td>
        </tr>
     <tbody>
 </table>

<p> <strong>  水库超汛限 ：（<span class="text-red">{{reservoirFlag}}</span>个） </strong> </p>
<table class="table table-bordered text-center" >
  <thead>
       <tr  ms-each="reservoirTitle ">
           <th class=" text-center bg-primary  text-nowrap">{{el}}</th>
       </tr>
  </thead>
  <tbody >
     <tr ms-repeat="reservoirData">
       <td >{{el.name}}</td>
       <td >{{el.num}}</td>
       <td >{{el.limitNum}}</td>
       <td class=" text-nowrap">{{el.time}}</td>
     </tr>
  <tbody>
</table>

 <!--天气预报 -->
 <h4>【天气预报】 </h4>
 <p class="pad-b-15">{{weatherForecast}}</p>
