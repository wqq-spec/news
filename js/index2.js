$(function () {
    var layer = layui.layer
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //    1,清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = "/login.html"
            layer.close(index);
        });
    })

})



function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar渲染用户的头像
            // console.log(res);
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像和名称

function renderAvatar(user) {
    //1 获取用户名称
    var name = user.nickname || user.username

    // 2设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 3.按需渲染头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()


    }


}









