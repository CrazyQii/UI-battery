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

function setMarker(points, opts) {
    for (let i = 0; i < points.length; i++) {
        //设置图标
        var myIcon = new BMap.Icon("../images/公交车.png", new BMap.Size(15, 15), {
            //图片中央下端尖角位置
            offset: new BMap.Size(10, -5)
        });
        var point = new BMap.Point(points[i][0], points[i][1]);
        var marker = new BMap.Marker(point, { icon: myIcon }); //创建标注
        map.addOverlay(marker);

        var opts = {
            width: 200,
            height: 100,
            title: "<b>车辆信息</b>"
        };
        var infoindows = new BMap.InfoWindow("启用时间：", opts);
        marker.addEventListener("click", function() {
            map.openInfoWindow(infoindows, point);
        });
    }

}

//设置公交车经纬度
var points = [
    [120.353563, 30.314966],
    [120.354474, 30.314446],
    [120.354435, 30.314446],
    [120.354450, 30.316464],
    [120.375693, 30.316460],
    [120.375633, 30.315440],
    [120.375669, 30.310450],
    [120.375649, 30.352480],
    [120.373569, 30.354980],
    [120.370479, 30.350480],
    [120.340419, 30.350480],
    [120.340410, 30.350384],
    [120.352651, 30.324895],
    [120.35549, 30.307234],
    [120.364581, 30.31601],
    [120.364617, 30.31548],
    [120.361041, 30.310772],
    [120.364455, 30.317896],
    [120.364742, 30.312986],
    [120.364419, 30.316977],
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
    [120.35001, 30.312004]
];

var busInfo = [{
    width: 200,
    height: 100,
    title: "<b>车辆信息</b>"
}];
initMap(); //创建和初始化地图