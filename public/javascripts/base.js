$(function() {
    // =====================================
    // 格式化时间
    // =====================================
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

    
    // ======================
    // 隐藏和显示侧边栏
    // ======================
    $("#header").children("a").click(function() {
        $("aside").animate({ width: 'toggle' }, 5);
    })


    //==============================
    //显示当前页面的第二级标题栏
    //==============================
    showTitle($("title").text());
    
    function showTitle(title) {
        var listLength = $('.child-item').length;
        var lists = $('.child-item');
        for(let i = 0; i < listLength; i++) {
            var list = lists[i];
            var text = list.innerHTML;
            // 如果title等于侧导航栏,显示其栏目
            if (text == title) {
                list.classList.add('current');
                list.parentNode.parentNode.parentNode.children[0].children[1].classList.add('current');
                // 切换导航栏图标
                list.parentNode.parentNode.parentNode.children[0].children[2].classList.remove('i-bottom');
                list.parentNode.parentNode.parentNode.children[0].children[2].classList.add('i-top');
                list.parentNode.parentNode.style.display = "block";
            }
        }
    }


    // ==============================
    // 添加第一级菜单栏事件
    // ==============================
    $(".items").click(function() {
        var siblingItem = $(this).siblings("ul");
        siblingItem.slideToggle(300);
        // 切换显示图标
        $(this).children("li .i-right").toggleClass("i-bottom");
        $(this).children("li .i-right").toggleClass("i-top");
    })

})

