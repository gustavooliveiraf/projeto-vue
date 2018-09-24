<template>
  <div class="body">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <h1>Cadastro</h1>
    <form @submit.prevent="grava()" class="form-horizontal form-cadastro">
      <div class="form-group has-success has-feedback">
        <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Nome" required data-container="body" data-toggle="popover" data-placement="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
        <p></p>
      </div>
      <div class="form-group has-feedback" :class="validateFigure">
          <input v-model="user.email" type="email" v-on:input="validate('email')" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" required>
          <p> {{ check.email }} </p>
          <span class="glyphicon glyphicon-ok form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback" :class="validateFigure">
          <input v-model="user.user" type="text" v-on:input="validate('user')" class="form-control" id="user" aria-describedby="emailHelp" placeholder="Usuário" required>
          <p> {{ check.user }} </p>
          <span class="glyphicon glyphicon-ok form-control-feedback"></span>
      </div>
      <div class="form-group has-success has-feedback">
          <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Senha" required>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
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
      check: new User(),
      flag: undefined
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
          this.flag = false
          this.check[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} já existe.`
          if(name == 'user') this.check[name] = 'Usuário já existe.' + ` Sugestão: ${
            this.user.user + Math.floor(Math.random() * Math.floor(10)) + Math.floor(Math.random() * Math.floor(10))
          }`
        }
        else if(check.check == false) {
          this.check[name] = 'Nome válido.'
          flag = true;
        }
      });
    }
  },

  computed: {

    validateFigure() {
        if(this.flag) return 'has-success';
        else  return 'has-error';
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
