<template>
  <div class="form-signin">
      <form @submit.prevent="grava()">
        <img class="logo-size mb-4" src="src/assets/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Realize seu login</h1>

        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="user.email" id="inputEmail" class="form-control" placeholder="E-mail" required="" autofocus="" type="email">

        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="user.password" id="inputPassword" class="form-control" placeholder="Senha" required="" type="password">

        <div class="checkbox mb-3">
          <label>
            <input value="remember-me" type="checkbox" class="margin-buttom"> Lembrar
          </label>
        </div>
        <div class="margin-up">
          <button class="btn btn-lg btn-primary btn-block margin-bottom" type="submit">Entrar</button>
          <router-link class="no-text-decoration" :to="{ name: 'cadastro'}"><button class="btn btn-lg red-btn-primary btn-block" type="submit">Cadastre-se</button></router-link>
          <p class="footer-size mt-5 mb-3 text-muted">© Casa dos garotões - Todos os direitos reservados</p>
        </div>
    </form>
  </div>
</template>

<script>

import User from '../domain/User';

export default {

  components: {
  },
  
  data() {
    return {
      user: new User()
    }
  },

  methods: {
    grava() {
      this.$http.post('users/login', {'email': this.user.email, 'password': this.user.password})
      .then(res => res.json())
      .then(check => {
        if(check.check == true) this.$router.push({ name: 'home' });
        else if(check.check == false) alert("E-mail ou senha inválido!");
        // this.user = new User();
      });
    }
  }
}

</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: 400;
  text-align: left;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.red-btn-primary {
  color: #fff;
  background-color: #ff1e00;
  border-color: #ff1e00;
}
.logo-size {
  width: 50%;
  height: auto;
}
.footer-size {
  font-size: x-small;
}
.margin-bottom {
  margin-bottom: 3px;
}
.margin-up {
  margin-top: -10px;
}
.no-text-decoration {
  text-decoration: none !important;
}
</style>