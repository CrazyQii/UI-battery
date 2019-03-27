//获取收起目录的id
window.onload = function() {

    //初始化子目录隐藏
    index.style.display = "none";
    downLoad.style.display = "none";
    map.style.display = "none";
    car_list.style.display = "none";
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