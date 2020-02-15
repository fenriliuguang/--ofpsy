function render(count) {
    var text = '';
    var content = count;
    console.log(content);
    $.each(content, function(i, n) {
        console.log(n);
        if (n.Introduction.length > 66) {
            n.Introduction = n.Introduction.slice(0, 66) +
                '<span style="color:rgb(180, 180, 180);">...</span>'
        }
        if (n.Id != "") {
            text = text +
                '<div class="books">' +
                '<img class="b_img" src="' + n.Picture + '" alt="">' +
                '<div class="b_p">' +
                '<p class="b_name">' + n.Name + '</p>' +
                '<p class="b_s"><span class="writer">' +
                n.Writer + '&nbsp;著</span>' +
                '<span class="point">&nbsp;&nbsp;' + n.Genres + '</span></p>' +
                '<p class="b_t">' + n.Introduction + '</p>' +
                '</div></div>'
        }
    })
    $("#cont").html(text);
}
var page_num = 1;

$.ajax({
    type: "GET",
    url: "/collect/?page=1",
    async: false,
    success: function(data) {
        page_num = data.num;
        render(data.novel);
        console.log("全局变量page_num : " + page_num + " , 后台数据 data .num : " + data.num);
    }
})




layui.use('laypage', function() {
    var laypage = layui.laypage;
    console.log("全局变量page_num : " + page_num);
    laypage.render({
        elem: 'h_h',
        count: page_num, //100, //co, //数据总数
        limit: 8, //每页限制数据数量
        jump: function(obj, first) {
            if (!first) {
                $.get({ url: "/collect/?page=" + obj.curr }, function(data) {
                    render(data.novel);
                })
            }
        }
    })
})