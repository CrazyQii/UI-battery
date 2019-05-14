$(function() {
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


    // ============================
    // 报表页面-----过滤tab
    // ============================
    filterTab();
    function filterTab() {
        var trs = $('#report').children();
        var trLength = trs.length;
        // 设置默认按钮样式
        $('#day').css({
            backgroundColor: '#007bff',
            color: '#fff'
        });
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
            $('#day').css({
                backgroundColor: '#007bff',
                color: '#fff'
            });
            $('#month').css({
                backgroundColor: '#fff',
                color: '#007bff'
            });
            $('#year').css({
                backgroundColor: '#fff',
                color: '#007bff'
            });
            for(let i = 0; i < trLength; i++) {
                var tr = trs[i];
                if (tr.getAttribute('tab') == "day") {
                    tr.style.display = "flex";
                    // 设置对应按钮样式
                } else {
                    tr.style.display = "none";
                }
            }
        })
        $('#month').click(function() {
            $('#month').css({
                backgroundColor: '#007bff',
                color: '#fff'
            });
            $('#day').css({
                backgroundColor: '#fff',
                color: '#007bff'
            });
            $('#year').css({
                backgroundColor: '#fff',
                color: '#007bff'
            });
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
            $('#year').css({
                backgroundColor: '#007bff',
                color: '#fff'
            });
            $('#day').css({
                backgroundColor: '#fff',
                color: '#007bff'
            });
            $('#month').css({
                backgroundColor: '#fff',
                color: '#007bff'
            });
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


    // =================================
    // 车辆信息添加遮蔽层
    // =================================
    $('#addBus').click(function(event) {
        $('#mask').show();
        $('#newBus').show();
    });
    $('#closeBtn').click(function() {
        $('#mask').hide();
        $('#newBus').hide();
    })
    
     
    // ==================================
    // Ajax提交信息
    // ==================================
    $('#submitBus').click(function(event) {
        if($.trim($('#companyBus').val()).length == 0) {
            alert('请输入公交车所属公司');
            return;
        }
        else if($.trim($('#busType').val()).length == 0) {
            alert('请输入公交车类型');
            return;
        }
        else if($.trim($('#busRoute').val()).length == 0) {
            alert('请输入公交车线路');
            return;
        }
        else if($.trim($('#busNum').val()).length == 0) {
            alert('请输入公交车牌号');
            return;
        }
        else if($.trim($('#busNum').val()).length == 0) {
            alert('车辆已经存在,请检查信息');
            return;
        }
        else if($.trim($('#startTime').val()).length == 0) {
            alert('请输入公交车启用时间');
            return;
        }
        else if($.trim($('#theryMeters').val()).length == 0) {
            alert('请输入公交车理论航程');
            return;
        }
        else {
            // $.post('/carlist', {
            //     query: true,
            //     busNum: $.trim($('#busNum').val()),
            // }, function(data) {
            //     console.log(data)
            // })
            // 提交信息到后端
            $.post('/carlist', {
                // 获取表单数据
                addBus: true,
                companyBus: $.trim($('#companyBus').val()),
                busId: $.trim($('#busId').val()),
                busType: $.trim($('#busType').val()),
                busRoute: $.trim($('#busRoute').val()),
                busNum: $.trim($('#busNum').val()),
                startTime: $.trim($('#startTime').val()),
                theryMeters: $.trim($('#theryMeters').val()),
                putTime: new Date()
            }, function(data, status) {     // 数据成功提交且数据没有重复的回调函数
                if(status == 'success' && data != false) {
                    $('#mask').hide();
                    $('#newBus').hide();
                    alert('信息提交成功!');
                    // 提交成功后自动刷新页面--------------重点
                    location.reload(true)
                }
                else {
                    alert('公交车牌号信息已经存在，请重新检查');
                }
            });  
        } 
    });


    // ==================================
    // 动态显示删除按钮
    // ==================================
    // 全选按钮
    $('#allBusSelect').change(function() {
        if($(this).prop('checked')) {   // 如果选中全选按钮
            $('#tbody').find('input:checkbox').prop('checked', true);
            $('#deleteBus').fadeIn(400);
        } else {   //如果未选中全选按钮
            $('#tbody').find('input:checkbox').prop('checked', false);
            $('#deleteBus').fadeOut(400);
        } 
    });
    // 单选按钮
    $('#tbody').find('input:checkbox').change(function() {
        if($(this).prop('checked')) {
            $('#deleteBus').fadeIn(400);
        } 
        var checkNum = $('#tbody').find('input:checkbox').length;
        var isSel = false;    //判断是否有选择复选框
        var isSelAll = true;    //判断是否复选框全部被选择
        $('#tbody').find('input:checkbox').each(function() {
            if($(this).prop('checked') == true) {
                isSel = true;
            } else {
                isSelAll = false;
            }
        })
        if(!isSel) {    //如果没有人选中复选框
            $('#deleteBus').fadeOut(400);
        } else if(!isSelAll) {  //如果没有选中所有复选框
            $('#allBusSelect').prop('checked', false);
        }
    })


    // ==================================
    // 删除信息
    // ==================================
    $('#deleteBus').click(function(event) {
        $('#tbody').find('input:checkbox').each(function() {
            if($(this).prop('checked') == true) {
                var currentTr = $(this).parent().parent()
                var license = $(this).parent().parent().children('td:nth-child(5)');
                $.post('/carlist', {    //Ajax--------------重点
                    deleteBus: true,
                    selBusLicense: license.text()
                }, function(data, status) {
                    if(data == 'success' && status == 'success') {
                        currentTr.remove();
                        location.reload(true);
                    } else {
                        alert('删除数据有误');
                        location.reload(true);
                    }
                })
            } 
        })
    });


    // ==================================
    // Ajax异步查询
    // ==================================
    $('#searchBtn').click(function() {
        var search = $('#searchBus').val();
        if($.trim(search).length == 0) {
            alert('查询不能为空');
        } else {
            
        }
    })
})

