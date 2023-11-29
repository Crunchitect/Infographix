<template>
    <div>
        <h1>Sign In</h1>
        <form @submit.prevent="signup">
            <input type="text" placeholder="Username" pattern="[A-Za-z0-9_\-]{3,}">
            <div class="padding"></div>
            <input type="password" placeholder="Password" pattern="[A-Za-z0-9_\-]{3,}">
            <input type="submit" value="Submit!">
        </form>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        signup() {

        }
    }
}
</script>

<style scoped>
    div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    h1, input {
        text-align: center;
        font-size: 5rem;
    }

    .padding {
        padding: 10px;
    }

    input {
        width: 80vw;
    }
</style>