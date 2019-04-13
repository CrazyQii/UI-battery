//获取报表按钮元素
function getReport(ele) {
    var nowButton = document.getElementById(ele.id);
    //获取按钮的所有兄弟元素
    var p = ele.parentNode.children;
    for (let i = 0; i < p.length; i++) { //先将所有按钮样式恢复默认
        p[i].style.color = "#000";
        p[i].style.borderColor = "#d9d9d9";
    }
    if (nowButton.style.color == "#000" || nowButton.style.color == "rgb(0, 0, 0)") { //修改点击的按钮样式
        nowButton.style.color = "#3da2ff";
        nowButton.style.borderColor = "#3da2ff";
    }

    //展示表格对应信息
    if (nowButton.id == "button0") { //显示日报，隐藏年报和月报
        document.getElementById('day').style.display = "table-row-group";
        document.getElementById('month').style.display = "none";
        document.getElementById('year').style.display = "none";

    } else if (nowButton.id == "button1") { //显示月报，隐藏年报和日报
        document.getElementById('day').style.display = "none";
        document.getElementById('month').style.display = "table-row-group";
        document.getElementById('year').style.display = "none";
    } else if (nowButton.id == "button2") { //显示年报，隐藏日报和月报
        document.getElementById('day').style.display = "none";
        document.getElementById('month').style.display = "none";
        document.getElementById('year').style.display = "table-row-group";
    }
}