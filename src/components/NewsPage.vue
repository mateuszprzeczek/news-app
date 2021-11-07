<template>
  <div class="layout">
    <div v-for="Item in displayedNews" v-bind:key="Item.id" class="news">
      <h2>{{ Item.title }}</h2>
      <p>
        {{ ShowLess(Item.body)
        }}<span v-on:click="ShowMore(Item.id)" class="show-more"
          >...Show More</span
        ><span v-bind:id="Item.id" class="more">{{ Item.body }}</span>
      </p>
      <div class="author">{{ Item.name }}</div>
      <button class="deleteBtn" @click="DeleteNews(Item.id)">Delete?</button>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-if="page != 1"
            @click="page--"
          >
            Previous
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            v-bind:key="pageNumber"
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page-item">
          <button
            type="button"
            @click="page++"
            v-if="page < pages.length"
            class="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  data: function () {
    return {
      page: 1,
      perPage: 10,
      pages: [],
    };
  },
  computed: {
    ...mapGetters({
      allNews: "getAllNews",
    }),
    limitedList() {
      return this.allNews;
    },
    displayedNews() {
      return this.paginate(this.allNews);
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.allNews.length / this.perPage);
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i);
      }
    },
    paginate(news) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return news.slice(from, to);
    },
    ShowMore(idx) {
      const el = document.getElementById(idx);
      el.style.display = "inline";
      el.previousElementSibling.style.display = "none";
    },
    ShowLess(text) {
      const less = text.slice(0, 20);
      return less;
    },
    DeleteNews(idx) {
      this.$store.dispatch("deleteNews", idx);
    },
  },
  props: {
    msg: String,
  },
  watch: {
    allNews() {
      this.setPages();
    },
  },
  created() {
    this.$store.dispatch("fetchNews").then(() => {
      console.log("This would be printed...");
    });
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.layout {
  margin: 0;
}

h2 {
  color: #fff;
  margin-bottom: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  color: #fff;
  margin-bottom: 1rem;
}
.show-more {
  color: #35495e;
}
.show-more:hover {
  cursor: pointer;
}
.more {
  display: none;
}
.author {
  text-align: end;
}
.news {
  width: 30rem;
  max-width: 90%;
  margin: 3rem auto;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #42b983;
}
.deleteBtn {
  width: 100px;
  height: 30px;
  background-color: #35495e;
  color: #fff;
  opacity: 0.6;
  transition: 0.3s;
  font-size: 20px;
  font-weight: 500;
}
.deleteBtn:hover {
  cursor: pointer;
  opacity: 1;
  color: #fff;
}
button.page-link {
  display: inline-block;
  background-color: #42b983;
  border: none;
  color: white;
  padding: 8px 12px;
  text-align: center;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  font-size: 20px;
  font-weight: 500;
}
button.page-link:hover {
  cursor: pointer;
  opacity: 1;
  color: #fff;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
</style>
