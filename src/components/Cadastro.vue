<template>
  <div class="body">
    <NavBar></NavBar>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <h1>Cadastro</h1>
    <form @submit.prevent="grava()" class="form-cadastro">
      <div class="input-group form-cadastro2">
        <input @input="user.name = $event.target.value" type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Nome Completo">
      </div>

<!-- o proximo div eh o que testa -->

      <div class="input-group form-cadastro2" :class="inputActiveUser">
        <input class="form-control check-input" @input="user.user = $event.target.value" @focus="inputActives(true, 'user')" @blur="inputActives(false, 'user')" type="text" v-on:input="checkField('user')" id="user"placeholder="Usuário">
        <div class="input-group-prepend ">
            <i class="input-group-text material-icons check-button check-i" :class="'error'">
              check_circle
            </i>
          </span>
        </div>
      </div>

      <div class="input-group form-cadastro2" :class="inputActiveEmail">
        <input class="form-control check-input" @input="user.user = $event.target.value" @focus="inputActives(true, 'email')" @blur="inputActives(false, 'email')" type="text" v-on:input="checkField('user')" id="user"placeholder="E-mail">
        <div class="input-group-prepend ">
            <i class="input-group-text material-icons check-button check-i" :class="'sucess'">
              check_circle
            </i>
          </span>
        </div>
      </div>
      
      <div class="input-group form-cadastro2">
        <input @input="user.password = $event.target.value" type="password" class="form-control mb-0" id="password" placeholder="Senha">
      </div>

      <div class="input-group form-cadastro2">
        <input @input="passwordConfirmation = $event.target.value" type="password" class="form-control" id="password" placeholder="Confirmar Senha">
      </div>
      
      <button type="submit" class="btn btn-primary">Cadastrar</button>
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
      classes: new User(),
      classe: 'error',
      passwordConfirmation: '',
      inputActiveUser: '',
      inputActiveEmail: ''
    }
  },

  methods: {
    grava() {
      if (this.validate()) {
        this.$http.post('users', {
          'name': this.user.name,
          'user': this.user.user,
          'email': this.user.email,
          'company': this.user.company,
          'password': this.user.password
        })
        .then(res => res.json())
        .then(check => {
          if(check[1] == true) this.$router.push({ name: 'home' });
          else if(check[1] == false) {
            this.validate(true);
          }
        });
      }
    },

    checkField(field_name) {
      this.$http.get(`users/validation?name=${field_name}&value=${this.user[field_name]}`)
      .then(res => res.json())
      .then(check => {
        if(check && check.check != false) {
          this.check[field_name] = `${field_name.charAt(0).toUpperCase() + field_name.slice(1)} já existe.`
          if(field_name == 'user') {
            this.check['user'] = 'Usuário já existe.' + ` Sugestão: ${
              this.user.user + Math.floor(Math.random() * Math.floor(10)) + Math.floor(Math.random() * Math.floor(10))
            }`
            this.classe = 'error'
          }
          else if(field_name == 'email') {
            this.check[field_name] = 'E-mail já existe.'
            this.classe.email = 'error'
          }
        }

        else if(check.check == false) {
          if(field_name == 'user') {
            this.check[field_name] = `Usuário válido.`
            this.classe.user = 'sucess'
          }
          if(field_name == 'email') {
            this.check[field_name] = `E-mail válido.`
            this.classe.user = 'sucess'
          }
        }
      });
    },

    inputActives(booleano, name) {
      if(booleano == true) {
        if (name == 'user') this.inputActiveUser = 'divv-control'
        else this.inputActiveEmail = 'divv-control'
      }
      else {
        if (name == 'user') this.inputActiveUser = ''
        else this.inputActiveEmail = ''
      }
    },

    validate (cadastrar=false) {
      if (cadastrar == true) {
        this.$notify({
            group: 'Warn',
            title: 'Alerta!',
            type: 'warn',
            text: 'Mude os campos que já existem.'
          });
        return false;
      }
      if (this.user.name === "") {
        this.$notify({
            group: 'Warn',
            title: 'Alerta!',
            type: 'warn',
            text: 'O campo nome não pode ficar vazio.'
          });
        return false;
      }
      if (this.user.email === "") {
        this.$notify({
            group: 'Warn',
            title: 'Alerta!',
            type: 'warn',
            text: 'O campo email não pode ficar vazio.'
          });
        return false;
      }
      if (!(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/.test(this.user.email))) {
        this.$notify({
            group: 'Warn',
            title: 'Alerta!',
            type: 'warn',
            text: 'Endereço de email inválido.'
          });
        return false;
      }
      if (this.user.password === "") {
        this.$notify({
          group: 'Warn',
          title: 'Alerta!',
          type: 'warn',
          text: 'O campo senha não pode ficar vazio.'
        });
        return false;
      }
      if (this.user.password !== this.passwordConfirmation) {
        this.$notify({
          group: 'Error',
          title: 'Alerta!',
          type: 'warn',
          text: 'As senhas informadas não correspondem.'
        });
        return false;
      }
      if (this.user.company == '') {
        this.$notify({
          group: 'Error',
          title: 'Alerta!',
          type: 'warn',
          text: 'O campo Empresa não pode ficar vazio.'
        });
        return false;
      }
      return true;
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
  .form-cadastro2 {
    width: 100%;
    max-width: 330px;
    padding: 5px;
    margin: auto;
    text-align: center;
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
  .sucess {
    color: green;
  }
  .error {
    color: red;
    
  }
  .check-i {
    background-color: white;
    border-left: none;
    /* border: 0; */
  }
  .check-input  {
    border-right: none !important;
   }
 .check-input:focus {
    border: 1px solid #ced4da;
    border-right: none !important;
    box-shadow: 0 !important;
    border-radius: 4px !important;
  }
  .divv-control {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    padding: 0;
    border-radius: 4px
  }
</style>
