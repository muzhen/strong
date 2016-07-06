/**
 * Created with JetBrains WebStorm.
 * User: hasee
 * Date: 16-4-7
 * Time: 下午10:02
 * To change this template use File | Settings | File Templates.
 */
define(["avalon","jquery",'css!myUrlTest.css'],function(avalon,$){
    var mt={
        options:'',
        init:function(options){
            mt.options=options;

            var vm=avalon.define({
                $id: options.clid ,
                title:'你好'
            });

            return vm;
           // var d=location.href ;
            //avalon.log(d);
        }
    }
    return mt;
})