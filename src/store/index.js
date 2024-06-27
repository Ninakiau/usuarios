import { createStore } from "vuex";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebaseApp from "../firebaseconfig.js";
export default createStore({
  state: {
    usuarios: [],
  },
  getters: {},
  mutations: {
    SET_USUARIOS(state, usuarios) {
      state.usuarios = usuarios;
    },
    ADD_USER(state, usuario) {
      state.usuarios.push(usuario);
    },

    DELETE_USER(state, id) {
      state.usuarios = state.usuarios.filter((u) => u.id !== id);
    },
  },
  actions: {
    getUsers({ commit }) {
      const db = getFirestore(firebaseApp);
      const usuariosRef = collection(db, "usuarios");
      onSnapshot(usuariosRef, (snapshot) => {
        const usuarios = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        commit("SET_USUARIOS", usuarios);
      });
    },
    async addUser({ commit }, { name, email, phone }) {
      const db = getFirestore(firebaseApp);
      const usuariosRef = collection(db, "usuarios");
      const usuario = {
        nombre: name,
        mail: email,
        telefono: phone,
      };
      const docRef = await addDoc(usuariosRef, usuario);
      commit("ADD_USER", { id: docRef.id, ...usuario });
    },
    async deleteUser({ commit }, id) {
      const db = getFirestore(firebaseApp);
      const usuariosRef = collection(db, "usuarios");
      const usuarioDoc = doc(db, úsuarios, id);
      await deleteDoc(usuarioDoc);
      commit("DELETE_USER", id);
    },
  },
  modules: {},
});
