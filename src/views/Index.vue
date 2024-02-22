<template>
   <div :class="$style.container">
      <div :class="$style.content">
         <div :class="$style.page">
            <div :class="$style.userWrapper">
               <span :class="$style.name">Anton</span>
               <div :class="$style.pointsWrapper">
                  <span :class="$style.points">{{ state.currentPoints }}</span>
                  <div :class="$style.coinImg">
                     <img src="/coin.webp" alt="coin" />
                  </div>
               </div>
            </div>
            <div :class="$style.mainWrapper">
               <div :class="$style.closeImg">
                  <img src="/close.webp" alt="close" />
               </div>
               <div :class="$style.questionWrapper">
                  <div :class="$style.questionTextsWrapper">
                     <span :class="$style.questionWrapperText"
                        >Choose the right answer</span
                     >
                     <span :class="$style.question"
                        >Which shape shows thirds?</span
                     >
                  </div>
                  <div :class="$style.taskImg">
                     <img src="/task.webp" alt="task" />
                  </div>
               </div>
               <div :class="$style.bulbImage" @click="state.isOpenModal = true">
                  <img src="/bulb.webp" alt="bulb" />
               </div>
            </div>
         </div>
         <div :class="$style.actions">
            <RadioButtonAtom
               v-for="answerOption of ANSWER_OPTIONS"
               :key="answerOption.id"
               :value="answerOption.option"
               :is-checked="state.currentAnswer === answerOption.option"
               @change="state.currentAnswer = $event"
               ><span>{{ answerOption.option }}</span></RadioButtonAtom
            >
            <ButtonAtom
               :disabled="!state.currentAnswer"
               @click="handleCheckRightAnswer"
            >
               <span :class="$style.checkButton">Check</span>
            </ButtonAtom>
         </div>
         <ModalAtom
            :is-open="state.isOpenModal"
            @close="state.isOpenModal = !state.isOpenModal"
         />
      </div>
   </div>
</template>
<script setup>
import { reactive } from 'vue';

import answer from '@/assets/answer.json';

import ButtonAtom from '@/components/atoms/Button.vue';
import RadioButtonAtom from '@/components/atoms/RadioButton.vue';
import ModalAtom from '@/components/atoms/Modal.vue';

import { ANSWER_OPTIONS } from '@/constants/answerOptions';

const state = reactive({
   currentAnswer: '',
   currentPoints: 0,
   isOpenModal: false,
});

const handleCheckRightAnswer = () => {
   if (!state.currentAnswer) return;

   if (state.currentAnswer !== answer.rightAnswer) {
      alert(`Sorry, answer: ${state.currentAnswer} incorrect, try again.`);
      state.currentAnswer = '';
      return;
   }

   alert(
      `Congratulations, your answer is correct, You have been awarded 1000 points`
   );
   state.currentPoints += 1000;
   state.currentAnswer = '';
};
</script>
<style lang="scss" module>
.container {
   min-height: 100vh;
   height: 100%;
   display: flex;
   flex-direction: column;
   background-color: rgb(242, 242, 242);

   .content {
      flex: 1 1 auto;

      .page {
         @include container;
         display: flex;
         flex-direction: column;
         gap: 3rem;
         margin-top: 2rem;

         .closeImg,
         .bulbImage {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            background-color: $light-gray;
            cursor: pointer;
         }

         .userWrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;

            .pointsWrapper {
               display: flex;
               gap: 0.5rem;
               align-items: center;
            }
         }

         .mainWrapper {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            justify-content: space-between;

            .questionWrapper {
               display: flex;
               flex-direction: column;
               align-items: center;
               gap: 7rem;

               .questionTextsWrapper {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 1.5rem;
                  text-align: center;
                  .questionWrapperText {
                     @include main($isBold: false);
                     color: $black;
                  }

                  .question {
                     @include H3;
                     color: $black;
                  }
               }

               .taskImg {
                  max-width: 45rem;
                  width: 100%;
                  height: 100%;
                  max-height: 10rem;

                  img {
                     width: 100%;
                     height: 100%;
                     object-fit: cover;
                  }
               }
            }
         }
      }

      .actions {
         position: fixed;
         bottom: 0;
         left: 0;
         display: flex;
         align-items: center;
         gap: 2rem;
         justify-content: space-between;
         padding: 0 1rem 1rem;
         width: 100%;
         .checkButton {
            @include main;
            color: $black;
         }
      }
   }
}
</style>
