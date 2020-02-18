import {applyMiddleware, createStore} from 'redux';  // 创建 Store 
import thunk from 'redux-thunk'; // thunk中间件
import reducer from './reducers'

// redux布局部分;
const middleware = [thunk];

// 创建 Redux store 来存放应用的状态。
const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)
export default store;