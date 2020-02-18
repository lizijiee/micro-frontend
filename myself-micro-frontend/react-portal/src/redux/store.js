// 创建 Store 
import {
    applyMiddleware,
    createStore
} from 'redux';
// 引入thunk中间件
import thunk from 'redux-thunk';
import reducer from './reducers'

// redux布局部分;
const middleware = [thunk];

// 创建 Store并把reducer传递进来
// 创建 Redux store 来存放应用的状态。
const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)
export default store;