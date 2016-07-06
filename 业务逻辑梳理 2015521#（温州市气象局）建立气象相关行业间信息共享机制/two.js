function jump(){
    var flag = 1;//管理员标识,判断是管理员还是游客；
    var id = 2;//用户资源，two.html
    var url = window.location.href;//保留要跳转到的页面,two.html

    if( id == 2 ){//需要登入的页面

        if(flag == 1){//管理员进来
            window.location.href = url ;//直接跳转到two.html
            alert("管理员进来");
        }else{//游客进来
            window.location.href = login.html
            user = "er";
            psw = "123";
            htmlobj = $.ajax({
                 type:"get",
                async:false,
                url:"../data/ht/one.txt",
                data:{
                    user:user,
                    psw:psw,
                },
               // datatype:"text",
                success:function(){
                    alert("success");

                }
            });
            $("#myDiv").html(htmlobj.responseText);
        }

    }else{
        console.log("直接登入")
    }



}