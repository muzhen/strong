/*function CheckForm() {
       userName = $("#userName").val();
       passWord =  $("#passWord").val();
    if (isNull(userName) || userName == "请输入账号") {
    //    alert("请输入账号！");
        return false;
    }

    if (isNull(passWord)) {
     //   alert("请输入密码！");
        return false;
    }

}
//对象是否 存在
function isObj(str) {
    if (str == null || typeof (str) == 'undefined')
        return false;
    return true;
}
//所有的表单的值都不能为空,对象内容是否为空
function isNull(str) {
    if (!isObj(str))
        return 'undefined';
    str = strTrim(str);
    if (str.length > 0)
        return false;
    return true;
}

//去除字符串中的空格
function strTrim(str) {
    if (!isObj(str))
        return 'undefined';
    str = str.replace(/^\s+|\s+$/g, '');
    return str;
}*/

function jump(){
    var flag =2;//游客标识,判断是管理员还是游客；
    var id = 3;//用户资源，two.html
      str =  window.location.href;
      urlbase = window.location.href.substring(0,str.length-23);//保留要跳转到的页面 login.html?url=
      origin = window.location.origin;
      url =  window.location.search.slice(5);//保留要跳转到的页面,去掉 ？url =
    sucFun( );
    if( id == 2 || id == 1 ){//需要登入的页面

        if(flag == 2){//游客进来
            CheckForm();
            htmlobj=$.ajax({
                //type:"get",
                async:false,
                url:"../data/ht/one.txt",
                data:{
                    user:userName,
                    psw:passWord,
                },
                success:function(data){
                    sucFun(data);
                },
                error:function(){
                    alert("重新登入");
                }
            });
            //  $("#myDiv").html(htmlobj.responseText);
        }else{//管理员进来
            window.location.href = url ;//直接跳转到
            alert("管理员进来");
        }

    }else{
        console.log("直接登入")
    }

}
function sucFun(data){
    var strl = urlbase + url ;
    console.log( strl);
    console.log( data);
    //window.location.href(strl);
    // window.navigate(strl);
    //history.back(-1);
    //$("#btn").attr("data-href",strl);
  window.location.href = strl;
   // window.location.href = "http://www.baidu.com";
    // window.open(strl,"_self");//新窗口打开
    //   alert("success");
}