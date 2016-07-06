
define(["avalon", "jquery", "mobiscroll", "css!mobiscroll.css",'css!bootstrap.css', 'css!area.css'], function (avalon, $, mobiscroll) {
  var areaShow = {
    options: {
      clid:"",
      dataUrl:require.toUrl('area')+'.json'
    },
    /*
      初始化函数参数
    options--传人参数，例如:options.clid
    */
    init: function (options) {
      areaShow.options = $.extend(areaShow.options,options);
      var vm = avalon.define({
        $id: options.clid,
        area: [],//存放所有的行政区划
        shen: null,//省
        shi: null,//市
        qu: null,//县或区
        xzqhSelect:areaShow.options.xzqhSelect,//承载页传人的方法
        /*
         初始化函数参数
         options--传人数据，例如：result.area
         */
        init: function () {//初始化加载所有的行政区划
          $.getJSON(areaShow.options.dataUrl, function (result) {
            vm.area = result.area;
          });
        },
        load: function () {
		   $(function () {  
					$('#demo').mobiscroll().treelist({
						  theme: 'mobiscroll',
						  setText: '确定', //确认按钮 
						  cancelText: '取消', //取消按钮名 
						  labels: ['省', '市', '区/县'],
						  showLabel:true,//是否显示labels  
						  tap:true, 
						  onSelect: function (valueText, inst) {
						  var addvcd = vm.change(valueText);
						  vm.xzqhSelect(addvcd);//承载页函数传人参数--行政区码
					  }
					});
			});

        },
        clickshen: function () {//点击省或市或县/区的label
          $('#demo').mobiscroll('show');//显示滚动的行政区划选择
          return false;
        },
        /*
          实现将编码转换为对应的省、市、县\区
          参数s:行政区划编码
       */
        change: function (s) {

				  var st = s.split(" ");
				  var shen1 = st[0];
				  var shi1 = st[1];
				  var qu1 = st[2];
				  var addvcd = shen1 + shi1 + qu1;
				  for (var i = 0; i < vm.area.length; i++) {
					if (vm.area[i].code == shen1) {
					  shen1 = vm.area[i].name;
					  for (var x = 0; x < vm.area[i].child.length; x++) {
						if (vm.area[i].child[x].code == shi1) {
						  shi1 = vm.area[i].child[x].name;
						  for (var z = 0; z < vm.area[i].child[x].child.length; z++) {
							if (vm.area[i].child[x].child[z].code == qu1) {
							  qu1 = vm.area[i].child[x].child[z].name;
							  break;
							}
						  }
						  break;
						}
					  }
					  break;
					}
				  }
				  vm.shen = shen1;
				  vm.shi = shi1;
				  vm.qu = qu1;
				  //$('#shen').html(shen1);
				  //$('#shi').html(shi1);
				  //$('#qu').html(qu1);
				  $('#shen').val(shen1);
				  $('#shi').val(shi1);
				  $('#qu').val(qu1);
				  return addvcd;

			}

      });
      return vm;
    }
  }
  return areaShow;
});
