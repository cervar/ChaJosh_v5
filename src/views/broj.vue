<template>
  <div class="block">
    <h2 class="block__title">Imenik</h2>
    <input class="block__search" type="text" v-model="search" placeholder="Search contact..">
    <div class="block__add">
      <input
        class="input__name"
        :class="{'error': isEmptyNameField}"
        placeholder="Name"
        v-model.trim="name"
        ref="input-name"
      >
      <input
        type="tel"
        class="input__phone"
        :class="{'error': isEmptyPhoneField}"
        placeholder="Phone number"
        v-model.number.trim="phone"
        ref="input-phone"
      >
      <button class="btn__add" type="button" @click="addContact()">Dodaj kontakt</button>
    </div>
    <ol class="list block__list">
      <li class="list__item" v-for="(item, index) in filteredContacts(search)" :key="index">
        <span>{{item.name}}:</span>
        <span>{{item.phone}}</span>
        <button class="btn__delete" type="button" @click="deleteContact(item)">Izbriši</button>
      </li>
    </ol>
    <NuxtLink to="/broj">Imenik</NuxtLink>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      phone: "",
      search: "",
      isEmptyNameField: false,
      isEmptyPhoneField: false
    };
  },
  computed: {
    ...mapGetters({
      getContacts: "contacts/getContacts",
      filteredContacts: "contacts/filteredContacts"
      // filteredContactsLength: "contacts/filteredContactsLength"
    })
    // filteredContacts() {
    //   return this.getContacts.filter(contact => {
    //     return contact.name.toLowerCase().includes(this.search.toLowerCase());
    //   });
    // }
  },
  methods: {
    addContact() {
      if (this.name && this.phone) {
        this.$store.dispatch("contacts/addContact", {
          name: this.name,
          phone: this.phone
        });

        this.name = this.phone = "";

        this.isEmptyNameField = false;
        this.isEmptyPhoneField = false;
      } else {
        if (this.name) {
          this.isEmptyNameField = false;
        }
        if (this.number) {
          this.isEmptyNumberField = false;
        }
        this.checkValidation();
      }
    },
    checkValidation() {
      if (!this.name && !this.phone) {
        this.isEmptyNameField = true;
        this.isEmptyPhoneField = true;
      } else if (!this.phone) {
        this.isEmptyPhoneField = true;
      } else if (!this.name) {
        this.isEmptyNameField = true;
      } else {
        return;
      }
    },
    deleteContact(item) {
      this.$store.dispatch("contacts/deleteContact", item);
    }
  }
};
</script>

<style scoped>
input {
  height: 18px;
}
.block {
  width: calc(100% - 32px);
  margin: 0 auto;
}
.block__add {
  margin-bottom: 15px;
}
.block__search {
  margin-bottom: 15px;
}
.list__item {
  position: relative;
  width: 325px;
  margin-bottom: 15px;
}
.btn__add {
  padding: 5px;
  color: #fff;
  background-color: limegreen;
  border-radius: 5px;
}
.btn__add:hover {
  cursor: pointer;
}
.btn__add:focus {
  outline: none;
}
.btn__delete {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: inline-block;
  padding: 5px;
  color: #fff;
  background-color: tomato;
  border-radius: 5px;
}
.btn__delete:hover {
  cursor: pointer;
}
.btn__delete:focus {
  outline: none;
}

.input__name.error,
.input__phone.error {
  border-color: tomato;
}
.input__name.error::placeholder,
.input__phone.error::placeholder {
  color: tomato;
}
</style>
