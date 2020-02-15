//JavaScript代码区域
layui.use('element', function() {
    var element = layui.element;

});
layui.use('table', function() {
    var table = layui.table;
    table.render({
        elem: '#demo',
        height: 700,
        url: 'j.json', //数据接口,假数据
        page: true, //开启分页
        /*
        返回数据格式：json
        {
          "code": 0,
          "msg": "",
          "count": ,//数据总数
          "data": [
              {
                  "id":"",
                  "novel_name":"",
                  "novel_writer":"",
                  "novel_genre":"",
                  "novel_state":""
              },
              { ... },
              { ... },
              ...
          ]
        } 
        */
        limit: 20,
        cols: [
            [ //表头
                {
                    field: 'id',
                    title: 'ID',
                    width: 100,
                    sort: true,
                    fixed: 'left'
                }, {
                    field: 'user_name',
                    title: '用户名',
                    width: 150,
                }, {
                    field: 'user_state',
                    title: '状态',
                    width: 100,
                    sort: true
                }, {
                    fixed: 'right',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo'
                }
            ]
        ]
    });

    table.on('tool(users)', function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
        console.log(data);
        console.log(obj.tr);
        if (layEvent === 'del') { //删除
            obj.del();
            console.log(data.id);
            $.post({
                url: "/" //向该地址的服务程序发送需要从数据库删除的用户id
            }, {
                remove_id: data.id
            }, function(data) {
                if (data.code == 1) {
                    alert("删除成功")
                }
            });
        } else if (layEvent === 'edit') {
            console.log("误触");
            $(this).hide();
            $.post({
                url: "/" //编辑数据库地址
            }, {
                change_id: data.id, //需要修改数据的用户的id
                change_genre: data.novel_genre,
                change_state: data.novel_state,
                change_introduction: data.novel_introduction,
            }, function(data) {
                if (data.code == 1) {
                    alert("修改成功");
                }
            })
        }
    });
    $(".hide_button").hide();
    table.on('edit(users)', function(obj) {
        console.log(obj.value);
        console.log(obj.field);
        console.log(obj.tr);
        var tr = obj.tr;

        $(tr).first().children().last().children().children().first().show();
    });
});