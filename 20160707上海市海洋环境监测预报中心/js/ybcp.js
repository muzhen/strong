avalon.ready(function(){
	var vm=avalon.define({
		$id:"shvm",
		gt:">",
		logoImg:"img/logo.png",
		aa:"sd",
		liList:["首页","单位简介","新闻","海洋预警","预报产品","专项服务","政策法规","海洋科普"],
		navActive:function(){
			$(".navWrap ul li")[4].className="nav_active";
		},
		dz:"上海市海洋环境监测预报中心龙华西路241号200232",
		cz:"传真:64570063",
		dh:"电话:64572890",
		xx:"网管信箱:mxhhxm2002@yahoo.com.cn",
		syr:"上海市水文总站版权所有沪ICP",
		bei:"备12029956号",
		cgyb:"遥感产品",//侧边栏一级菜单
		szyb:"海洋气象",//侧边栏一级菜单
		stopPropagation:function(event){
            event = event || window.event;
            event.stopPropagation();
        },
		dqwz:"当前位置:",
		sy:"首页",
		ybcp:"专项服务",
		yulx:"遥感产品",
		xxyb:"静止气象卫星产品",
        linkSY:function(){
			window.open('main.html','_self');
		},
		thirdListView:1,
		cgybList:[{"text":"静止气象卫星产品"},{"text":"MODIS产品"}],//侧边栏一级菜单
		szybList:[{"text":"卫星云图"},{"text":"天气图"},{"text":"台风路径"}],//侧边栏一级菜单

		staticList:["IR1","IR2","IR3","VAP","VIS"],//主内容的右边菜单 遥感产品》静止气象卫星产品
		staticselect:"IR2",

		modistitle:"MODIS产品",
		modisList:["TSM","SST","SD","CHLOR_A"],//主内容的右边菜单 遥感产品》MODIS页面
		modisselect:"CHLOR_A",

		oceanWeather:"海洋气象",//海洋气象
		satelliteCloudImage:"卫星云图",//海洋气象>卫星云图
		cloudimageselect:"风云二号",
		cloudImageList1:[
			{
				"title":"风云二号",
				"list":["风云二号"]
			}
		],
		cloudImageList2:[
			{
				"title":"日本",
				"list":["红外线","可见光","水汽"]
			}
		],

		weathertitle :"天气图",//海洋气象>天气图
		weatherselect:"实况图",
		weatherList1:[
			{
				"title":"日本",
				"list":["实况图","预报图"]
			}
		],
		weatherList2:[
			{
				"title":"欧洲中心",
				"list":["实况图","预报图"]
			}
		],

		typhoontitle:"台风路径",
		secondListClick:function(index){
			var div=$(".second_list");
				for(var i=0; i<div.length; i++){
					div[i].className="second_list second_normal";
				}
			if(index==vm.thirdListView){
				vm.thirdListView=0;
				this.className="second_list second_xz";
			}else{
				vm.thirdListView=index;	
				this.className="second_list second_active";
			}
		},

		currentIndex: 0,
		cgybListClick:function(index){//左边侧边栏一级菜单 遥感产品
			vm.currentIndex = index;

		},
		currentIndexOC : 0,
		szybListClick:function(index){////左边侧边栏一级菜单 海洋气象
			index = index + 2;
			vm.currentIndex = index;
		},
		fxcpListClick:function(index){
			vm.thirdListClick();
		},
		thirdListClick:function(){

		},

		modisyearlist:[],//modis的时间
		modisyearselect:"",
		staticyearlist:[],//static的时间
		staticyearselect:"",
		yearFn:function(){//年
			var years=[];
			var tm = new Date();
			var year = tm.getFullYear();
			for(var i = year; i >= 2000 ; i--){
				years.push(i);
			}
			vm.modisyearselect = year;
			vm.modisyearlist = years;
			vm.staticyearselect = year;
			vm.staticyearlist = years;
		},

		modismonthlist:[],
		modismonthselect:"",
		staticmonthlist:[],
		staticmonthselect:"",
		monthFn:function(){//月
			var months=[];
			var tm = new Date();
			var month = tm.getMonth() +1;
			month = month <10 ? "0"+month :month;
			for(var i = 1; i<= 24 ; i++){
				i = i >= 10 ? i :"0"+ i;
				months.push(i);
			}
			vm.modismonthselect = month;
			vm.modismonthlist = months;
			vm.staticmonthselect = month;
			vm.staticmonthlist = months;
		},

		select: "2秒",//播放定时
		selectcb: "",
		selectchange: function(a) {
			vm.selectcb = a
		},
		staticimg:[],//静止气象图片
		staticimgurl:[],
		modisimg:[],// modis
		modisimgurl:[],
		cloudimg:[],//卫星云图
		cloudimgurl:[],
		weatherimg:[],//天气
		weatherimgurl:[],
		typhoonimg:[],//台风
		cloudimagetime:"",
		cloudimagetimeSlot:"",
		weathertime:"",
		weathertimeSlot:'',
		times:function(){//默认显示时间
			var tm = new Date();
			var year = tm.getFullYear(); //getFullYear getYear
			var month = tm.getMonth();
			var day = tm.getDate();
			month = month + 1;
			if (month < 10) month = "0" + month;
			if (day < 10) day = "0" + day;
			var time = year + "-"+ month + "-" + day;
			vm.cloudimagetime = time;
			vm.weathertime = time;
		},
		timeslotFn:function(date,days){
			var d=new Date(date);
			d.setDate(d.getDate()+days);
			var month=d.getMonth()+1;
			var day = d.getDate();
			if(month<10){month = "0"+month;}
			if(day<10){day = "0"+day;}
			var val = d.getFullYear()+"-"+month+"-"+day;

			var strattm = date;
			var endtm = val ;
			var tms ="[" + strattm+ "," + endtm +"]";
			vm.cloudimagetimeSlot = tms;
			vm.weathertimeSlot = tms;
			return val;
		},
		getdata:function(index ){//获取的图片数据
			switch(index){
				case 1:
					var par_staticselect={
						type: vm.staticselect,
						time: vm.staticyearselect+ vm.staticmonthselect
					};
					$.getJSON("data/staticimg.json",par_staticselect,function (result) {//静止卫星图
						var data = vm.getimg(result.data);
						vm.staticimg = data.temp;
						vm.staticimgurl = data.tempurl;
					});
					break;
				case 2:
					var par_modisselect={
						type: vm.modisselect,
						time: vm.modisyearselect+vm.modismonthselect
					};
					$.getJSON("data/modisimg.json",par_modisselect,function (result) {//modis
						var data = vm.getimg(result.data);
						vm.modisimg = data.temp;
						vm.modisimgurl = data.tempurl;
					});
					break;
				case 3:
					var titles = vm.cloudimageselect;
					var flag = titles.substr(titles.length-1,1);
					var cloudimageselect =  titles.substring(0,titles.length-1);
					titles = flag>0 ? "日本":"风云二号";
					cloudimageselect = flag>0 ? cloudimageselect :vm.cloudimageselect;
					var par_cloudimageselect={
						title:titles,
						type: cloudimageselect,
						time: vm.cloudimagetimeSlot
					};
					$.getJSON("data/cloudimg.json",par_cloudimageselect,function (result) {//卫星云图
						var data = vm.getimg(result.data);
						vm.cloudimg = data.temp;
						vm.cloudimgurl = data.tempurl;
					});
					break;
				case 4:
					var titles = vm.weatherselect;
					var flag = titles.substr(titles.length-1,1);
					var weatherselect =  titles.substring(0,titles.length-1);
					titles = flag>0 ? "欧洲中心":"日本";
					weatherselect = flag>0 ? weatherselect :vm.weatherselect;
					var par_weatherselect={
						title:titles,
						type: weatherselect,
						time: vm.weathertimeSlot
					};
					$.getJSON("data/weatherimg.json",par_weatherselect,function (result) {//天气图
						var data = vm.getimg(result.data);
						vm.weatherimg = data.temp;
						vm.weatherimgurl = data.tempurl;
					});
					break;
			}

		},
		getimg:function(data){
			var length =data.length;
			var k =0;
			var temp=[],tempurl=[];
			for( k; k< length; k++){
				temp[k] =data[k].name;
				tempurl[k] =data[k].url;
			}
			var obj = {
				temp:temp,
				tempurl:tempurl
			}
			return obj;
		},
		playFn:function(index){//自动播放
			/*alert(index);*/
			var imgurls;
			switch(index){
				case 1: imgurls= vm.staticimgurl;
					break;
				case 2: imgurls= vm.modisimgurl;
					break;
				case 3: imgurls= vm.cloudimgurl;
					break;
				case 4: imgurls= vm.weatherimgurl;
					break;

			}
		 	var time = vm.selectcb.substr(0,vm.selectcb.length-1)*1000;
			var i = 0;
		 	setInterval(function(){
				  i = i >= imgurls.length ? 0:i;
				$(".imgsrc").attr("src", imgurls[i]);//数组0开始
				$(".imgpath >  li").siblings(".active").removeClass("active");
				var k = i+1;
				if($(".imgpath >  li:nth-child("+k+")").text().indexOf(imgurls[i])>=0){//nth-child 1开始
					$(".imgpath >  li:nth-child("+k+")").addClass("active")
				}
				i++;
			},time);
		},
		imgchange: function (index ) {//点击切换
			var a = $(this).attr( "alt");
			$(".imgsrc").attr("src",a);
		},
		watchstatic:function(){
			vm.getdata(1);
		},
		watchmodis:function(){
			vm.getdata(2);
		},
		watchcloudimage:function(){
			vm.timeslotFn(vm.cloudimagetime,-3);
			vm.getdata(3);
		},
		watchweather:function(){
			vm.timeslotFn(vm.weathertime,-3);
			vm.getdata(4);
		}


	});
	vm.$watch("staticyearselect",vm.watchstatic );
	vm.$watch("staticmonthselect",vm.watchstatic );
	vm.$watch("staticselect",vm.watchstatic);

	vm.$watch("modisyearselect",vm.watchmodis );
	vm.$watch("modismonthselect",vm.watchmodis );
	vm.$watch("modisselect",vm.watchmodis);

	vm.$watch("cloudimageselect",vm.watchcloudimage);
	vm.$watch("cloudimagetime",vm.watchcloudimage);

	vm.$watch("weatherselect", vm.watchweather);
	vm.$watch("weathertime",vm.watchweather );

	vm.yearFn();
	vm.monthFn();
	vm.times();
	vm.getdata();
	avalon.scan();
})
