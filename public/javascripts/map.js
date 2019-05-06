//创建和初始化地图函数：
function initMap() {
    createMap(); //创建地图
    setMapEvent(); //设置地图事件
    addMapControl(); //向地图添加控件
    setMarker(points); //设置公交车
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
function setMarker(points) {
    for (let i = 0; i < points.length; i++) {
        //设置图标
        var myIcon = new BMap.Icon("../images/公交车.png", new BMap.Size(15, 15), {
            offset: new BMap.Size(10, -5) //图片中央下端尖角位置
        });
        var point = new BMap.Point(points[i][0], points[i][1]); //获取公交车经纬度坐标
        var marker = new BMap.Marker(point, { icon: myIcon }); //创建标注
        map.addOverlay(marker); //添加标注


        marker.addEventListener("click", function() { //添加监听事件
            var opts = { //创建公交车信息框
                width: 250,
                height: 150,
                title: "<h3>浙A 88888</h3>"
            };
            var sContent = //设置公交车详细信息
                "<hr> <div style='width: 100%; height: 100%;  font-size: 14px; color: #555'>" +
                "<p style='margin-top: 8px;'> 启用时间: <span> 2018-09-20 </span> </p>" +
                "<p style='margin-top: 8px;'> 车辆自编号: <span> 2-7777 </span></p>" +
                "<p style='margin-top: 8px;'><span> 归属线路: <span> 1路</span> </span>" +
                "<span style='margin-left: 60px;'> 剩余电量: <span> 30% </span> </span></p>" +
                "<p style='margin-top: 8px;'><span> 理论续航: <span> 78公里 </span></span>" +
                "<span style='margin-left: 43px;'> 速度: <span>20KM/h</span> </span></p> </div>";
            var infoindows = new BMap.InfoWindow(sContent, opts); //初始化信息框
            this.openInfoWindow(infoindows); //点击跳出信息框
        });

    }
}

//设置公交车经纬度
var points = [
    [120.353563, 30.314966],
    [120.354474, 30.317446],
    [120.354435, 30.314046],
    [120.354450, 30.314464],
    [120.375693, 30.316460],
    [120.345633, 30.315440],
    [120.375669, 30.310450],
    [120.375649, 30.352480],
    [120.373569, 30.354980],
    [120.370479, 30.350480],
    [120.340419, 30.350480],
    [120.340410, 30.350384],
    [120.352651, 30.324895],
    [120.35549, 30.307234],
    [120.364581, 30.31601],
    [120.324617, 30.31548],
    [120.361041, 30.310772],
    [120.364455, 30.317896],
    [120.364742, 30.312986],
    [120.364019, 30.316977],
    [120.354843, 30.32184],
    [120.36079, 30.315885],
    [120.348807, 30.324833],
    [120.360808, 30.314794],
    [120.354879, 30.323664],
    [120.329049, 30.322040],
    [120.36097, 30.312737],
    [120.35496, 30.315246],
    [120.353352, 30.312207],
    [120.355328, 30.308902],
    [120.359748, 30.312612],
    [120.35001, 30.312004],
    [120.344884, 30.314507],
    [120.347992, 30.315738],
    [120.352573, 30.312138],
    [120.349752, 30.312823],
    [120.35001, 30.312004],
    [120.350058, 30.309503],
    [120.344614, 30.312855]
];

initMap(); //创建和初始化地图yy
