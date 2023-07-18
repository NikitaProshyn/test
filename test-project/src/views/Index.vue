<template>
   <div :class="$style.container">
      <span :class="$style.info"
         >Для редактирования нажмите на карточку и в поле ввода отредактируйте
         значение</span
      >
      <div :class="$style.cards">
         <div
            v-for="(card, index) in cards"
            :key="index"
            :class="[$style.card, { [$style.chosenCard]: card.isOpen }]"
            @click="handleOpenCard(index)"
         >
            <span :class="$style.name">Name: {{ card.name }}</span>
            <span :class="$style.value">Value: {{ card.value }}</span>
            <form v-if="card.isOpen" :class="$style.form">
               <input
                  v-model="card.value"
                  type="text"
                  placeholder="Введите value"
                  :class="$style.input"
                  @click.stop
               />
            </form>
         </div>
      </div>
   </div>
</template>
<script>
import cardsJson from '@/assets/cards.json';

export default {
   data() {
      return {
         cards: [],
      };
   },
   created() {
      this.cards = cardsJson.map((card) => ({
         ...card,
         isOpen: false,
      }));
   },
   methods: {
      handleOpenCard(cardIndex) {
         this.cards = this.cards.map((card, index) => {
            return cardIndex === index && !card.isOpen
               ? { ...card, isOpen: true }
               : { ...card, isOpen: false };
         });
      },
   },
};
</script>
<style lang="scss" module>
.container {
   @include container;
   display: flex;
   flex-direction: column;
   gap: 3rem;
   padding-top: 3rem;

   .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .input {
         padding: 0.25rem;
         border-radius: 0.5rem;
         border: none;
      }
   }

   .info {
      @include info-text;
   }

   .cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      .card {
         display: flex;
         flex-direction: column;
         gap: 1rem;
         min-height: 7rem;
         padding: 3rem;
         border: 0.063rem solid $black;
         border-radius: 1rem;
         background-color: $white-rgba;
         cursor: pointer;
         transition: 0.3s all ease-in;

         &:hover {
            transform: scale(1.05);
         }

         .name {
            @include text-default;
         }

         .value {
            @include text-default;
         }
      }

      .chosenCard {
         background-color: $gold;

         .name {
            color: $white;
         }

         .value {
            color: $white;
         }
      }
   }
}
</style>
