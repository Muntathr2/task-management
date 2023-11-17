<script setup>
import { VIcon, VList, VListItem, VMenu } from 'vuetify/lib/components/index.mjs'
import { SUPPORT_LOCALES as supportLocales } from '../../i18n'

const getLang = localStorage.getItem('lang')

const changeLang = lang => {
  if(getLang !== lang){
    localStorage.setItem('lang', lang)
    window.location.reload()
  }
}
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
      <VList>
        <VListItem
          v-for="item in supportLocales"
          :key="item.name"
          :value="item.name"
          :prepend-icon="item.icon"
          color="primary"
          :class="getLang === item.name ? 'text-capitalize v-list-item--active' : 'text-capitalize' "
          @click="changeLang(item.name)"
        >
          {{ item.title }}
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
