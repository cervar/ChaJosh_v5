<template>
  <b-row class="vh-100 vw-100 row-login">
    <b-col sm="5" class="d-flex justify-content-center align-items-center left-login">

      <div class="col-8">
        <h2 class="text-center mb-5 title-login">prijavi se</h2>
      <b-form>
      <b-form-group
        label="E-mail:"
        label-for="email"
      >
        <b-form-input
          id="email"
          type="email"
          placeholder="vaš email@email.com"
          autocomplete="off"
          v-model.trim="$v.form.email.$model"
          :state="getValidation('email')"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="password">
        <label class="d-flex justify-content-between">
          Lozinka

          <small><a href="#">Zaboravili ste lozinku?</a></small>
        </label>
        <b-form-input
          id="password"
          type="password"
          placeholder="Upišite vašu lozinku"
          v-model.trim="$v.form.password.$model"
          :state="getValidation('password')"
        ></b-form-input>
      </b-form-group>

      <b-button 
        type="button" 
        variant="primary"  
        block
        @click="login"
        ><i class="fas fa-sign-in-alt"></i> ulaz</b-button>

      <hr>

      <b-button 
        type="button" 
        variant="outline-secondary"  
        block
        @click="goToRegister"
        ><i class="fas fa-user-plus"></i> nemam račun</b-button>
    </b-form>
    </div>

    </b-col>
    <b-col sm="7" class="side-login d-flex justify-content-center align-items-center">
      <img src="../assets/images/login.svg" class="img-login" />
    </b-col>
  </b-row>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import UsersModel from "@/models/UsersModel";
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  mixins: [ToastMixin],

  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },

  validations: {
    form: {
      email: {
        required, 
        email
      },

      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$error) return;

      let user = await UsersModel.params({email: this.form.email}).get();

      if(!user || !user[0] || !user[0].email) {
        this.showToast("greška", "Erro!", "lozinke se ne poudaraju");
        this.clearForm();
        return;
      }

      user = user[0];
      if(user.password !== this.form.password) {
        this.showToast("greška", "Erro!", "lozinke se ne poudaraju");
        this.clearForm();
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(user));
      this.$router.push({name: "list"});
    },

    clearForm() {
      this.form = {
        email: "",
        password: ""
      }
    },

    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    },

    goToRegister() {
      this.$router.push({ name: "register" });
    }
  },
}
</script>

<style>
*, 
*:after,
*:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}

.row-login {
  margin-left: 0 !important;
}

.img-login {
  width: 600px;
  height: 600px;
}

.left-login {
  background-color: #f2f2f2;
}

.title-login {
  font-weight: bold;
}
</style>
