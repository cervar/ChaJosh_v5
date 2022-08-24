export const state = () => ({
  list: [
    {
      name: "Lidija Bačić",
      phone: "1-770-736-8031"
    },
    {
      name: "Serđo Valić",
      phone: "010-692-6593"
    },
    {
      name: "DJ Kriza",
      phone: "1-463-123-4447"
    }
  ]
});

export const getters = {
  getContacts(state) {
    return state.list;
  },

  filteredContacts: state => search => {
    return state.list.filter(contact => {
      return contact.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  // filteredContactsLength: (state, getters) => {
  //   return getters.filteredContacts.length;
  // }
};

export const mutations = {
  addContact(state, payload) {
    state.list.push(payload);
  },
  deleteContact(state, payload) {
    const index = state.list.indexOf(payload);
    if (index > -1) {
      state.list.splice(index, 1);
    }
  }
};

export const actions = {
  addContact: (context, payload) => {
    context.commit("addContact", payload);
  },
  deleteContact: (context, payload) => {
    context.commit("deleteContact", payload);
  }
};
