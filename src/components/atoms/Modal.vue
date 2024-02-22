<template>
   <div :class="$style.container">
      <transition
         :enter-from-class="$style.enter"
         :leave-to-class="$style.leaveTo"
         :enter-active-class="$style.enterActive"
         :leave-active-class="$style.leaveActive"
      >
         <div
            v-if="props.isOpen"
            :class="$style.background"
            @click="$emit('close')"
         >
            <div :class="$style.modal" @click.stop>
               <div :class="$style.header">
                  <button @click="$emit('close')">
                     <img
                        src="/close.webp"
                        alt="close_btn"
                        :class="$style.icon"
                     />
                  </button>
               </div>
               <slot :class="$style.content"></slot>
            </div>
         </div>
      </transition>
   </div>
</template>
<script setup>
import { watch } from 'vue';

const props = defineProps({
   isOpen: {
      type: Boolean,
      default: false,
   },
});

const handleChangeOpen = (isModalOpen) => {
   document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
};

const emit = defineEmits(['close']);

watch(
   () => props.isOpen,
   (value) => {
      handleChangeOpen(value);
   }
);
</script>
<style lang="scss" module>
.container {
   position: fixed;
   top: 0;
   left: 0;
   z-index: $z-index-modal;
   .background {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      padding: 0.75rem;
      overflow-y: auto;
      .modal {
         width: 100%;
         max-width: 41.25rem;
         height: 90vh;
         padding: 2rem 1.5rem 1.5rem;
         margin: 0 auto;
         border-radius: 1.5rem;
         background-color: $white;
         .header {
            display: flex;
            justify-content: flex-end;

            .icon {
               display: flex;
               justify-content: center;
               align-items: center;
               cursor: pointer;
            }
         }
         .content {
            max-height: 33.5rem;
            overflow-y: auto;
         }
      }
   }
   .enter,
   .leaveTo {
      opacity: 0;
      .modal {
         opacity: 0;
      }
   }
   .enterActive,
   .leaveActive {
      transition: opacity 0.5s ease;
      .modal {
         transition: opacity 0.5s ease;
      }
   }
}
</style>
