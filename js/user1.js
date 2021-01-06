$(function () {
    var form = layui.form
    var layer = layui.layer

    // 1表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！"
            }
        }
    })
    // 2把本地获取的信息渲染到表单中
    initUserInfo()
    function initUserInfo() {
        // 获取本地登录信息
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 3重置表单
    $('#btnReset').on('click', function (e) {
        // alert(1)
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('更新信息成功')
                window.parent.getUserInfo()
            }
        })
    })









})