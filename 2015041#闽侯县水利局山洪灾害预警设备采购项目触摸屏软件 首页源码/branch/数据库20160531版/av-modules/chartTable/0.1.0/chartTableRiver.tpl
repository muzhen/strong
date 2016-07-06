<div ms-class="row chartTable-title text-center">
    <h1 class="text-info ct-title">{{title}}</h1>
    <label class=" ct-date" ms-on-tap="tapDate" >
         <span>{{currentDate.btm|date("yy年MM月dd日HH时")}}</span>
         ～
         <span>{{currentDate.etm|date("yy年MM月dd日HH时")}}</span>
         <input id="mobiDate" placeholder="Please Select ..."  style="display:none"/>
    </label>
</div>
<div ms-class="row chartTable-chart">
    <div  id="chartTable" class="chartTable-chart-container" style="height:100%;width: 100%;padding-right: 0.4rem">

    </div>

</div>
<div ms-class="row chartTable-detail" ms-visible="isShowDetail">
    <h5 class="detail-item">
        <span>当前水位 : {{currentData.curz}}米</span>
        <span>时间 : {{currentData.curtm|date("yyyy年MM月dd日 HH时")}}</span>
    </h5>
    <h5 class="detail-item"><span>警戒水位 : {{currentData.wrz}}米</span><span></span></h5>
    <h5 class="detail-item"><span>历史最高水位 : {{currentData.maxz}}米</span><span>时间 : {{currentData.maxtm|date("yyyy年MM月dd日")}}</span>
    </h5>
    <h5 class="detail-item"><span>历史最低水位 : {{currentData.minz}}米</span><span>时间 : {{currentData.mintm|date("yyyy年MM月dd日")}}</span>
    </h5>
</div>
<div ms-class="row chartTable-table" >
    <div class="col-xs-12 chartTable-tableHead">
        <table class="table table-bordered">
            <col ms-css-width="{{100/(tableHead.length)}}%" ms-repeat="tableHead"/>
            <tr class="middle-tr thtop swiper-slide" >
                <th ms-repeat="tableHead" ms-attr-mytype="">{{el}}</th>
            </tr>
        </table>
    </div>
    <div class="col-xs-12 chartTable-content" ms-class-1="chartTable-content-rain:!isShowDetail">
        <table class="table table-bordered">
            <col ms-css-width="{{100/(tableHead.length)}}%" ms-repeat="tableHead"/>
            <tr class="middle-tr swiper-slide" ms-repeat="curTableData">
                <td ><span>{{el[tableColumn[0]]|date("yyyy-MM-dd")}}<br>{{el[tableColumn[0]]|date("HH时mm分")}}</span></td>
                <td ms-repeat-tc="tableColumn" ms-if-loop="!$first"><span>{{el[tc]}}</span></td>
            </tr>
        </table>
        <div  class="btn btn-info" ms-visible="isFinish==false"  ms-on-tap="loadData" ms-data-tableData="tableData">
            点击加载更多
        </div>
        <div  class="btn btn-warning" ms-visible="isFinish" >
            数据已全部显示
        </div>
        <!--<div class="swiper-wrapper">
            <div class="swiper-slide" ms-repeat="tableData">
                <label class="slide-col-5">时间</label><label class="slide-col-5">水位（米）</label>
            </div>
        </div> -->
    </div>

</div>