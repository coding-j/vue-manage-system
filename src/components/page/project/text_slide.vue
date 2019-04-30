<template>
    <transition
            :css="false"
            name="text-slide"
            mode="out-in"
            @enter="enter"
            @leave="leave"
    >
        <slot></slot>
    </transition>
</template>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>-->
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.min.js"></script>-->
<!--<script type="text/javascript" src="js/anime.min.js"></script>-->
<script>
    // import anime from '../../../assets/css/static/anime.min'
    import anime from 'animejs'
    export default {
        name: "text_slide",
        data: () => ({
        }),
        methods: {
            enter (el, onComplete) {
                let timeline = anime.timeline({ complete: onComplete })
                timeline.add({
                    targets: [
                        '.crowd-funding__header__description h1',
                        '.crowd-funding__header__description p',
                        '.hashtags',
                        '.icon',
                        'h4',
                        '.content',
                        'li'
                    ],
                    translateY: [250, 0],
                    easing: 'easeOutSine',
                    duration: 500,
                    opacity: [0, 1],
                    delay: (el, i, l) => i * 50
                })
            },

            leave (el, onComplete) {
                let timeline = anime.timeline({
                    complete: onComplete
                })

                timeline.add({
                    targets: [
                        '.crowd-funding__header__description h1',
                        '.crowd-funding__header__description p',
                        '.hashtags',
                        '.icon',
                        'h4',
                        '.content',
                        'li'
                    ],
                    translateY: [0, -250],
                    easing: 'easeInExpo',
                    duration: 500,
                    opacity: [1, 0],
                    delay: (el, i, l) => i * 50
                })
            }
        }
    }
</script>

<style scoped>

</style>
