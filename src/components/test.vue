<template>
    <div v-for="n in 10">div--{{msg}}</div>
</template>

<script>
    "use strict";
    export default {
        data () {
            return {
                msg: 'Hello World!'
            }
        }
    }
</script>

<style lang="sass">
    html{
        background: #eee;
    }
</style>