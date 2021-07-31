<template>
    <!-- <button @click="addMessage">add</button> -->
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

        function addMessage() {
            messages.value.push({
                tags: {
                    'display-name': 'DropMania',
                    color: '#00ff00',
                    'user-id': '91642630',
                    badges: {
                        premium: 1,
                        broadcaster: 1,
                    },
                },
                channel: '',
                content:
                    'Lorem ipsum dolor sit amet Kappa consectetur adipisicing elit. Beatae inventore accusantium suscipit, dolor ipsam quasi rem nesciunt minima facere corporis hic iure omnis, dignissimos recusandae ad, rerum facilis illo saepe alias distinctio odio molestias. Facilis, incidunt quo. Quidem totam nostrum fugit impedit, laudantium blanditiis molestias voluptatum provident, dolorem autem at.',
            })
        }
        return {
            messages,
            addMessage,
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
    overflow: hidden;
}
.messages {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: flex-start;
}
</style>
