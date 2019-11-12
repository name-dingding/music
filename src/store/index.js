import Vue from 'vue'
import Vuex from 'vuex'

import moduleA from "./module/moduleA";
import request from "../utils";

Vue.use(Vuex)
const state = {
  song: null, //id
  songurl: null,
  songimg: null,
  singer: null,
  songname: null,
  // songlist: [],   // 播放清单
  playlist: [],  //歌单
  isplaybar: false,
  istabbar: true,
  toggle: true,
  end: false,
  index: null,  //歌单索引
  mode: 0       //mode播放模式 默认为0
}
const getters = {
}

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    listsend: (state, payload) => {
      state.listid = payload
    },
    songid: (state, payload) => {
      state.songimg = payload.songlist.picUrl
      state.singer = payload.songlist.ar
      state.songname = payload.songlist.name
    },
    playlist: (state,payload) => {
      state.playlist=payload
    },
    playbardisplay: (state) => {
      state.isplaybar= true
    },
    playbar:(state) => {
      state.isplaybar=false
    },
    toggles: (state) => {
      state.toggle=!state.toggle
    },
    end: (state) => {
      state.end=true
    },
    mode: ((state, payload) => {
      state.mode=payload
    })
  },
  actions:{
    songidd({commit,state},payload){
      state.index=payload.index
      request('song/url?id=' + payload.songlist.id, res => {
        state.songurl=res.data.data[0].url
        state.song=res.data.data[0].id
        }, err => {
          console.log(err)
        })
      commit('songid',payload)
    }
  },
  modules: {
    moduleA
  }
})
