/*
STORE MODULE: CURRENT CUSTOMER 🙋‍♀️
In this module, data is stored about the customer this is currently signed in. This data is retrieved from the Firestore 'customers' collection.
*/
import { Notify } from "quasar";

import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    dataLoaded: false,
    data: {
      isSuperADMIN: false,
    },
    unsubscribe: null,
  },
  mutations: {
    update(state, customerData) {
      // Only update the fields that were changed
      state.data = Object.assign(state.data, customerData);
      state.dataLoaded = true;
    },
    addSubscription(state, subscription) {
      state.unsubscribe = subscription;
    },
    destroy(state) {
      state.dataLoaded = false;
      state.data = {};
      state.unsubscribe();
    },
  },
  actions: {
    subscribeToDatabase({ rootState, commit }) {
      const currentCustomerRef = doc(
        getFirestore(),
        "customers",
        rootState.auth.data.uid
      );

      onSnapshot(
        currentCustomerRef,
        (doc) => {
          commit("update", doc.data());
        },
        (error) => {
          Notify.create({
            message: error + " (currentCustomer.js)",
            icon: "mdi-alert",
          });
        }
      );
    },
  },
};
