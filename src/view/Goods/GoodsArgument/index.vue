<template>
  <div>
    <Breadcrumb :pathList="$route.matched"></Breadcrumb>

    分类参数
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
