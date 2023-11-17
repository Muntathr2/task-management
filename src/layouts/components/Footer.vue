<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      {{ $t('Copy.made_with') }}
      <VIcon
        icon="tabler-heart"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      {{ $t('Copy.by') }} <a
        href="https://pixinvent.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Aswar</a>
    </span>
  </div>
</template>
