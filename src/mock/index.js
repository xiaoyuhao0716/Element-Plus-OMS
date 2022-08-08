import Mock from 'mockjs'

/**
 * 登陆
 * role 角色等级
 */
Mock.mock('/mockApi/login', {
    status: 0,
    data: {
        'id|10000-11000': 0,
        username: '@cname',
        email: '@email',
        phone: /^1[385][1-9]\d{8}/,
        role: ['', 'user-edit'],
        token: '@string(50)',
        createTime: 1479048325000,
        updateTime: 1479048365000
    }
})

/**
 * 动态路由
 */

Mock.mock('/mockApi/router', {
    status: 0,
    data: {
        "router": [
            {
                path: "form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: "BaseForm",
            },
            {
                path: "upload",
                name: "upload",
                meta: {
                    title: '上传'
                },
                component: "Upload"
            },
            {
                path: "icon",
                name: "icon",
                meta: {
                    title: '图标'
                },
                component: "Icon"
            },
            {
                path: "charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: "BaseCharts"
            },
        ]
    }
})

/**
 *  table 数据
 */


Mock.mock('/mockApi/table', {
    status: 0,
    pageTotal: 100,
    'data|10': [{
        'id|10000-11000': 0,
        name: '@cname',
        email: '@email',
        thumb: 'http://mockjs.com/assets/img/logo-2.svg',
        'money|1-100': 100,
        phone: /^1[385][1-9]\d{8}/,
        address: Mock.mock('@county(true)'),
        createTime: 1479048325000,
        updateTime: 1479048365000
    }]
})


/**
 * 动态 sidebar 数据
 */

Mock.mock('/mockApi/sidebarData', {
    status: 0,
    data: {
        "sidebarData": [{
            icon: "HomeFilled",
            index: "/dashboard",
            title: "系统首页",
        },
        {
            icon: "List",
            index: "/form",
            title: "表单相关",
            subs: [
                {
                    index: "/form",
                    title: "基本表单",
                },
                {
                    index: "/upload",
                    title: "文件上传",
                },
            ],
        },
        {
            icon: "HomeFilled",
            index: "/icon",
            title: "自定义图标 权限1",
        },
        {
            icon: "HomeFilled",
            index: "/charts",
            title: "schart图表 权限2",
        },]
    }
})