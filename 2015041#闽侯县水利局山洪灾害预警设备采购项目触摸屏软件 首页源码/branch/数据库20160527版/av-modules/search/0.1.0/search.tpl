
<div class="col-xs-12 clos">
	<span class="glyphicon glyphicon-remove-circle"  ms-on-tap="closeclick"></span>
</div>
<div id="datum" class="col-xs-12" style="padding:0">
<!--类型文本框-->
<div id="typ" class="col-xs-12 marbo pad">
	<div class="col-xs-3 pato">
	    <label>类型:</label>
	</div>
	<div class="col-xs-9 pad">
	     <select id="selval" class="secl" ms-each="selecdata">
                 <option>{{el.name}}</option>
         </select>
	</div>
</div>
<!--标题文本框-->
<div class="col-xs-12 marbo pad">
	<div class="col-xs-3 pato">
	    <label>标题:</label>
	</div>
	<div class="col-xs-9 pad">
	    <input id="put" type="text" class="form-control" placeholder="输入标题"/>
	</div>
</div>
</div>
<!--时间段文本框-->
<div id="setim" class="col-xs-12 marbo pad">
	<div class="col-xs-3 pato">
	    <label>时间段:</label>
	</div>
	<div class="col-xs-9 pad">
	 <label>
	 	<input id="start" type="text" class="form-control inp" placeholder="Text input" ms-on-tap="inputclick" readonly/>
	 	<label>至</label>
	 	<input id="end" type="text" class="form-control inp" placeholder="Text input" ms-on-tap="inputclick" readonly/>
         <input id="mobiDate" placeholder="Please Select ..." style="display:none"/>
    </label>  
    </div>
</div>


<div class="col-xs-12 pad" style="text-align: center;" ms-on-tap="selectclick">
	<button type="button" class="btn btn-info" style="width:83%;">搜索</button>
</div>