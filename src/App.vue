<template>
    <div class="messages">
        <Message
            v-for="message in messages"
            :key="message"
            :message="message"
        />
    </div>
</template>

<script>
import tmi from 'tmi.js'
import { ref } from 'vue'
import Message from './components/Message.vue'
export default {
    components: {
        Message,
    },
    setup() {
        let messages = ref([])

        const client = new tmi.Client({
            channels: ['DropManiaOfficial'],
        })

        client.connect()

        client.on('message', (channel, tags, message, self) => {
            console.log({ tags, channel, content: message })
            messages.value.push({
                tags,
                channel,
                content: message,
                timestamp: new Date().getTime(),
            })
        })

        return {
            messages,
        }
    },
}
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
html,
body,
#app {
    width: 100%;
    height: 100%;
}
.messages {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}
</style>
