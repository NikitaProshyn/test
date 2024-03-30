<template>
   <div :class="$style.container">
      <template
         v-for="(section, index) of state.choosingSections"
         :key="section.id"
      >
         <el-select
            :model-value="state.choosingSections[index + 1]"
            placeholder="Выберите категорию"
            value-key="id"
            @change="handleChangeDefaultParent($event, index)"
         >
            <el-option
               v-for="item in section.childrens"
               :label="item.name"
               :value="item"
            >
            </el-option>
         </el-select>
      </template>
      <el-form :model="form" :class="$style.form">
         <template
            v-for="modification of state.modifications"
            :key="modification.id"
         >
            <h1>{{ modification.name }}</h1>
            <template v-for="item of modification.items" :key="item.id">
               <el-select
                  v-if="item.form_type === MODIFICATION_TYPES.SELECT"
                  v-model="item.default"
                  :placeholder="item.name"
                  :value-key="item.id"
               >
                  <el-option
                     v-for="guideValue of item.guide_values"
                     :label="guideValue.value"
                     :value="guideValue.value"
                  >
                  </el-option>
               </el-select>
               <el-form-item
                  v-if="
                     item.form_type === MODIFICATION_TYPES.NUMBER ||
                     modification.form_type === MODIFICATION_TYPES.INTEGER
                  "
                  :label="item.name"
               >
                  <el-input
                     v-model="item.default"
                     placeholder="Введите значение"
                  />
               </el-form-item>
               <el-form-item
                  v-if="item.form_type === MODIFICATION_TYPES.TEXT"
                  :label="item.name"
               >
                  <el-input
                     v-model="item.default"
                     placeholder="Введите значение"
                  />
               </el-form-item>
               <div
                  v-if="item.form_type === MODIFICATION_TYPES.CHECKBOX"
                  :class="$style.checkbox"
               >
                  <h2 :class="$style.checkboxTitle">{{ item.name }}</h2>
                  <template
                     v-if="item.guide_values.length"
                     v-for="checkbox of item.guide_values"
                     :key="checkbox.id"
                  >
                     <el-form-item :label="checkbox.value">
                        <el-checkbox />
                     </el-form-item>
                  </template>
               </div>
               <div
                  v-if="item.form_type === MODIFICATION_TYPES.RADIO"
                  :class="$style.checkbox"
               >
                  <h2 :class="$style.checkboxTitle">{{ item.name }}</h2>
                  <template
                     v-if="item.guide_values.length"
                     v-for="radio of item.guide_values"
                     :key="radio.id"
                  >
                     <el-radio-group v-model="item.default">
                        <el-radio :value="radio.value">{{
                           radio.value
                        }}</el-radio>
                     </el-radio-group>
                  </template>
               </div>
            </template>
         </template>
      </el-form>
   </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';

import delivery from '@/delivery';

import { MODIFICATION_TYPES } from '@/constants/common';

const state = reactive({
   modifications: [],
   sectionId: null,
   choosingSections: [],
   form: {},
});

const getDefaultSections = async () => {
   const { value, error } =
      await delivery.CoreService.SectionActions.getListByParentId(0);

   if (error) return;

   state.choosingSections.push({ id: 0, childrens: value });
};

const getSections = async (parentId) => {
   const { value, error } =
      await delivery.CoreService.SectionActions.getListByParentId(parentId);

   if (error) return;

   return value;
};

const handleChangeDefaultParent = async (event, index) => {
   state.sectionId = event.id;

   if (index !== state.choosingSections.length - 1) {
      state.choosingSections.splice(
         index + 1,
         state.choosingSections.length - 1
      );
   }

   const value = await getSections(event.id);

   event.childrens = value;

   state.choosingSections.push(event);

   await getModifications(event.id);
};

const getModifications = async (sectionId) => {
   const { value, error } =
      await delivery.CoreService.ModificationActions.getListBySectionId(
         sectionId ?? 0
      );

   if (error) return;

   state.modifications = value;
};

onMounted(async () => {
   await getDefaultSections();
});
</script>
<style lang="scss" module>
.container {
   min-height: 100vh;
   height: 100%;
   display: flex;
   flex-direction: column;
   background-color: rgb(242, 242, 242);

   .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;

      .checkbox {
         display: flex;
         flex-direction: column;

         .checkboxTitle {
            margin-bottom: 1rem;
         }
      }
   }
}
</style>
