import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import yong from "./yong";
import wen from "./wen";
import ting from "./ting";

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }
    
  ].concat(yong,wen,ting)
})
