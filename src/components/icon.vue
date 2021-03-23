<template>
    <i :name="name" class="icon" />
</template>

<script>
export default {
    props:['name']
}
</script>

<style lang="scss">
@font-face{
    font-family:'v-icon';
    src:
        url('../iconfont/iconfont.ttf') format('truetype'),
        url('../iconfont/iconfont.woff') format('woff'),
        url('../iconfont/iconfont.woff2') format('woff2');
    font-weight:normal;
    font-style:normal;
}
.icon{
    font-family:'v-icon';
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
