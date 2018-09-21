<template>
  <div  class="body">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ClientComponent'
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

html,
body {
  height: 100%;
}
</style>
