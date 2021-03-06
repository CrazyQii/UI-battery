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
    

// =================================
// 车辆信息添加遮蔽层
// =================================
$('#addBus').click(function(event) {
    $('#mask').css({'width': window.screen.availWidth + "px", 'height': window.screen.availWidth + "px"})
    $('#mask').show();
    $('#newBus').show();
});
$('#closeBtn').click(function() {
    $('#mask').hide();
    $('#newBus').hide();
})


// ==================================
// Ajax提交公交车信息
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
        $('#mask').css({'zIndex': 99999}).show();
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
                $('#mask').css({'zIndex': 999}).hide();
                $('#newBus').hide();
                alert('信息提交成功!');
                // 提交成功后自动刷新页面--------------重点
                location.reload(true)
            }
            else {
                $('#mask').css({'zIndex': 999}).show();
                alert('车辆牌照或车辆自编号已存在，请检查！');
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
// 删除公交车信息
// ==================================
$('#deleteBus').click(function(event) {
    $('#mask').show();
    $('#tbody').find('input:checkbox').each(function() {    //遍历删除已选的公交车
        if($(this).prop('checked') == true) {   
            var currentTr = $(this).parent().parent()
            var license = $(this).parent().parent().children('td:nth-child(5)');
            $.post('/carlist', {    //Ajax--------------重点
                deleteBus: true,
                selBusLicense: license.text()
            }, function(data, status) {
                $('#mask').show();
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
    $('#mask').hide();
});


// ==================================
// Ajax查询公交车信息
// ==================================
// 点击搜索按钮
$('#searchBtn').click(function() {
    var val = $.trim($('#searchBus').val());
    if($.trim(val).length == 0) {
        alert('查询不能为空');
    } else {
        $(this).attr('value', val);
        $('#mask').show();
        $.post('/carlist', {
            queryBusId: true,
            busId: val
        }, function(data, status) {
            console.log(data)
            if(status == 'success') {
                freshTable($('#tbody'), data);
                $('#mask').hide();
            } else {
                alert('查询失败')
                $('#mask').hide();
            }
        })
    }
})
// 点击重置按钮
$('#resetBtn').click(function() {
    $('#mask').show();
    location.reload(true);
})


// =====================================
// 分页查询
// =====================================
$('.page').eq(0).children().addClass('index-page');
$('.page').click(function(event) {
    $('#mask').show();
    var currentPage = $(this).children().val();
    $.post('/carlist', {
        getPage: true,
        currentPage: currentPage
    }, function(data, status) {
        if(status == 'success') {
            var currentPage = data.currentPage;         //拿到当前页
            var data = data.data;                       //获取公交车数据
            // 设置分页样式
            $('.page').children().removeClass('index-page');
            $('.page').eq(currentPage - 1).children().addClass('index-page');
            freshTable($('#tbody'), data);
            $('#mask').hide();
        } else {
            alert('查询失败')
            $('#mask').hide();
        }
    });  
});
// 点击选择框
$('.change-page').click(function(data) {
    $('#mask').show();
    var getPage = $(this).children('button').val();
    var prePage = parseInt($('.page').find('.index-page').val());
    if(getPage == 'previous') {
        var currentPage = prePage - 1;
        if(currentPage <= 0) currentPage = 1;
    } 
    if(getPage == 'next') {
        var currentPage = prePage + 1;
        if(currentPage > $('.page').length) currentPage = $('.page').trLength;
    }
    $.post('/carlist', {
        getPage: true,
        currentPage: currentPage
    }, function(data, status) {
        if(status == 'success') {
            var currentPage = data.currentPage;         //拿到当前页
            var data = data.data;                       //获取公交车数据
            // 设置分页样式
            $('.page').children().removeClass('index-page');
            $('.page').eq(currentPage - 1).children().addClass('index-page');
            freshTable($('#tbody'), data);
            $('#mask').hide();
        } else {
            alert('查询失败')
            $('#mask').hide();
        }
    });  
})

// 点击输入框 
$('#jumpPage').blur(function(data) {
    $('#mask').show();
    var currentPage = $(this).val();
    $.post('/carlist', {
        getPage: true,
        currentPage: currentPage
    }, function(data, status) {
        if(status == 'success') {
            var currentPage = data.currentPage;         //拿到当前页
            var data = data.data;                       //获取公交车数据
            // 设置分页样式
            $('.page').children().removeClass('index-page');
            $('.page').eq(currentPage - 1).children().addClass('index-page');
            freshTable($('#tbody'), data);
            $('#mask').hide();
        } else {
            alert('查询失败')
            $('#mask').hide();
        }
    });  
})
// 点击input输入框
$('.select').click(function(event) {
    $('#mask').show();
    var currentPage = $(this).children().val()
    $.post('/carlist', {
        getPage: true,
        currentPage: currentPage
    }, function(data, status) {
        if(status == 'success') {
            var currentPage = data.currentPage;         //拿到当前页
            var data = data.data;                       //获取公交车数据
            // 设置分页样式
            $('.page').children().removeClass('index-page');
            $('.page').eq(currentPage - 1).children().addClass('index-page');
            freshTable($('#tbody'), data);
            $('#mask').hide();
        } else {
            alert('查询失败')
            $('#mask').hide();
        }
    });  
});


// =================================
// Ajax设置表格
// =================================
function freshTable(tbody, data) {
    // 清空表格内容
    tbody.children().remove();
    for(let i = 0 ; i < data.length; i++) {
        var tr = '<tr>' + 
        '<td><input type="checkbox" class="busSelect" name="busSelect"></td>' +
        '<td><a href="/detail?id=' + data[i]._id + '">' + data[i].id_of_bus + '</td>' + 
        '<td>' + data[i].type_of_bus + '</td>' +
        '<td>' + data[i].route_of_bus + '</td>' +
        '<td>' + data[i].license_of_bus + '</td>' +
        '<td>' + formatDate(data[i].start_of_bus) + '</td>' +
        '<td ' + function() {
            if(data[i].rest_power < 25) {
                return 'class=battery-warn';
            }
        }() + ' >' +  data[i].rest_power + '%</td>' +
        '<td>' + function() {
            if(data[i].state) {
                return '启动';
            } else {
                return '未启动';
            }
        }() + '</td>' +
        '<td>' + data[i].thery_of_meters + '公里</td>' +
        '<td>' + data[i].run_of_meters + '公里</td>' +
        '<td><a href="/detail?id=' + data[i]._id + '">' + '操作记录</td>' +
        '</tr>'
        tbody.append(tr);
    }
}