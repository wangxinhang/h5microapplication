import Mock from 'mockjs'

// 用户登录
Mock.mock('/blade-user/token', 'post', {
    code: 200,
    data: {
        account: "admin",
        authority: "administrator",
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        expiresIn: 3600,
        license: "powered by blade",
        tokenType: "bearer",
        accessToken: "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjEiLCJyb2xlX2lkIjoiMSIsInVzZXJfbmFtZSI6ImFkbWluIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InNhYmVyIiwiZXhwIjoxNTk1MjM3ODA3LCJuYmYiOjE1OTUyMzQyMDd9.6wg7UrntsvKh8x_amlY0kO1vhhTcXZ1Wa8Ztl-fJESM",
        refreshToken: "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMSIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic2FiZXIiLCJleHAiOjE1OTUyMzk2MDcsIm5iZiI6MTU5NTIzNDIwN30.8_jQOd-pdwZ7rHHfF2USdFlZySHF4iU_lQcRvOpHHmk",
    },
    msg: "操作成功",
    success: true
});
//用户退出
Mock.mock('/user/logout', 'get', {
    data: true,
});
//刷新token
Mock.mock('/user/refesh', 'post', {
    data: new Date().getTime() + ''
});
//获取表格数据
Mock.mock('/user/getTable', 'get', () => {
    let list = []
    for (let i = 0; i < 5; i++) {
        list.push(Mock.mock({
            id: '@increment',
            name: Mock.mock('@cname'),
            username: Mock.mock('@last'),
            type: [0, 2],
            checkbox: [0, 1],
            'number|0-100': 0,
            datetime: 1532932422071,
            'sex|0-1': 0,
            moreselect: [0, 1],
            "grade": 0,
            address: Mock.mock('@cparagraph(1, 3)'),
            check: [1, 3, 4]
        }))
    }
    return {
        data: {
            total: 11,
            pageSize: 10,
            tableData: list
        }
    }
})