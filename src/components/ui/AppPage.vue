<template>
  <div class="breadcrumbs" v-if="backRoute">
    <router-link :to="backRoute" class="text-white">{{ backRouteText }}</router-link>
  </div>
  <div :class="['card',{'center':center}, className]">

    <h1 class="card-title" v-if=$slots.header>
      {{title}}
      <slot name="header" />
    </h1>

    <slot></slot>

  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    backRoute: {
      type: Object,
      default: null
    },
    backRouteText: {
      type: String,
      default: ''
    },
    center: {
      type: Boolean,
      default: false
    },
    header: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    document.title = `${props.title} | Магазин`
  }
}
</script>
