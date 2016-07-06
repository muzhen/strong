
<!--获取所有的行政区码-->
<ul id="demo" style="display:none">
	<li ms-repeat-el="area" ms-data-val="el.code" data-repeat-rendered="load">{{el.name}}
		<ul>
			<li ms-repeat-zz="el.child" ms-data-val="zz.code" >{{zz.name}}
				<ul>
					<li ms-repeat-ss="zz.child" ms-data-val="ss.code" >{{ss.name}}</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>

<!--省、市、县/区标签-->

<div class="row" style="padding-top: 9px;padding-bottom: 4px;">
    <div class="col-xs-4 col-sm-4 pa">
        <!--<label class="font" id="shen"  ms-on-tap="clickshen">22</label>-->
        <input id="shen" type="text" class="borqh font" ms-on-tap="clickshen" readonly/>
    </div>
    <div class="col-xs-4 col-sm-4 pa" ms-on-tap="clickshen">
        <!--<label class="font" id="shi">33</label>-->
        <input id="shi" type="text" class="borqh font" ms-on-tap="clickshen" readonly/>
    </div>
    <div class="col-xs-4 col-sm-4 pa" ms-on-tap="clickshen">
        <!--<label class="font" id="qu">44</label>-->
         <input id="qu" type="text" class="borno font " ms-on-tap="clickshen" readonly/>
    </div>
  
</div>