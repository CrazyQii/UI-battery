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
    return y + '年' + m + '月' + d + "日";  
}

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
$('#addReport').click(function(event) {
    $('#mask').css({'width': window.screen.availWidth + "px", 'height': window.screen.availWidth + "px"})
    $('#mask').show();
    $('#newReport').show();
});
$('#closeBtn').click(function() {
    $('#mask').hide();
    $('#newReport').hide();
})


// ==================================
// Ajax提交报表信息
// ==================================
$('#submitReport').click(function(event) {
    if($.trim($('#typeReport').val()).length == 0) {
        alert('请选择报表类型');
        return;
    } else {
        $('#mask').css({'zIndex': 99999}).show();
        // 提交信息到后端
        $.post('/report', {
            // 获取表单数据
            addReport: true,
            typeReport: $.trim($('#typeReport').val()),
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
                alert('报表提交有误，请检查！');
            }
        });  
    } 
});

// =====================================
// 分页查询
// =====================================
$('.page').eq(0).children().addClass('index-page');
$('.page').click(function(event) {
    $('#mask').show();
    var currentPage = $(this).children().val();
    $.post('/report', {
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
    $.post('/report', {
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
    $.post('/report', {
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
    $.post('/report', {
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
        '<td>' + data[i].type_report + '</td>' +
        '<td>' + formatDate(data[i].put_time) + '</td>' +
        '<td>' + 
            '<ul class="list-unstyled row">' + 
                '<a href="' + data[i].id + '">' +
                    '<li>车辆报表</li>'
                '</a>' + 
                '<a href="' + data[i].id + '">' +
                    '<li>车型报表</li>'
                '</a>' + 
                '<a href="' + data[i].id + '">' +
                    '<li>车辆&车型报表</li>'
                '</a>' +
            '</ul>' + 
        '</td>' +
        '</tr>'
        tbody.append(tr);
    }
}