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
            <el-input
               v-if="modification.form_type === MODIFICATION_TYPES.TEXT"
               :placeholder="modification.name"
            />
            <el-select
               v-if="modification.form_type === MODIFICATION_TYPES.SELECT"
               :placeholder="modification.name"
            >
               <el-option
                  v-if="modification.guide_values"
                  v-for="item of modification.guide_values"
                  :label="item.value"
                  :value="item"
               >
               </el-option>
            </el-select>
            <el-input-number
               v-if="
                  modification.form_type === MODIFICATION_TYPES.NUMBER ||
                  modification.form_type === MODIFICATION_TYPES.INTEGER
               "
               :placeholder="modification.name"
               :class="$style.inputNumber"
            />
            <el-form-item
               v-if="modification.form_type === MODIFICATION_TYPES.CHECKBOX"
               v-for="checkbox of modification.guide_values.length
                  ? modification.guide_values.length
                  : 1"
               :key="checkbox.id ?? modification.id"
               :label="modification.name"
            >
               <el-checkbox />
            </el-form-item>
            <el-form-item
               v-if="modification.form_type === MODIFICATION_TYPES.RADIO"
               :label="modification.name"
            >
               <el-radio />
            </el-form-item>
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

   state.modifications = value.flatMap((modification) => modification.items);
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

      .inputNumber {
         width: 30rem;
      }
   }
}
</style>
