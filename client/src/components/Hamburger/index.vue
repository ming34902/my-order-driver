<template>
  <div class="hamburger" @click="toggleClick">
    <div class="hamburger-img" :class="{'is-active':isActive}">
      <img src="~assets/image/right.png" @click.stop="toggleClick"  :class="{'is-active':isActive}" alt="close" style="cursor:pointer">
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
  .hamburger-img{
    cursor: pointer;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hamburger-img.is-active {
    transform: rotate(-180deg);
  }

.hamburger {
    cursor: pointer;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
    background-color: #3f4d64;
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hamburger.is-active {
    width: 50px!important;
    transform: rotate(90deg);
}
</style>
