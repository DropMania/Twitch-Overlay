<template>
    <div
        class="message"
        :style="{
            color: props.message.tags.color,
        }"
    >
        <div class="message-username">
            <svg
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="message-img"
            >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle></svg
            >{{ props.message.tags['display-name'] }}
        </div>
        <div class="message-content">
            {{ props.message.content }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: Object,
    },
    setup(props) {
        return {
            props,
        }
    },
}
</script>
<style>
.message {
    background: black;
    opacity: 0.7;
    padding: 20px;
    width: 100%;
    border: solid black 5px;
    border-radius: 20px;
    color: white;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
}
.message-img {
    border-radius: 50%;
    border: solid black;
    padding: 10px;
    color: white;
    fill: white;
    stroke: white;
    stroke-width: 2px;
    height: 50px;
    width: 50px;
}
.message-content {
    color: white;
}
</style>
