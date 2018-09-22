<template>
  <div class="body">
    <h1>Cadastro</h1>
    <form @submit.prevent="grava()" class="form-cadastro">
      <div class="form-group">
        <label for="name">Nome Completo</label>
        <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="João da Silva" required>
        <p> {{ check.name }} </p>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="user.email" type="email" v-on:input="validate('email')" class="form-control" id="email" aria-describedby="emailHelp" placeholder="joaosilva@exemplo.com" required>
        <small id="emailHelp" class="form-text text-muted">Não enviaremos propaganda para seu email.</small>
        <p> {{ check.email }} </p>
      </div>
      <div class="form-group">
        <label for="user">Usuário</label>
        <input v-model="user.user" type="text" v-on:input="validate('user')" class="form-control" id="user" aria-describedby="emailHelp" placeholder="João" required>
        <p> {{ check.user }} </p>
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Senha" required>
        <small id="emailHelp" class="form-text  text-muted">Não compartilhe sua senha.</small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    
  </div>
</template>

<script>
import User from '../domain/user/User';

export default {
  name: 'Cadastro',

  components: {
  },

  data() {
    return {
      user: new User(),
      check: new User()
    }
  },

  methods: {
    grava() {
      this.$http.post('users', {'name': this.user.name, 'email': this.user.email, 'user': this.user.user, 'password': this.user.password})
      .then(res => res.json())
      .then(check => {
        if(check[1] == true) this.$router.push({ name: 'home' });
        else if(check[1] == false) {
          alert("Mude os campos que já existem.");
        }
      });
    },

    validate(name) {
      this.$http.get(`users/validation?name=${name}&value=${this.user[name]}`)
      .then(res => res.json())
      .then(check => {
        if(check && check.check != false) {
          this.check[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} já existe.`
          if(name == 'user') this.check[name] = 'Usuário já existe.' + ` Sugestão: ${
            this.user.user + Math.floor(Math.random() * Math.floor(10)) + Math.floor(Math.random() * Math.floor(10))
          }`
        }
        else if(check.check == false) this.check[name] = 'Nome válido.'
      });
    }
  }
  
}
</script>

<style scoped>
  .body {
    position: relative;
    width: 100%;
    text-align: center;
  }
  .form-cadastro {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    text-align: center;
  }
  .form-cadastro .checkbox {
    font-weight: 400;
    text-align: left;
  }
  .form-cadastro .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-cadastro .form-control:focus {
    z-index: 2;
  }
  .form-cadastro input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-cadastro input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
