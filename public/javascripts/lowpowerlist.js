// =====================================
// 分页查询
// =====================================
$('.page').eq(0).children().addClass('index-page');
$('.page').click(function(event) {
    $('#mask').show();
    var currentPage = $(this).children().val();
    $.post('/lowpowerlist', {
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
    $.post('/lowpowerlist', {
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
    $.post('/lowpowerlist', {
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