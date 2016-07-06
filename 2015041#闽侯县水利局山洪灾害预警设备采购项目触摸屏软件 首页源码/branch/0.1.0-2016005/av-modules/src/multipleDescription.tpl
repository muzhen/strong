<!--雨情数据-->
<h2 class="text-center">漳州市渔业防台风{{formName}}情况统计表</h2>

<form action="" >
    <div class="pad-b-15">
      <span> 填报单位: <input   ms-duplex="unit"   data-duplex-changed="unitchange"/> 海洋与渔业局  </span>                  <span class="pull-right"> 填报时间： <input type="text" class="width-50" />年 <input type="text" class="width-50" />月 <input type="text" class="width-50" />日  <input type="text" class="width-50" />时  </span>
     </div>
    <table class="table table-bordered text-center" >
        <thead>
            <tr>
                <th rowspan="2" class="bor-b-0 obliqueLine" style="    position: relative;"> 地区</th>
                <th colspan="4" class="bor-b-0">{{title}}</th>
            </tr>
            <tr  ms-each="tableName">
                <th class="bor-b-0">{{el}}</th>
            </tr>
        </thead>
        <tbody >
            <tr ms-repeat="addData">
                <td >{{el.addvcd}}</td>
                <td ><input type="text"/>  </td>
                <td > <input type="text"/> </td>
                <td > <input type="text"/> </td>
                <td > <input type="text"/> </td>
            </tr>
        <tbody>
    </table>
    <p class="text-left pad-b-15">备注:请按闽海渔[  <input ms-duplex="string"> ]号传真电报要求，漳州市{{tipPoint}}务必于  <input type="text" class="width-50" /> 年 <input type="text" class="width-50"/> 月 <input type="text" class="width-50" />日  <input type="text" class="width-50" /> 时之前全部就近进港避风。于  <input type="text" class="width-50" />年 <input type="text" class="width-50"/>月  <input type="text" class="width-50"/>日 <input type="text" class="width-50"/>时开始上报，每小时上报一次。</p>

    <div class="pad-b-15">
      <span> 带班领导签名： <input type="text" ms-duplex="leader" /> </span>                  <span class="pull-right"> 值班人员签名： <input type="text"/>   </span>
     </div>
    <input type="submit" value="提交" />
      <button ms-click="log">打印出来</button>
</form>

    <br/>
    <br/>
    <br/>
    <p>填报单位:{{unit}}；{{unitchangetxt}}</p>
    <p>请按闽海渔号:{{string}}</p>
    <p>带班领导：{{leader}}</p>


    <h3>计算：</h3>
     <input ms-duplex-number="a"> +  <input ms-duplex-number="b"> = {{a + b}}
