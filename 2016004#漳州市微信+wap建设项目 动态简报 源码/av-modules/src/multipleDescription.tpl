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
       <tr  ms-repeat="raindatas" >
          <td > {{raindatas.gradetotal[$index]}} </td>
	      <td > {{raindatas.citynumtotal[$index]}} </td>
	      <td > {{raindatas.townnumtotal[$index]}} </td>
        </tr>
     <tbody>
</table>

全市共有<b> {{raindatas.allcity}} </b> 个县<b> {{raindatas.alltown}}  </b>个乡镇发生降雨。
<div ms-visible="raindatas.allcity != null">
    最大降雨出现在<b> {{raindatatext.maxname}} </b> ,为<b> {{raindatatext.maxval}} </b> 毫米.
    全市降雨超过<b> {{raindatatext.rainlevel}} </b> 毫米的雨量站有<b> {{raindatatext.rainlevelnum}} </b>个，分别是：
    <ol ms-repeat="raindatatext.rainleveladdress">
        <li>{{raindatatext.rainlevelname[$index] }}（{{el}}）{{raindatatext.rainlevelsum_val[$index]}}毫米；</li>
    </ol>
</div>
 <p>降雨情况统计分布图：</p>
 <div class="rain-chart">
        <img ms-attr-src="http://192.168.110.233:9996/RainfallIsoline/{{rainChart}}" alt="" />
        <ul ms-each="rainBar"><!--雨量条形图 -->
             <li >
               <div ms-css-background="el.color" >  </div>
                <span>{{el.num}} </span>
             </li>
        </ul>
  </div>

 <!--水情数据-->
 <h4>【水情】 </h4>
  <div class="river">
    <p>全市主要江河水位超警戒，超警戒水位的有：</p>
     <table class="table table-bordered text-center "  >
         <thead>
              <tr  ms-each="waterTitle ">
                  <th class=" text-center bg-primary  text-nowrap">{{el}}</th>
              </tr>
         </thead>
         <tbody >
            <tr ms-repeat="waterData">
              <td >{{el.stnm}}</td>
              <td >{{el.z}}</td>
              <td >{{el.wrz_fsltdz}}</td>
              <td class=" text-nowrap">{{el.tm}}</td>
            </tr>
         <tbody>
     </table>
  </div>

<div class="rsvrevs">
    <p>全市大中型水库超汛限水位的有：</p>
    <table class="table table-bordered text-center" >
      <thead>
           <tr  ms-each="reservoirTitle ">
               <th class=" text-center bg-primary  text-nowrap">{{el}}</th>
           </tr>
      </thead>
      <tbody >
         <tr ms-repeat="reservoirData">
           <td >{{el.stnm}}</td>
           <td >{{el.z}}</td>
           <td >{{el.wrz_fsltdz}}</td>
           <td class=" text-nowrap">{{el.tm}}</td>
         </tr>
      <tbody>
    </table>
</div
 <!--风情-->
 <h4>【风情】 </h4>
 <div class="typhoon">
    <div class="loading">
        <img ms-attr-src="{{xloading}}"  />
    </div>
    {{typhoon}}
 </div>
 <div class="wind">
    <p>当前我市沿海风力情况：</p>
     <table class="table table-bordered text-center" >
          <thead>
               <tr  ms-each="windTitle ">
                   <th class=" text-center bg-primary  text-nowrap">{{el}}</th>
               </tr>
          </thead>
          <tbody >
             <tr ms-repeat="windData">
               <td >{{el.name}}</td>
               <td >{{el.wind_power}}</td>
               <td >{{el.wind_dir}}</td>
             </tr>
          <tbody>
        </table>
 </div>

 <!--天气预报 -->
 <h4>【漳州市天气预报】 </h4>
 <p class="pad-b-15">{{weatherForecast}}</p>
