import { inject } from 'vue'

export const useDelivery = () => {

   const delivery = inject('delivery')

   return delivery
}
