<template>
  <div id="main">
    <div id="w"></div>
    <div id="nav">
        <li class="nav t">
          <strong>ToDo</strong>
        </li>
        <li @click="tabA" v-bind:class=" {op : isOp}" class="navR t p">
          完成
        </li>
        <li id="line" class="navR"></li>
        <li @click="tabB" v-bind:class=" {op : !isOp}" class="navR t p">
          待办
        </li>
        <li class="navR t"><em @click="sumbit" class="iconfont p">&#xe66f;</em></li>
        <li class="navR i">
          <input @keydown.enter="sumbit" maxlength="25" v-model="newItemValue" type="text"
          placeholder="输入新建事项"
          />
        </li>
    </div>
    <div id="items">
      <div v-bind:class="{ hide : !isOp}" id="a">
        <todo-item v-for="(item, index) in list" :key="index"
        :c="item"
        :i="index"
        :f="ido"
        :warn="warn"
        @delete="handleDelete"
        @change="handleChange"
        @changePlace="handleChangePlace"
        >
        </todo-item>
      </div>
      <div v-bind:class="{ hide : isOp}" id="b">
        <todo-item v-for="(item, index) in list_done" :key="index"
        :c="item"
        :i="index"
        :f="done"
        :warn="warn"
        @delete="handleDelete"
        @change="handleChange"
        @changePlace="handleChangePlace"
        >
        </todo-item>
      </div>
    </div>
  </div>
</template>

<script>
import item from './components/item'
var locationData_done = [];
var locationData = [];
var flag_done = false
var flag = false
for(let i=0; i<localStorage.length; i++){
  let key = localStorage.key(i);
  if(key==='toDo'){
    flag = true
  }
  if(key==='done'){
    flag_done = true
  }
}
if(flag){
  locationData = eval('(' + localStorage.getItem("toDo") + ')').item
}
else{
  localStorage.setItem("toDo",'{"item":[]}')
}
if(flag_done){
  locationData_done = eval('(' + localStorage.getItem("done") + ')').item
}
else{
  localStorage.setItem("done",'{"item":[]}')
}
//localStorage.removeItem('done')
$(".tab").click(function(){
  console.log('s')
})
export default {
  components: {
    'todo-item': item
  },
  data () {
    return {
      newItemValue: '',
      list: locationData,
      list_done: locationData_done,
      ido: true,
      done: false,
      isOp: true,
      warn: '<div class="warn animated shake">输入内容过长</div>',
      update:function(newdata){
        let obj = {
          item : newdata.list
        }
        if(newdata.isF){
          localStorage.toDo =  JSON.stringify(obj)
        }
        else
        {
          localStorage.done =  JSON.stringify(obj)
        }
      }
    }
  },
  methods: {
    sumbit () { 
      if (this.newItemValue !== '') {
        this.list.push(this.newItemValue)
      }
      let t = this.list
      let s = {
        list: t,
        isF: true
      }
      this.newItemValue = ''
      this.update(s)
    },
    handleDelete (i) {
      let s = {
        list:[],
        isF: i.isF
      }
      if(i.isF){
        this.list.splice(i.index,1)
        s.list = this.list
      }
      else {
        this.list_done.splice(i.index,1)
        s.list = this.list_done
      }
      this.update(s)
    },
    handleChange (a) {
      let s = {
        list:[],
        isF: a.isF
      }
      if(a.isF){
        $('#a .def').eq(a.index).html(a.content)
        this.list[a.index] = a.content
        s.list = this.list
      }
      else {
        $('#b .def').eq(a.index).html(a.content)
        this.list_done[a.index] = a.content
        s.list = this.list_done
      }
      this.update(s)
    },
    handleChangePlace (i) {
      let s = {
        list:[],
        isF: !i.isF
      }
      console.log(s)
      if(i.isF)
      {
        this.list_done.push(i.content)
        s.list = this.list_done
      }
      else {
        this.list.push(i.content)
        s.list = this.list
      }
      this.update(s)
    },
    tabA () {
      this.isOp = false
    },
    tabB () {
      this.isOp = true
    }
  },
  watch: {
    newItemValue: function (val) {
      if(val.length>=25){
        $("#w").html(this.warn)
        setTimeout(function(){
          $(".warn").remove()
        },1500)
      }
    }
  }
}
</script>

<style>
#main {
  z-index: 1;
  width: 610px;
  height: 1080px;
  position: relative;
  left: calc(50% - 610px/2);
}
#line {
  height: 16px;
  width: 1px;
  margin: 8px 0 7px 0;
  opacity: 0.7;
  background-color: whitesmoke;
}
.navR{
  display: block;
  float: right;
}
#nav{
  line-height: 20px;
  padding: 5px;
  color: whitesmoke;
  background-color: rgb(28, 49, 35);
  width: 600px;
  height: 30px;
  border-radius: 2px 2px 1px 1px;
}
.nav{
  display: block;
  float: left;
}
#items{
  background: rgb(219, 218, 116);
  padding: 30px;
  height: 500px;
  overflow: scroll;
}
#items::-webkit-scrollbar {
    display: none;
}
#img {
  width: 20px;
}
.warn{
  color: red;
  border-radius: 5px;
  border: 1px solid red;
  text-align: center;
  z-index: 100;
  padding: 10px;
  width: 100px;
  height: 20px;
  position: absolute;
  top: 100px;
  left: calc(50% - 100px/2);
}
.t{
  margin: 5px;
}
.i{
  margin: 3px 0 0 0;
}
.p{
  cursor: pointer;
}
.op{
  opacity: .7;
}
.hide{
  display: none;
}
</style>
