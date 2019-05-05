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
})
