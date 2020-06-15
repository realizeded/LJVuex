let _Vue = null;
let inited = false;
class Store {
    constructor(options) {
        // 处理state getters
        let getters = options.getters;
        let state = new _Vue({
            data:options.state,
            computed:getters
        });
        this.getters = state;
        this.state = state;
        //处理mutations
        let mutations = options.mutations;
        this.mutations = mutations;
        //处理actions
        let actions = options.actions;
        this.actions = actions;

    }
    commit(mutationName,payload) {
        if(this.mutations[mutationName]==null) {
            throw Error(`${mutationName} is not defined`);
        }
        this.mutations[mutationName](this.state,payload);
    }
    dispatch(actionName,payload) {
        return new Promise(function(resolve,reject) {
            this.actions[actionName]({
                state:this.state,
                commit:this.commit,
                dispatch:this.dispatch},payload);

        }.bind(this));
    }

}

function filter(target,filter) {
    return Object.keys(filter).filter(item=>{
        return target.includes(item);
    } );
}

function install(vue) {
    if(_Vue===vue) {
        throw Error('Cannot be reinstalled');
    }
    _Vue = vue;
    _Vue.mixin({
        beforeCreate:initLJX
    });
}
function initLJX() {
    if(!inited) {
        inited = true;
        return;
    }
    if(this.$options&&this.$options.store) {
        this.$store = this.$options.store;
    } else {
        this.$store = this.$parent.$store;
    }
}
export default {
    Store,
    install,
}