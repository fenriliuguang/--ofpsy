<template>
  <div class="items animated fadeIn">
    <div class="works" style="height:21px" @mouseover="over" @mouseleave="leave">
      <div class="def">
        {{c}}
      </div>
      <div class="icon">
        <img v-if="f" @click="changePlace" class="img point" src="../assets/check.png" alt="完成">
        <img v-else @click="changePlace" class="img point" src="../assets/rotate-ccw.png" alt="恢复">
        <img @click="remove" class="img point" src="../assets/trash.png" alt="删除">
        <img @click="edit" class="img point" src="../assets/edit.png" alt="编辑">
      </div>
    </div>
    <div class="edit">
      <input class="input" @keydown.enter="change" maxlength="25" type="text" v-model="content">
      <em class="point iconfont" @click="change">&#xe664;</em>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['c','i','f','warn'],
  data () {
    return {
      content: this.c 
    }
  },
  methods: {
    over () {
      $(this.$el).find(".icon").show().addClass("animated fadeIn");
    },
    leave () {
      $(this.$el).find(".icon").hide();
    },
    edit () {
      $(this.$el).find(".works").hide();
      $(this.$el).find(".edit").show();
      $(this.$el).find("input").focus();
    },
    change () {
      $(this.$el).find(".edit").hide();
      $(this.$el).find(".works").show();
      let s = this
      let a = {
        isF: s.f,
        index: s.i,
        content: s.content
      }
      this.$emit('change',a)
    },
    remove () {
      let s = this
      let information = {
        isF: s.f,
        index: s.i
      }
      $(this.$el).removeClass("animated fadeIn");
      $(this.$el).addClass("animated bounceOutLeft");
      setTimeout(function(){
        console.log(s.i)
        $(s.$el).removeClass("animated bounceOutLeft");
        s.$emit('delete',information)
      },1000)
    },
    changePlace () {
      let s = this
      let information = {
        isF: s.f,
        index: s.i,
        content: s.content
      }
      console.log(information)
      $(this.$el).removeClass("animated fadeIn");
      $(this.$el).addClass("animated fadeOutLeft line");
      setTimeout(function(){
        s.$emit('changePlace',information)
        $(s.$el).removeClass("animated fadeOutLeft line");
        s.$emit('delete',information)
      },1000)
    }
  },
  watch: {
   content: function (val) {
      if(val.length>=25){
        console.log(this.warn)
        $("#w").html(this.warn)
        setTimeout(function(){
          $(".warn").remove()
        },1500)
      } 
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon{
  font-size:0;
  display: none;
}
.img{
  opacity: .4;
  width: 20px;
}
.img:hover{
  opacity: 1;
}
.def{
  float: left;
  width: 400px;
  cursor:default 
}
.edit{
  display: none;
}
.point{
  float: right;
  cursor: pointer;
}
.line{
  text-decoration-line: line-through;
}
.items{
  height: 25px;
  margin: 10px 0 0 0;
  border-bottom: 1px solid rgb(168, 148, 34);
}
.icon{
  float: right;
}
.input{
  background-color:  rgb(219, 218, 116);
  width: 400px;
  color: rgb(89, 17, 204);
  font: 1em sans-serif;
  border: none;
  outline: none;
}
</style>
