import * as types from '../constants/actionTypes'; // redux行为标识
import list from './list'; // 路由索引

// 存储菜单折叠状态
export const setStatus = data => ({
  type: types.MENU_COLLAPSED,
  data
});

// 切换菜单折叠状态
export const toggle = val => dispatch => {
  return dispatch(setStatus(!val))
};

// 存储路由数据
export const setRoutes = data => ({
  type: types.GET_ROUTES,
  data
});

// 生成新菜单数据
export const requestRoutes = val => dispatch => {
  // 默认菜单全部信息
  const defaultRoutes = [{
      id: 1,
      icon: "environment",
      path: "/vue/#/survey/organization/1",
      title: "成都压缩机分公司"
    },
    {
      id: 2,
      icon: "desktop",
      path: "/vue/#/survey/device/11111/analysis",
      title: "设备信息"
    },
    {
      id: 3,
      icon: "credit-card",
      path: "/vue/#/smart-application/auto-diagnostics",
      title: "自动诊断"
    },
    {
      id: 4,
      icon: "alert",
      path: "/vue/#/smart-application/integrated-diagnostics",
      title: "综合诊断"
    },
    {
      id: 5,
      icon: "credit-card",
      path: "/vue/#/smart-application/prediction",
      title: "智能预测"
    },

    {
      id: 6,
      icon: "line-chart",
      path: "/vue/#/survey/organization/1/alarm-record-analysis/overview",
      title: "报警统计分析"
    },
    {
      id: 7,
      icon: "line-chart",
      path: "/vue/#/survey/organization/1/fault-record-analysis/overview",
      title: "故障统计分析"
    },
    {
      id: 8,
      icon: "file",
      path: "/vue/#/equipment/:1",
      title: "设备台账"
    },
    {
      id: 9,
      icon: "file",
      path: "/vue/#/equipment/:2",
      title: "启停机记录"
    },
    {
      id: 10,
      icon: "file",
      path: "/vue/#/equipment/:3",
      title: "检修记录"
    },
    {
      id: 11,
      icon: "file",
      path: "/vue/#/equipment/:4",
      title: "保养记录"
    },
    {
      id: 12,
      icon: "build",
      path: "/vue/#/alarm-collocation",
      title: "报警配置"
    },
    {
      id: 13,
      icon: "pushpin",
      path: "/vue/#/fault-category-manage",
      title: "设备编码管理"
    },
    {
      id: 14,
      icon: "profile",
      path: "/vue/#/hitch",
      title: "故障案例库"
    },
    {
      id: 15,
      icon: "profile",
      path: "/vue/#/diagnosis-collocation",
      title: "诊断案例库"
    },
    {
      id: 16,
      icon: "profile",
      path: "/vue/#/knowledge-graph",
      title: "知识图谱应用"
    },
    {
      id: 17,
      icon: "profile",
      path: "/vue/#/fault-code",
      title: "故障代码库"
    },
    {
      id: 18,
      icon: "profile",
      path: "/vue/#/device-konwledge",
      title: "设备文档库"
    },
    {
      id: 19,
      icon: "clock-circle",
      path: "/vue/#/off-line/report-form",
      title: "离线检测"
    },
    {
      id: 20,
      icon: "book",
      path: "/vue/#/template-management",
      title: "报表"
    },
    {
      id: 21,
      icon: "book",
      path: "/vue/#/system-log",
      title: "审计日记"
    },
    {
      id: 22,
      icon: "book",
      path: "/vue/#/system-message",
      title: "消息管理"
    },
    {
      id: 23,
      icon: "book",
      path: "/vue/#/information-standard",
      title: "信息标准"
    }
  ];

  // 最大数值23
  const array = list
  // 随机筛选后路由
  const routes = array[val - 1].map((i) => {
    return defaultRoutes[i - 1]
  })

  return new Promise(function (resolve, reject) {
    localStorage.setItem('routes', JSON.stringify(routes))
    dispatch(setRoutes(routes));
    resolve(routes[0].path);
  });
};
