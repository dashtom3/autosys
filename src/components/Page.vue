<template>
  <div class="page">
    <label class="page-item">
      <a href="javascript:void(0)" v-on:click="changePage(1)" class="font-nor">首页</a>
    </label>
    <label class="page-item" v-for="n in 5" v-if="n + args.currentPage - 3 > 0 && n + args.currentPage - 3 <= args.totalPage">
      <a href="javascript:void(0)" v-on:click="changePage(n + args.currentPage - 3)" class="font-nor" v-bind:class="{active: (n == 3) }">{{n + args.currentPage - 3}}</a>
    </label>
    <label class="page-item">
      <a href="javascript:void(0)" v-on:click="changePage(args.totalPage)" class="font-nor">尾页</a>
    </label>
  </div>
</template>
<script>
export default {
  name: 'page',
  props: ['args'],
  methods: {
    changePage: function (value) {
      this.$emit('page', value)
    }
  }
}
</script>
<style scoped>
.page {
  text-align: right;
  height: 40px;
  padding: 10px 10px;
}
.page-item a{
  text-decoration: none;
}
.page-item a.active {
  color: #3DA8F5;
}
.page-item {
  margin-right: 10px;
  border: 1px solid #eeeeee;
  background-color: transparent;
  padding: 5px 10px;
}

</style>
