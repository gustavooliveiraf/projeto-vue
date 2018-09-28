<template>
  <div class="body">
    <h1>Cadastro</h1>
    <form @submit.prevent="grava()" class="form-cadastro">

      <div class="input-group form-cadastro2">
        <input @input="user.name = $event.target.value" type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Nome Completo">
      </div>

      <div class="input-group form-cadastro2" :class="inputActiveUser">
        <input class="form-control" :class="checkInputUser" @input="user.user = $event.target.value" @focus="inputActives(true, 'user')" @blur="inputActives(false, 'user')" type="text" v-on:input="checkField('user')" id="user"placeholder="Usuário">
        <div class="input-group-prepend ">
            <i v-show="checkInputUser" class="input-group-text material-icons check-button check-i" :class="check.user">
              {{ check.user }}
            </i>
          </span>
        </div>
      </div>

      <div class="input-group form-cadastro2" :class="inputActiveEmail">
        <input class="form-control" :class="checkInputEmail" @input="user.email = $event.target.value" @focus="inputActives(true, 'email')" @blur="inputActives(false, 'email')" type="text" v-on:input="checkField('email')" id="user"placeholder="E-mail">
        <div class="input-group-prepend ">
            <i v-show="checkInputEmail" class="input-group-text material-icons check-button check-i" :class="check.email">
              {{ check.email }}
            </i>
          </span>
        </div>
      </div>

      <div class="input-group form-cadastro2">
        <input @input="user.company = $event.target.value" type="text" class="form-control" id="company" placeholder="Empresa">
      </div>

      <div class="input-group form-cadastro2">
        <input @input="user.cnpj = $event.target.value" type="text" class="form-control" id="cnpj" placeholder="CNPJ">
      </div>

      <div class="input-group form-cadastro2">
        <input @input="user.phone = $event.target.value" type="text" class="form-control" id="phone" placeholder="Telefone">
      </div>
      
      <div class="input-group form-cadastro2">
        <input @input="user.password = $event.target.value" type="password" class="form-control mb-0" id="password" placeholder="Senha">
      </div>

      <div class="input-group form-cadastro2">
        <input @input="passwordConfirmation = $event.target.value" type="password" class="form-control" id="password" placeholder="Confirmar Senha">
      </div>
      
      <button type="submit" class="btn btn-primary">Cadastrar</button>
      
    </form>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
      passwordConfirmation: '',
      inputActiveUser: '',
      inputActiveEmail: '',
      checkInputUser: '',
      checkInputEmail: '',
      iconUser: '',
      iconEmail: ''
    }
  },

  methods: {
    grava() {
      if (true) {
        this.$http.post('users', {
          'name': this.user.name,
          'user': this.user.user,
          'email': this.user.email,
          'company': this.user.company,
          'password': this.user.password,
          'cnpj': this.user.cnpj,
          'phone': this.user.phone
        })
        .then(res => res.json())
        .then(check => {
          if(check[1] == true) this.$router.push({ name: 'home' });
          else if(check[1] == false) {
            alert('Mude os campos que já existem')
          }
        });
      }
    },

    checkField(field_name) {
      this.$http.get(`users/validation?name=${field_name}&value=${this.user[field_name]}`)
      .then(res => res.json())
      .then(check => {
        if (this.user.user) this.checkInputUser = 'check-input'
        else this.checkInputUser = ''
        if (this.user.email) this.checkInputEmail = 'check-input'
        else this.checkInputEmail = ''
        if(check && check.check != false) {
          if(field_name == 'user') this.check.user = 'cancel'
          else if(field_name == 'email') this.check.email = 'cancel'
        }

        else if(check.check == false) {
          if(field_name == 'user') {
            if (this.user.user) this.check.user = `check_circle`
            else this.check.user = ''
          }
          if(field_name == 'email') {
            if (this.user.email) this.check.email = `check_circle`
            else this.check.email = ''  
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
  }
  
}
</script>

<style scoped>
  .body {
    position: relative;

    text-align: center;
  }
  .form-cadastro2 {
    width: 100%;
    max-width: 330px;
    margin: 10px auto;
    text-align: center;
  }
  .form-cadastro2 input[type="password"] {
    margin-bottom: 10px;
  }
  .check_circle {
    color: green;
  }
  .cancel {
    color: red;    
  }
  .check-i {
    background-color: white;
    border-left: none;
    border-radius: 0 4px 4px 0!important;
  }
  .check-input  {
    border-right: none !important;
   }
 .check-input:focus {
    border: 1px solid #ced4da;
    border-right: none !important;
    box-shadow: none !important;
    border-radius: 4px 0 0 4px !important;
  }
  .divv-control {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    border-radius: 4px
  }
  .divv-control input, .divv-control .check-i{
    border-color: #80bdff!important;
  }
</style>
