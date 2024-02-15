<template>
    <div class="statuses">
        <div class="status">
            <p>Website</p>
            <div class="color-0"><i class="fa-solid fa-circle-minus"></i></div>
        </div>
        <div class="status">
            <p>Database</p>
            <div class="color-1"><i class="fa-solid fa-circle-check"></i></div>
        </div>
        <div class="status">
            <p>Slides</p>
            <div class="color-2"><i class="fa-solid fa-circle-exclamation"></i></div>
        </div>
        <div class="status">
            <p>Middleware</p>
            <div class="color-3"><i class="fa-solid fa-circle-exclamation"></i></div>
        </div>
        <div class="status">
            <p>Overall</p>
            <div class="color"><i class="fa-solid fa-circle-exclamation"></i></div>
        </div>
    </div>
</template>

<style scoped>
    .statuses {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        margin: auto;
    }

    .status {
        display: flex;
        flex-flow: row nowrap;
        width: 80vw;
        /* justify-content: space-evenly; */
        font-size: 2rem;
    }

    .fa-circle-minus {
        color: rgb(255, 200, 0);
    }

    .fa-circle-check {
        color: greenyellow;
    }

    .fa-circle-exclamation {
        color: red;
    }
</style>