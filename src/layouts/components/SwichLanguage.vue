<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VList, VListItem, VMenu } from 'vuetify/lib/components/index.mjs'
import { setI18nLanguage, SUPPORT_LOCALES as supportLocales } from '../../i18n'

const { locale } = useI18n({ useScope: 'global' })

watch(locale, val => {
  if(val.length <= 1){
    setI18nLanguage(val[0])
    console.log(val[0])
    window.location.reload()
  }
})
</script>

<template>
  <IconBtn color="rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity))">
    <VIcon
      :icon="tabler-language"
      :prepend-icon="tabler-language"
      size="26"
    >
      tabler-language
    </VIcon>
    <VMenu
      activator="parent"
      offset="14px"
    >
      <VList v-model:selected="locale">
        <VListItem
          v-for="item in supportLocales"
          :key="item.name"
          :value="item.name"
          :prepend-icon="item.icon"
          color="primary"
          class="text-capitalize"
        >
          {{ item.title }}
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
