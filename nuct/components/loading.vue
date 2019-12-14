<!--  -->
<template>
    <div class="loading-page" v-if="loading">
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
  data () {
    return {
        loading: false
    };
  },
methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}

</script>
<style lang='less' scoped>
</style>