 CDN:
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>jQuery EasyUI</title>
    <link rel="stylesheet" type="text/css" href="http://www.jeasyui.net/Public/js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="http://www.jeasyui.net/Public/js/easyui/themes/icon.css">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="http://www.jeasyui.net/Public/js/easyui/jquery.easyui.min.js"></script>
 
 JS::
 
  $('#tt').datagrid({
            url: 'data/water.json',
            method: 'get',
            //  title: '水情表',
            // iconCls: "icon-save",//标题图标, 一个CSS类，将提供一个背景图片作为标题图标
            border: true,// 表格是否出现边框，默认是出现的。false 时不出现
            height: 400,
            width: 600,
            fitColumns: true,// fit选项如果设置为true，折叠容器的大小将填充父容器。fitColumns设置为true,自动扩展或收缩列的大小以适应网格宽度和防止水平滚动条
            nowrap: true,// :当true时，显示数据在同一行上。默认true。
            pagination: true,
            pageNumber: 1,// 当设置分页属性时，初始化的页码编号。默认从1开始
            pageSize: 20,//分页大小
            pageList: [5, 10, 15, 20],//每页的个数
            rownumbers: true,//添加一列来显示行号。
            columns: [[

                {
                    field: ' ', //列数据
                    title: '站名', //列标题
                    width: 80,
                    align: 'center',
                    checkbox: true//复选
                },
                {
                    field: 'addvcd', //列数据
                    title: '站名', //列标题
                    width: 80,
                    align: 'center',
                    editor: {//是否可编辑
                        type: 'validatebox',//text,textarea,checkbox,numberbox,validatebox,datebox,combobox,combotree
                        options: {//必须校验
                            required: true,
                            min: 0,
                            precision: 0
                        }
                    }
                },
                {
                    field: 'warn_stage',
                    title: '警戒水位',
                    width: 120,
                    align: 'center'
                },
                {
                    field: 'new_stage',
                    title: '最新水位',
                    width: 90,
                    align: 'center',
                    styler: function (value, row, index) {
                        if (value < 20) {
                            return 'background-color:#ffee00;color:red;';
                        }
                    }
                },
                {field: 'new_tm', title: '最新水位时间', width: 80, align: 'center'},
                {field: 'max_stage', title: '最大水位', width: 250, align: 'center'},
                {field: 'max_tm', title: '最大水位时间', width: 60, align: 'center'}
            ]],

        });
        
        
        
        
        
        
        
HTML:        
<!--搜索栏-->
<div id="tb" style="padding:3px">
    <span>站名:</span>
    <input id="addvcd" style="line-height:26px;border:1px solid #ccc">
    <span>警戒水位:</span>
    <input id="warn_stage" style="line-height:26px;border:1px solid #ccc">
    <a href="#" class="easyui-linkbutton icon-search" plain="true" onclick="doSearch()">Search</a>
</div>

