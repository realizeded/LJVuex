# 模仿vuex实现简单的Vuex
## 功能实现
   * 1.state
   * 2.getters
   * 3.mutations
   * 4.actions
### state getters实现 
```
let state = new _Vue({
            data:options.state,
            computed:getters
        });
```   
这是vuex的一个核心逻辑

### actions和mutations实现
```
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
```
