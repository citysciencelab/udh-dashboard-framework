<template>
    
</template>

<script>
    export default {
        name: "abstract-chart",

        mounted: function () {
            // This double checks the setting of all $props variables
            // If the component gets initiated by

            //TODO: vielleicht in der componente vue-masterportal attrs gegen props austauschen und das callen ausprobieren!!!
            for (let obj of Object.keys(this.$props)) {
                if (this.$props[obj] === null) {
                    // console.log("Property " + this.$props[obj] + " is NOT set.");
                    if (this.$attrs[obj] !== null) {
                        // console.log("Found property " + this.$props[obj] + " in attrs instead.");
                        this.$props[obj] = this.$attrs[obj];
                    }
                } else {
                    // console.log("Property " + this.$props[obj] + " is set.")
                }
            }
        }
    }
</script>

<style scoped>

</style>