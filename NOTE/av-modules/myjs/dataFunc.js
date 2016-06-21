/**
 * Created with JetBrains WebStorm.
 * User: lz
 * Date: 16-3-23
 * Time: 上午10:05
 * To change this template use File | Settings | File Templates.
 */

define(["avalon"],function(avalon){
    var foodOrder = {

        //数据载入后要执行的函数暂存在这里
        dataReadyFunc : []

        //数据源URL及载入状态
        , dataSource : [
            /*{ url : '../src/mainFrame/appconfig.json', ready : false, data : null },
            { url : 'data/users.json', ready : false, data : null },
            { url : 'data/foods.json', ready : false, data : null }*/
        ]

        //检查数据源是否全部载入完毕
        , isReady : function(){
            var isReady = true;
            for(var key in this.dataSource){
                if(this.dataSource[key].ready !== true){
                    isReady = false;
                }
            }
            return isReady;
        }

        //数据源全部加载完毕，则逐一运行dataReadyFunc中存放的函数
        , callReady : function(){
            if(true === this.isReady()){
                for(var key in this.dataReadyFunc){
                    this.dataReadyFunc[key](this.dataSource);
                }
            }
        }

        //供外部调用，会将外部输入的函数暂存在dataReadyFunc中
        , dataReady : function(func){
            if (typeof func !== 'function') {
                return false;
            }
            this.dataReadyFunc.push(func);
        }

        , init : function(urlObj){
            for(var key in urlObj ){
                this.dataSource.push(
                    {
                        url: urlObj[key],
                        url_key:key,
                        ready : false,
                        data : null
                    }
                )
            }
            var self = this;
            var _initElement = function(key, url){
                avalon.getJSON(url, function(e){
                    //每次载入数据后，将数据存放于dataSource中，将ready状态置为true，并调用callReady
                    self.dataSource[key].data = e;
                    self.dataSource[key].ready = true;
                    self.callReady();
                });
            }
            for(var key in this.dataSource){
                _initElement(key, this.dataSource[key].url);
            }
        }
    }

    return  foodOrder;

});

