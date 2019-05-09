$(function() {
    // 隐藏和显示侧边栏
    $("#header").children("a").click(function() {
        $("aside").animate({ width: 'toggle' }, 5);
    })

    //显示当前页面的第二级标题栏
    showTitle($("title").text());

    function showTitle(title) {
        if (title == "首页") {
            $("li[title='batteryWatch']").children("ul").show();
            $("li[title='batteryWatch']").find("a").addClass("current");
        }
    }

    // 添加第一级菜单栏事件
    $(".items").click(function() {
        var siblingItem = $(this).siblings("ul");
        siblingItem.slideToggle(300);
        // 切换显示图标
        $(this).children("li .i-right").toggleClass("i-bottom");
        $(this).children("li .i-right").toggleClass("i-top");
    })


    // ============================
    // 报表页面-----过滤tab
    // ============================
    filterTab();
    function filterTab() {
        var trs = $('tbody').children();
        var trLength = trs.length;
        // 设置默认表格样式
        for(let i = 0; i < trLength; i++) {
            var tr = trs[i];
            if (tr.getAttribute('tab') == "day") {
                tr.style.display = "flex";
            } else {
                tr.style.display = "none";
            }
        }
        // 点击日报，显示样式
        $('#day').click(function() {
            for(let i = 0; i < trLength; i++) {
                var tr = trs[i];
                if (tr.getAttribute('tab') == "day") {
                    tr.style.display = "flex";
                } else {
                    tr.style.display = "none";
                }
            }
        })
        $('#month').click(function() {
            for(let i = 0; i < trLength; i++) {
                var tr = trs[i];
                if (tr.getAttribute('tab') == "month") {
                    tr.style.display = "flex";
                } else {
                    tr.style.display = "none";
                }
            }
        })
        $('#year').click(function() {
            for(let i = 0; i < trLength; i++) {
                var tr = trs[i];
                if (tr.getAttribute('tab') == "year") {
                    tr.style.display = "flex";
                } else {
                    tr.style.display = "none";
                }
            }
        })
    }
    
})

