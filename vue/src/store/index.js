import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/*
 * The authorization header is set for axios when you login but what happens when you come back or
 * the page is refreshed. When that happens you need to check for the token in local storage and if it
 * exists you should set the header so that it will be attached to each request
 */
const currentToken = localStorage.getItem('token')
const currentUser = JSON.parse(localStorage.getItem('user'));

if (currentToken != null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store({
  state: {
    token: currentToken || '',
    user: currentUser || {},
    // player: {
    //   id: null,
    //   username: "",
    //   selectCharacter: "",
    //   imageSource: "",
    //   position: 0,
    //   //isRolled: false,
    //   money: 1000000,
    //   stocksOwned: [],
    // },
    players: [],

    currentGame: {
      title: "",
      duration: "",
    }
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = '';
      state.user = {};
      axios.defaults.headers.common = {};
    },
    ADD_PLAYER(state, player) {
      state.players.unshift(player);
    },

    CREATE_GAME(state, game) {
      state.currentGame.title = game.title;
      state.currentGame.duration = game.maxDuration;
    },
    SET_IMAGE(state, player) {
      state.player = player;
    },
    SET_POSITION(state, player) {
      state.player.position = player.position;
    },
    SET_ISROLLED(state, player) {
      state.player.isRolled = player.isRolled;
    },
    SET_TURN(state, player){
      state.player.isTurn = player.isTurn;
    },
  }

})
