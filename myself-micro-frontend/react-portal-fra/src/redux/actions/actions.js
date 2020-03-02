import * as types from '../constants/actionTypes'; // redux行为标识
import {
  list,
  Routes as defaultRoutes
} from './list'; // 路由索引

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
export const requestRoutes = (num, path) => dispatch => {
  let array = '';
  // 根据路由选择对应菜单组合索引list
  list.forEach(item => {
    if (item.path === path) {
      return array = Array.from(item.data)
    }
  })
  // 最大数值23
  // 利用已生成随机索引筛选生成新路由
  const routes = array[num - 1].map(i => defaultRoutes[i - 1])

  return new Promise(function (resolve, reject) {
    localStorage.setItem('routes', JSON.stringify(routes))
    dispatch(setRoutes(routes));
    resolve(routes[0].path);
  });
};

