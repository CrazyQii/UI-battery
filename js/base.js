window.onload = function() {

    /*
     *侧边栏
     */
    //初始化子目录隐藏,所有页面侧边栏
    index.style.display = "none";
    downLoad.style.display = "none";
    navMap.style.display = "none";
    car_list.style.display = "none";

    //判断当前页面
    var pageTitle = document.getElementsByTagName('title');
    if (pageTitle[0].innerText == "电量监控首页") { //如果当前页面是首页，则显示侧边栏
        index.style.display = "block";
    }
    if (pageTitle[0].innerText == "map地图") { //如果当前页面是首页，则显示侧边栏
        navMap.style.display = "block";
    }
    if (pageTitle[0].innerText == "车辆列表" || pageTitle[0].innerText == "车辆详情" || pageTitle[0].innerText == "低电量车列表") { //如果当前页面是首页，则显示侧边栏
        car_list.style.display = "block";
    }
    if (pageTitle[0].innerText == "报表下载") { //如果是报表下载页面，则执行以下命令
        downLoad.style.display = "block";
        //动态按钮
        var reportTime = document.getElementById('reportTime')
        var button = reportTime.getElementsByTagName('button');
        for (let i = 0; i < button.length; i++) {
            button[i].id = "button" + i;
        }
        button[0].style.color = "#3da2ff";
        button[0].style.borderColor = "#3da2ff";

        //获取动态表格信息
        var day = document.getElementById('day');
        var month = document.getElementById('month');
        var year = document.getElementById('year');
        day.style.display = "table-row-group";
        month.style.display = "none";
        year.style.display = "none";
        //获取切换表格信息
        var change_day = document.getElementById('changeDay');
        var change_month = document.getElementById('changeMonth');
        var change_year = document.getElementById('changeYear');
        change_day.style.display = "block";
        change_month.style.display = "none";
        change_year.style.display = "none";
    }

}


/**
 * 函数名：getList()
 * 参数：li(id名)
 * 返回值：无
 * 作用：隐藏和显示目录
 */

function getList(li) {
    var list = document.getElementById('detailInfo');
    if (li.style.display == "none") { //如果页面隐藏，则显示
        li.style.display = "block";
        if (li.id == "menu") { //显示侧边栏，主体宽度80%
            list.style.width = "80%";
        }
    } else { //如果页面显示，则隐藏
        li.style.display = "none";
        if (li.id == "menu") { //隐藏侧边栏，主体宽度100%
            list.style.width = "100%";
        }
    }
}