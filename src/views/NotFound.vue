<template>
    <div class="big">
        <div :class="['glitch', val === '404' ? 'tb' : 'ts']">{{ val }}</div>
    </div>
</template>

<script lang="ts">

    export default {
        name: 'NotFound',
        data() {
            return {
                val: '404',
                callback: true
            }
        },
        mounted() {
            this.doThingy()
        },
        beforeUnmount() {
            this.callback = false
        },
        methods: {
            pass(): undefined {
            },
            async doThingy() {
                this.val = '[NOT FOUND]'
                await new Promise(r => setTimeout(r, 150));
                this.val = '404'
                if (this.callback) {
                    setTimeout(this.doThingy, Math.random() * 5000)
                }
            }
        }
    }
</script>

<style scoped>
    div.big {
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        place-content: center;
    }

    div.tb {
        font-size: 15rem;
    }
    div.ts {
        margin-top: 5vh;
        font-size: 9rem;
    }
</style>