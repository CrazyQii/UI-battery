var formatDate = function (date) { 
    date = new Date(date)
    // 年 
    var y = date.getFullYear();  
    // 月
    var m = date.getMonth() + 1;  
    // 如果小于10,则前面一位加0
    m = m < 10 ? ('0' + m) : m;  
    // 天
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    // 小时
    var h = date.getHours();  
    // 分钟
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    // 秒
    var second= date.getSeconds();  
    second = minute < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d;  
}

//创建和初始化地图函数：
function initMap() {
    createMap(); //创建地图
    setMapEvent(); //设置地图事件
    addMapControl(); //向地图添加控件
    // setMarker(points); //设置公交车
}

//创建地图函数：
function createMap() {
    var map = new BMap.Map("dituContent", {
        //设置缩放级别
        minZoom: 18,
        maxZoom: 14
    }); //在百度地图容器中创建一个地图
    var point = new BMap.Point(120.353563, 30.314966); //定义一个中心点坐标
    map.centerAndZoom(point, 17); //设定地图的中心点和坐标并将地图显示在地图容器中
    map.setCurrentCity("杭州"); //设置当前城市
    window.map = map; //将map变量存储在全局

}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
    map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard(); //启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
    });
    map.addControl(ctrl_ove);
}

//设置标点标记
function setMarker(pointX, pointY, license, time, id, route, power, meters) {
    time = formatDate(time);
    //设置图标
    var myIcon = new BMap.Icon("../images/公交车.png", new BMap.Size(15, 15), {
        offset: new BMap.Size(10, -5) //图片中央下端尖角位置
    });
    var point = new BMap.Point(pointX, pointY); //获取公交车经纬度坐标
    var marker = new BMap.Marker(point, { icon: myIcon }); //创建标注
    map.addOverlay(marker); //添加标注


    marker.addEventListener("click", function() { //添加监听事件
        var opts = { //创建公交车信息框
            width: 250,
            height: 150,
            title: "<h5>" + license + "</h5>"
        };
        var sContent = //设置公交车详细信息
            "<hr> <div style='width: 100%; height: 100%;  font-size: 14px; color: #555'>" +
            "<p style='margin-top: -0.5rem;'> 启用时间: <span> " + time + " </span> </p>" +
            "<p style='margin-top: -0.5rem;'> 车辆自编号: <span>" + id + "</span></p>" +
            "<p style='margin-top: -0.5rem;'><span> 归属线路: <span> " + route + "</span> </span>" +
            "<span style='margin-left: 25px;'> 剩余电量: <span> " + power + "% </span> </span></p>" +
            "<p style='margin-top: -0.5rem;'><span> 理论续航: <span>" + meters + " </span></span>" +
            "<span style='margin-left: 30px;'> 速度: <span>20KM/h</span> </span></p> </div>";
        var infoindows = new BMap.InfoWindow(sContent, opts); //初始化信息框
        this.openInfoWindow(infoindows); //点击跳出信息框
    });
}

initMap(); //创建和初始化地图


// 选择查看公交车的公司
$('#selConfirm').blur(function(val) {
    $('#mask').css({'zIndex': 99999}).show();
    $.post('/map', {
        selMap: true,
        sel_company: $(this).val()
    }, function(data, status) {
        if(status == 'success') {
            initMap();  
            console.log(data)
            var buses = data.buses;
            for (var i = 0; i < buses.length; i++) {
                // 获取公交车坐标，并添加到地图当中
                var point = buses[i].points;
                var pointX = buses[i].points.LoacationX;
                var pointY = buses[i].points.LoacationY;
                setMarker(pointX, pointY, buses[i].license_of_bus, buses[i].start_of_bus, buses[i].id_of_bus, buses[i].route_of_bus, buses[i].rest_power, buses[i].thery_of_meters);
            }
            // 修改今日里程数侧栏
            $('nav').find('h4').text(data.totalMeter + '公里');
            // 车辆总数
            $('#onlineBus').text(data.sum + '辆');
            // 电量情况
            $('#fullBus').find('.float-right').text(data.fullBus + '辆');
            $('#goodBus').find('.float-right').text(data.goodBus + '辆');
            $('#badBus').find('.float-right').text(data.badBus + '辆');
            // 电量百分比
            $('#fullBus').find('.car-current').text((data.fullBus / data.sum) * 100 + '%');
            $('#goodBus').find('.car-current').text((data.goodBus / data.sum) * 100+ '%');
            $('#badBus').find('.car-current').text((data.badBus / data.sum) * 100 + '%');
            $('#mask').css({'zIndex': 999}).hide();
        }
    });
})