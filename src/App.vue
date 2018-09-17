<template>
<div class="form-signin">
  <form>
    <img class="logo-size mb-4" src="src/assets/chatIcon.png" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Realize seu login</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input id="inputEmail" class="form-control" placeholder="Email" required="" autofocus="" type="email">
    <label for="inputPassword" class="sr-only">Password</label>
    <input id="inputPassword" class="form-control" placeholder="Password" required="" type="password">
    <div class="checkbox mb-3">
      <label>
        <input value="remember-me" type="checkbox"> Lembrar
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
    <button class="btn btn-lg red-btn-primary btn-block" type="submit">Cadastre-se</button>
    <p class="footer-size mt-5 mb-3 text-muted">© Consenso Tecnologia - Todos os direitos reservados</p>
  </form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
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

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: 400;
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

</style>
