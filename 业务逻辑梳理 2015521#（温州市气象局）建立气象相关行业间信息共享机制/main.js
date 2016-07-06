function jump(e){
    var flag =2;//游客标识,判断是管理员还是游客；
    var id = 1;//用户资源，two.html
    //var url = e;//保留要跳转到的页面,two.html

    if( (id == 1 )||( id == 2) ){//需要登入的页面

        if(flag == 1){//管理员进来
            alert("管理员进来");
            window.location.href = e ;//直接跳转到two.html

        }else{//游客进来
            alert("游客进来,先登入");
            window.location.href = "login.html?url="+ e ;

        }

    }else{//游客不用登入的页面
        console.log("直接登入")
    }



}