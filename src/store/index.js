import Vue from 'vue';
import Vuex from 'vuex';
import { firstNames, lastNames } from '../data/names'

Vue.use(Vuex);

const URL = "https://jsonplaceholder.typicode.com/posts";
 const headers = { 
     "Content-Type": "aplication/json" };

export default new Vuex.Store({
    state: () => (
        {
            allNews: [],		
        }
    ),
    mutations: {
        FETCH_NEWS(state, news) {
            let result = Array(99).fill(null);
            for(let i = 0; i < news.length; i++) {
                result[i] = Object.assign(news[i],{name: firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)]})
            }
            state.allNews = news;
        },
        DELETE_NEWS(state, id){
            const index = state.allNews.findIndex(news => news.id == id)
            state.allNews.splice(index, 1)
           }
    },
    actions: {
        fetchNews({ commit }) {
            fetch(URL, {headers})
            .then(response => response.json())
            .then(data => (commit("FETCH_NEWS", data)))
            .catch(error => {
                console.log(error);
              })
          },
          deleteNews({commit}, id) {
            if(confirm("Do you really want to delete?"))
            fetch((URL + "/" + id), {method: 'DELETE', ContentType: 'aplication/json'})
            .then(() => {              
                commit('DELETE_NEWS', id)
            })
              .catch(error => {
              console.log(error);
            })
            
          },  
    },
    modules: {},
    getters: {
        getAllNews: state => state.allNews, 
    },
    
	created(){
		this.fetchNews();
	},
	
    })