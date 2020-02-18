import * as types from '../constants/actionTypes'; //注释在此文件中

//  state:所有数据信息
const defaultState = {
  collapsed: false, //菜单
  routes: []
}
//  设置state的默认数据:defaultState
const reducer = (state = defaultState, action) => {
  state = JSON.parse(JSON.stringify(state)); //defaultState为复合类型需要深克隆一下;
  switch (action.type) {
    case types.MENU_COLLAPSED:
      // 将传入数据赋值给redux中store;
      state.collapsed = action.data;
      break;
    case types.GET_ROUTES:
      state.routes = action.data;
      break;
  }
  return state;
}
export default reducer;