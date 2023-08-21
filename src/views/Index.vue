<template>
   <div :class="$style.container">
      <InputSearch
         v-model="search"
         placeholder="Filter by author"
         :disabled="isLoading"
         :class="$style.inputSearch"
         @search="handleSearch"
      ></InputSearch>

      <div v-if="!isLoading" :class="$style.cardsWrapper">
         <div v-if="postsWithUserName.length" :class="$style.cards">
            <PostCard
               v-for="post of postsWithUserName"
               :key="post.id"
               :title="post.title"
               :description="post.body"
               :authorName="post.authorName"
            />
         </div>
         <span v-else :class="$style.infoMessage"
            >К сожалению, ничего не найдено</span
         >
      </div>
      <span v-else :class="$style.loading">Загрузка...</span>
   </div>
</template>
<script>
import axios from 'axios';

import PostCard from '@/components/molecules/PostCard.vue';
import InputSearch from '@/components/atoms/InputSearch.vue';

export default {
   components: {
      PostCard,
      InputSearch,
   },
   data() {
      return {
         users: [],
         posts: [],
         search: '',
         isLoading: false,
      };
   },
   computed: {
      postsWithUserName() {
         const arrayWithPostsAndUserName = [];

         this.posts?.forEach((post) => {
            this.users?.forEach((user) => {
               if (post.userId === user.id) {
                  arrayWithPostsAndUserName.push({
                     ...post,
                     authorName: user.name,
                  });
               }
            });
         });

         return arrayWithPostsAndUserName;
      },
   },
   watch: {
      async search() {
         if (!this.search) {
            await this.getUsers();
         }
      },
   },
   async created() {
      await this.getPosts();
      await this.getUsers();
   },

   methods: {
      async getPosts() {
         try {
            this.isLoading = true;
            const response = await axios(
               'https://jsonplaceholder.typicode.com/posts'
            );

            this.isLoading = false;

            response.status === 200
               ? (this.posts = response.data)
               : new Error(`API error, status: ${response.status}`);
         } catch (e) {
            this.isLoading = false;
            throw new Error('Network error, try again later');
         }
      },
      async getUsers() {
         try {
            this.isLoading = true;
            const response = await axios(
               'https://jsonplaceholder.typicode.com/users'
            );
            this.isLoading = false;

            response.status === 200
               ? (this.users = response.data)
               : new Error(`API error, status: ${response.status}`);
         } catch (e) {
            this.isLoading = false;
            throw new Error('Network error, try again later');
         }
      },
      async getUserById(id) {
         try {
            this.isLoading = true;
            const response = await axios(
               `https://jsonplaceholder.typicode.com/users?id=${id}`
            );

            this.isLoading = false;

            response.status === 200
               ? (this.users = response.data)
               : new Error(`API error, status: ${response.status}`);
         } catch (e) {
            this.isLoading = false;
            throw new Error('Network error, try again later');
         }
      },
      async handleSearch() {
         if (this.search) {
            const currentUserId = this.users?.find((user) =>
               user.name.toLowerCase().includes(this.search.toLowerCase())
            )?.id;

            await this.getUserById(currentUserId);
         }
      },
   },
};
</script>
<style lang="scss" module>
.container {
   @include container;
   margin-top: 5rem;

   .inputSearch {
      justify-content: center;
      margin-bottom: 3rem;
   }

   .cardsWrapper {
      .cards {
         display: grid;
         grid-template-columns: repeat(auto-fill, minmax(14.375rem, 1fr));
         gap: 1.5rem;
      }

      .infoMessage {
         @include H2;
         display: flex;
         justify-content: center;
         align-items: center;
         width: 100%;
         white-space: nowrap;
         margin-top: 18rem;
         color: $black;
      }
   }

   .loading {
      @include H1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 18rem;
      color: $black;
   }

   @include custom(630) {
      .cardsWrapper {
         .infoMessage {
            text-align: center;
            white-space: normal;
         }
      }
   }
}
</style>
