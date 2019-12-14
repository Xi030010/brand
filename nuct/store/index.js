// import Vue from 'vue';//引入VUE
// import Vuex from 'vuex';//引入VUEX
// import Cookies from 'js-cookie';//引入cookie


// //使用VUEX
// Vue.use(Vuex);
// import persistedState from 'vuex-persistedstate'

// //创建VUEX实例
// export const store = () => 
//     new Vuex.Store({
//         plugins: [
//             persistedState()
//           ]
//     });


//要设置的全局访问的state对象
export const state = () => ({
    list: '1',
    token: '5ab727d12d127f78de40b20bcfa63a84',
});

//实时监听state的变化（最新状态）
export const getters = {
    getList: (state) => {
        return state.list;
    },
    getToken: (state) => {
        return state.token;
    }
};

//改变state初始值的方法
export const mutations = {
    setList: (state, payload) => {
        state.list = payload;
    },
    setToken: (state, payload) => {
        state.token = payload;
        //persistedState.setItem("token", payload)
        //localStorage.setItem("token", JSON.stringify(payload))
    }
};

//包含任何异步操作，异步出发mutations里边的方法
export const actions = {
    setList: (context, payload) => {
        context.commit("setList", payload);
    },
    setToken: (context, payload) => {
        context.commit("setToken", payload);
    }
};

