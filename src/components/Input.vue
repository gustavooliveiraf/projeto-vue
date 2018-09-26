<template>
  <input type="text" @input="field_parent = $event.target.value, disparaAcao()" class="form-control" id="user" aria-describedby="emailHelp" placeholder="Usuário" required>
</template>

<script>

export default {
  data () {
   return {
     field_parent: ''
   }
  },

  methods: {
    disparaAcao() {
     
      this.$emit('interface', this.field_parent)
      this.$emit('ativaFuncao')
    }
  }
}
</script>

<style>
  
</style>