<template>
    <div
        class="message"
        :style="{
            color: props.message.tags.color,
        }"
    >
        <div class="message-username">
            <img class="message-img" :src="profile_img" />
            <div class="display-name">
                {{ props.message.tags['display-name'] }}
            </div>
            <div class="badges">
                <img
                    v-for="badge in userBadges"
                    :key="badge[0]"
                    :src="badge[1]"
                />
            </div>
        </div>
        <div class="message-content" v-html="content"></div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
import { escape } from 'html-escaper'
export default {
    props: {
        message: Object,
    },
    setup(props) {
        let profile_img = ref(require('../assets/default_profile.png'))
        let content = ref('')
        onMounted(async () => {
            content.value = escape(props.message.content)
            if (props.message.tags.emotes) {
                let stringReplacements = []
                for (let emote in props.message.tags.emotes) {
                    let replacePart = props.message.tags.emotes[emote]

                    let [start, end] = replacePart[0].split('-')
                    let emoteString = content.value.substring(+start, +end + 1)
                    stringReplacements.push({
                        stringToReplace: emoteString,
                        replacement: `<span>
                                        <img
                                        class="emote"
                                        src="https://static-cdn.jtvnw.net/emoticons/v1/${emote}/3.0"
                                        />
                                    </span>`,
                    })
                }
                content.value = stringReplacements.reduce(
                    (acc, { stringToReplace, replacement }) => {
                        return acc.split(stringToReplace).join(replacement)
                    },
                    content.value
                )
            }

            let imgURLResponse = await fetch(
                `http://192.168.2.112:5000/profile_img?id=${props.message.tags['user-id']}`
            )
            let imgURL = await imgURLResponse.json()
            profile_img.value = imgURL
        })

        let badgeMapping = [
            [
                'premium',
                'https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/1',
            ],
            [
                'broadcaster',
                'https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/1',
            ],
        ]
        let userBadges = badgeMapping.filter((b) => {
            if (props.message.tags.badges) {
                return Object.keys(props.message.tags.badges).includes(b[0])
            }
        })

        return {
            props,
            userBadges,
            profile_img,
            content,
        }
    },
}
</script>
<style>
@keyframes flyin {
    0% {
        margin-right: -100%;
    }
    100% {
        margin-right: 0;
    }
}
.message {
    background: rgba(17, 17, 17, 0.7);
    padding: 20px;
    width: 100%;
    border: solid black 5px;
    border-radius: 20px;
    color: white;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    animation: flyin linear 0.3s;
    margin-bottom: 10px;
}
.message-img {
    border-radius: 50%;
    border: solid black;
    opacity: 1;
    height: 10vh;
    width: 10vh;
    margin-right: 1vh;
}
.message-content {
    color: white;
    font-family: 'Roboto', sans-serif;
}
.message-username {
    display: flex;
    align-items: center;
    margin-bottom: 1vh;
}
.display-name {
    font-size: 3vh;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}
.badges {
    display: flex;
    align-items: center;
    gap: 1vh;
    margin-left: 1vh;
}
.badges img {
    width: 2.5vh;
}
.emote {
    height: 2vh;
    vertical-align: middle;
}
</style>