<!-- 表里的Footer数据显示 showFooter: true-->
<table  id="tt" class="easyui-datagrid" style="width:700px;height:450px"
       data-options="
	   rownumbers:true,
	   border:false,
	   pagination: true,
	   singleSelect:true,
	   url:'data/water.json',
	   method:'get',
	   toolbar:toolbar,
	   onLoadSuccess:onLoadSuccess,
	   styler:cellStyler,
	   showFooter: false
	   ">

    <!--<thead>
    <tr>
        <th data-options="field:'addvcd',width:80">Item ID</th>
        <th data-options="field:'warn_stage',width:100">Product</th>
        <th data-options="field:'new_stage',width:80,align:'right'">List Price</th>
        <th data-options="field:'new_tm',width:80,align:'right'">Unit Cost</th>
        <th data-options="field:'max_stage',width:240">Attribute</th>
        <th data-options="field:'max_tm',width:60,align:'center'">Status</th>
    </tr>
    </thead>-->

    <!--固定列的-->
    <thead data-options="frozen:true">
    <tr>
        <th data-options="field:'addvcd',width:80">站名</th>
        <th data-options="field:'warn_stage',formatter:formatPrice,resizable:false" width="15%">警戒水位</th>
    </tr>
    </thead>
    <thead>
    <tr>
        <th data-options="field:'new_stage' ,align:'right',halign:'center',resizable:false" width="15%">最新水位</th>
        <th data-options="field:'new_tm' ,align:'right',width:260">最新水位时间</th>
        <th data-options="field:'max_stage' ,resizable:false" width="15%">最大水位</th>
        <th data-options="field:'max_tm', align:'center',halign:'center',width:260,">最大水位时间</th>
        <th data-options="field:'new_stage' ,align:'right',halign:'center',resizable:false" width="15%">最新水位</th>
        <th data-options="field:'new_tm' ,align:'right',width:260" >最新水位时间</th>
        <th data-options="field:'max_stage',resizable:false" width="15%">最大水位</th>
        <th data-options="field:'max_tm',align:'center',halign:'center',width:260">最大水位时间</th>
        <th data-options="field:'new_stage', align:'right',halign:'center',resizable:false" width="15%">最新水位</th>
        <th data-options="field:'new_tm',width:180, align:'right'">最新水位时间</th>
        <th data-options="field:'max_stage' ,resizable:false" width="15%">最大水位</th>
        <th data-options="field:'max_tm',width:260,align:'center',halign:'center'">最大水位时间</th>
    </tr>
    </thead>

    <!--表格标题合并-->
    <!--<thead>
    <tr>
        <th data-options="field:'itemid',width:80" rowspan="2">Item ID</th>
        <th data-options="field:'productid',width:100" rowspan="2">Product</th>
        <th colspan="4">Item Details</th>
    </tr>
    <tr>
        <th data-options="field:'listprice',width:80,align:'right'">List Price</th>
        <th data-options="field:'unitcost',width:80,align:'right'">Unit Cost</th>
        <th data-options="field:'attr1',width:240">Attribute</th>
        <th data-options="field:'status',width:60,align:'center'">Status</th>
    </tr>
    </thead>
-->

</table>


<script type="text/javascript">
    //工具栏
    var toolbar = [
        {
            text: 'Add',
            iconCls: 'icon-add',
            handler: function () {
                alert('add')
            }
        }, '-', {
            text: 'Cut',
            iconCls: 'icon-cut',
            handler: function () {
                alert('cut')
            }
        }, '-', {
            text: 'Save',
            iconCls: 'icon-save',
            handler: function () {
                alert('save')
            }
        }, '-', {
            text: 'search',
            iconCls: 'icon-search',
            handler: function () {
                alert('search');
            }
        }
    ];

    //单元格内数据处理
    function cellStyler(value, row, index) {
        if (value < 30) {
            return 'background-color:#ffee00;color:red;';
        }
    }
    //某列的数据处理
    function formatPrice(val, row) {
        if (val > 30) {
            return '<span style="color:pink;">(' + val + ')</span>';
        } else {
            return val;
        }
    }
    //搜索栏
   // 'load' 方法来加载新的数据网格（datagrid）数据。我们需要传递 'itemid' 和 'productid' 参数到服务器
    function doSearch() {
        $('#tt').datagrid('load', {
            addvcd: $('#addvcd').val(),
            productid: $('#addvcd').val()
        });
    }
    //合并单元格的
    function onLoadSuccess(data) {
        var merges = [{
            index: 2,
            rowspan: 2
        }, {
            index: 5,
            rowspan: 2
        }, {
            index: 7,
            rowspan: 2
        }];
        for (var i = 0; i < merges.length; i++) {
            $(this).datagrid('mergeCells', {
                index: merges[i].index,
                field: 'addvcd',
                rowspan: merges[i].rowspan
            });
        }
    }
</script>
 
