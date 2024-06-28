import { createStore } from "vuex"; //Importamos vuex
//Importamos la configuracion de firebase y los metodos de firebase que nos permiten realizar el CRUD
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

  //En el state de firebase guardamos el estado global de la aplicacion
  state: {
    //usuarios es el array vacío que llenaremos con la base de datos traida de firebase
    usuarios: [],
  },
  getters: {},
  mutations: {
    //Las mutaciones sirven para modificar el estado global de la aplicacion
    //SET_USUARIOS es una mutacion que recibe el estado y los usuarios como parametros de argumento para modificarlo, con los nuevos usuarios traidos desde la base de datos.
    SET_USUARIOS(state, usuarios) {
      state.usuarios = usuarios;
    },

    //ADD_USER es una mutacion que recibe el estado y el usuario como argumentos para modificarlo, con el nuevo usuario traido desde la base de datos.
    ADD_USER(state, usuario) {
      state.usuarios.push(usuario);
    },

    //DELETE_USER es una mutacion que recibe el estado y el id del usuario como argumentos para eliminar el usuario de la base de datos.
    DELETE_USER(state, id) {
      state.usuarios = state.usuarios.filter((u) => u.id !== id);
    },
  },

  //Las actions sirven para modificar el estado global de la aplicacion y realizar las mutaciones que modifican el estado
  actions: {

    //getUsers es una accion que recibe el estado y el usuario como argumentos para modificarlo, con los nuevos usuarios traidos desde la base de datos. Para llevar acabo el action se realiza un commit a la mutacion SET_USUARIOS.
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
    //addUser es un action que sirve para agregar un nuevo usuario a la base de datos, recibe el estado y el usuario como argumentos. y le realiza un commit a la mutacion ADD_USER.
    async addUser({ commit }, { name, email, phone }) {
      const db = getFirestore(firebaseApp);
      const usuariosRef = collection(db, "usuarios");
      const usuario = {
        nombre: name,
        mail: email,
        telefono: phone,
      };
      const docRef = await addDoc(usuariosRef, usuario);
      commit("ADD_USER", { id: docRef.id, ...usuario }); // id: docRef.id es para traer el id del usuario, y ...usuario es para traer todos los datos del usuario agregados (es el payload).
    },

    //deleteUser es una mutacion que recibe el estado y el id del usuario como argumentos para eliminar el usuario de la base de datos. Llama a la funcion deleteDoc de firebase para borrar el usuario y realiza un commit a la mutacion DELETE_USER.
    async deleteUser({ commit }, id) {
      const db = getFirestore(firebaseApp);
      const usuariosRef = collection(db, "usuarios");
      const usuarioDoc = doc(db, "usuarios", id);
      await deleteDoc(usuarioDoc);
      commit("DELETE_USER", id);
    },
  },
  modules: {},
});
