<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>

    商品属性
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { Breadcrumb }
}
</script>

<style scoped>
</style>
