<template>
    <div id="app" class="wrapper" v-cloak v-bind:class="{'is-previous': isPreviousSlide, 'first-load': isFirstLoad}">
        <div class="slide-wrapper"
             v-for="(slide, index) in slides"
             v-bind:key="index"
             v-bind:class="{ active: index === currentSlide }"
             v-bind:style="{ 'z-index': (slides.length - index), 'background-image': 'url(' + imgUrl+slide.firstPicture + ')' }">
            <div class="slide-inner" @click="projectShow(slide.projectId)">
                <div class="slide-bg-text">
                    <p>{{ slide.projectName }}</p>
                    <!--<p>{{ slide.headlineSecondLine }}</p>-->
                </div>
                <!--<div class="slide-rect-filter">-->
                <!--<div class="slide-rect" v-bind:style="{'border-image-source': 'url(' + slide.rectImg + ')'}"></div>-->
                <!--</div>-->
                <div class="slide-content">
                    <h1 class="slide-content-text">
                        <!--<p>{{ slide.headlineFirstLine }}</p>-->
                        <p>项目简介：{{ slide.projectDetail | ellipsis }}</p>
                    </h1>
                    <!--<a class="slide-content-cta">Call To Action</a>-->
                </div>
                <!--<h2 class="slide-side-text">-->
                <!--<span>{{ slide.sublineFirstLine }} / </span>-->
                <!--<span>{{ slide.sublineSecondLine }}</span>-->
                <!--</h2>-->
            </div>
        </div>
        <div class="controls-container">
            <button class="controls-button"
                    v-for="(slide, index) in slides"
                    v-bind:key="index"
                    v-bind:class="{ active: index === currentSlide }"
                    v-on:click="updateSlide(index)">{{ slide.projectName }}</button>
        </div>
        <div class="pagination-container">
            <span class="pagination-item"
                  v-for="(slide, index) in slides"
                  v-bind:key="index"
                  v-bind:class="{ active: index === currentSlide }"
                  v-on:click="updateSlide(index)"></span>
        </div>
    </div>
</template>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js"></script>-->
<script>
    import axios from 'axios'
    export default {
        name: 'test',
        filters: {
            ellipsis:function (value) {
                if (!value) return ''
                if (value.length > 60) {
                    return value.slice(0,60) + '...'
                }
                return value
            }
        },
        data() {
            return {
                imgUrl:'http://localhost:8088/show?pictureName=',
                currentSlide: 0,
                isPreviousSlide: false,
                isFirstLoad: true,
                slides: [
                    // {
                    //     projectName: '实训项目展示平台',
                    //     projectDetail: "无论是小学、中学还是大学，学生的作品展示已经是学校教学必不可少的一个环节。目前，学校的作品展示方式主要分为两种：一种是现实的，即必须有实物放在展览台上或者现场操作展示；另一种是虚拟的，即通过视频、照片或者网络展示。第一种实物展示最大的特点就是生动直观，观赏者可以近距离从各个角度观赏作品，但是这种展示方法也有很多缺点，首先一点就是无法长时间保存，无法成为学校长期使用的教学资源；其次，并不是所有的作品都是以实物的形式呈现，尤其是在软件工程领域；最后，实物的展示只能展示结果，忽视了过程，而在教学过程中更注重的是过程的学习。总结以上几点，我校实训项目的展示平台的设计与实现就尤为的重要，目前，我校学生的课程设计、学科竞赛和创新作品在老师评定完成绩或是比赛评奖结束后就失去了价值，其实，这些作品还可以供其他同学参考交流甚至完善，我们希望学校可以通过我们设计实训项目展示平台通过网页的形式，保存和展示实训项目，可以方便的看到学生的实训成果",
                    //     // sublineFirstLine: "Nihil sub sole",
                    //     // sublineSecondLine: "novum",
                    //     // bgImg: "https://i.postimg.cc/C5yvGSkm/slide0.jpg",
                    //     bgImg: require('../../../assets/img/TIM图片20190430134150.jpg'),
                    //     // rectImg: "https://i.postimg.cc/vTW0XkvM/slide-rect0.jpg"
                    // },
                    // {
                    //     projectName: "Nulla",
                    //     projectDetail: "Auctor",
                    //     // sublineFirstLine: "Il n'y a rien de neuf sous",
                    //     // sublineSecondLine: "le soleil",
                    //     bgImg: "https://i.postimg.cc/Qx34VNXM/slide1.jpg",
                    //     // rectImg: "https://i.postimg.cc/ryWZ8R2b/slide-rect1.jpg"
                    // },
                    // {
                    //     projectName: "Nullam",
                    //     projectDetail: "Ultricies",
                    //     // sublineFirstLine: "Τίποτα καινούργιο κάτω από",
                    //     // sublineSecondLine: "τον ήλιο",
                    //     bgImg: "https://i.postimg.cc/t4RBtrnQ/slide2.jpg",
                    //     // rectImg: "https://i.postimg.cc/3JFLGMRF/slide-rect2.jpg"
                    // },
                    // {
                    //     projectName: "Nullam",
                    //     projectDetail: "Ultricies",
                    //     // sublineFirstLine: "Τίποτα καινούργιο κάτω από",
                    //     // sublineSecondLine: "τον ήλιο",
                    //     bgImg: "https://i.postimg.cc/t4RBtrnQ/slide2.jpg",
                    //     // rectImg: "https://i.postimg.cc/3JFLGMRF/slide-rect2.jpg"
                    // },
                    // {
                    //     projectName: "Nullam",
                    //     projectDetail: "Ultricies",
                    //     // sublineFirstLine: "Τίποτα καινούργιο κάτω από",
                    //     // sublineSecondLine: "τον ήλιο",
                    //     bgImg: "https://i.postimg.cc/t4RBtrnQ/slide2.jpg",
                    //     // rectImg: "https://i.postimg.cc/3JFLGMRF/slide-rect2.jpg"
                    // }
                ]
            }
        },
        created(){
            this.getTopProject();
        },
        mounted: function () {
            var productRotatorSlide = document.getElementById("app");
            var startX = 0;
            var endX = 0;

            productRotatorSlide.addEventListener("touchstart", (event) => startX = event.touches[0].pageX);

            productRotatorSlide.addEventListener("touchmove", (event) => endX = event.touches[0].pageX);

            productRotatorSlide.addEventListener("touchend", function(event) {
                var threshold = startX - endX;

                if (threshold < 150 && 0 < this.currentSlide) {
                    this.currentSlide--;
                }
                if (threshold > -150 && this.currentSlide < this.slides.length - 1) {
                    this.currentSlide++;
                }
            }.bind(this));
        },
        methods: {
            getTopProject(){
                axios.get('http://localhost:8088/getHomePage').then(response => {
                    console.log(response.data);
                    this.slides = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            projectShow(btn){
                // console.log(btn.target.innerText)
                console.log(btn)
                this.$router.push({ path:'/projectShow?id='+btn})
                // axios.post('http://localhost:8088/projectShow',qs.stringify({
                //     "projectName" : btn.target.innerText
                // })).then(response => {
                //
                // })
            },
            updateSlide(index) {
                index < this.currentSlide ? this.isPreviousSlide = true : this.isPreviousSlide = false;
                this.currentSlide = index;
                this.isFirstLoad = false;
            }
        }
    }

</script>

<style  lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Playfair+Display:700,900");
    @import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");
    html {
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    @mixin media($breakpoint) {
        @media (max-width: $breakpoint) {
            @content;
        }
    }

    @mixin media-min($breakpoint) {
        @media (min-width: $breakpoint) {
            @content;
        }
    }

    @mixin media-height($breakpoint) {
        @media (max-height: $breakpoint) {
            @content;
        }
    }

    // ------------- VARIABLES ------------- //
    $whitespace-height: 50px;
    $left-offset: 13vw;
    $rect-width: 48vh;
    $rect-height: 62vh;
    $rect-border-width: 5vh;
    $control-btn-padding: 1.6rem;
    $control-active-btn-offset: .3rem;
    $left-offset-small: 9vw;
    $rect-height-small: 20vw;
    $rect-width-small: 16vw;
    $rect-border-width-small: 5vh;
    // ------------- GENERAL ------------- //
    %callout {
        font-family: 'Montserrat';
        text-transform: uppercase;
        color: #fff;
        letter-spacing: .12rem;
        font-size: .7rem;
        line-height: 1;
    }

    [v-cloak] {
        opacity: 0;
    }

    body {
        cursor: default;
        ::selection {
            background-color: rgba(46, 49, 52, .7);
            color: #f5f5f1;
        }
        ::-moz-selection {
            background-color: rgba(46, 49, 52, .7);
            color: #f5f5f1;
        }
    }

    .wrapper {
        height: calc(108vh - #{$whitespace-height});
        min-height: 36rem;
        position: relative;
        @include media(630px) {
            height: 100vh;
            min-height: 0;
        }
    }

    // ------------- SLIDES ------------- //
    .slide {
        &-wrapper {
            background-size: cover;
            height: 100%;
            background-position: center center;
            position: absolute;
            width: 100%;
            background-blend-mode: darken;
            &:nth-child(1) {
                /*background-color: rgba(115, 129, 153, .4);*/
                &:before {
                    background-color: rgba(115, 129, 153, .25);
                }
                .slide-content-text {
                    text-shadow: 2px 5px 45px rgba(85, 96, 113, 0.25);
                }
            }
            &:nth-child(2) {
                /*background-color: rgba(144, 171, 184, .7);*/
                &:before {
                    background-color: rgba(144, 171, 184, .3);
                }
                .slide-content-text {
                    text-shadow: 2px 5px 45px rgba(121, 142, 152, 0.2);
                }
            }
            &:nth-child(3) {
                /*background-color: rgba(86, 125, 156, .5);*/
                &:before {
                    background-color: rgba(86, 125, 156, 0.2);
                }
                .slide-content-text {
                    text-shadow: 2px 5px 55px rgba(57, 83, 103, 0.4);
                }
            }
            &:before {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
            }
        }
        &-inner {
            position: relative;
            z-index: 2;
            height: 100%;
            overflow: hidden;
        }
        &-bg-text {
            font-family: 'Playfair Display';
            color: #000;
            font-size: 30vh;
            line-height: .8;
            opacity: .03;
            font-weight: 900;
            margin-top: -4rem;
            position: absolute;
            top: 50%;
            left: 5vw;
            transform: translateY(-50%);
            > p:last-child {
                padding-left: 4rem;
            }
        }
        &-content {
            color: #fff;
            margin-top: 5rem;
            position: absolute;
            top: 50%;
            left: calc(#{$left-offset} + (.7) * #{$rect-width});
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            @include media(1000px) {
                left: calc(#{$left-offset} + 1rem);
            }
            @include media-height(730px) {
                top: 30%;
                transform: translateY(-30%);
                left: calc(#{$left-offset-small} + (.7) * #{$rect-width-small});
            }
            &-text {
                font-family: 'SimSun';
                font-size: 5rem;
                letter-spacing: .1rem;
                width: 400px;
                line-height: 1;
                font-weight: 500;
                will-change: auto;
                @include media-height(790px) {
                    font-size: 1.2rem;
                }
                @include media(1150px) {
                    font-size: 1rem;
                }
                @include media(840px) {
                    font-size: 1rem;
                }
                @include media(630px) {
                    margin-bottom: 5.5rem;
                }
                @include media(500px) {
                    font-size: 3.5rem;
                }
                > p:last-child {
                    padding-left: 3rem;
                }
            }
            &-cta {
                @extend %callout;
                cursor: pointer;
                align-self: flex-start;
                margin-top: 4.5rem;
                margin-left: calc((.3) * 48vh + 4.5rem);
                padding: .9rem 2.2rem;
                border-left: 1px solid #fff;
                border-right: 1px solid #fff;
                transition: .18s ease-in-out;
                font-weight: 700;
                @include media(1000px) {
                    background-color: rgba(255, 255, 255, .3);
                    padding-top: 1.2rem;
                    padding-bottom: 1.2rem;
                }
                @include media(630px) {
                    display: none;
                }
                &:hover {
                    color: #000;
                    background-color: #fff;
                }
            }
        }
        &-rect {
            height: $rect-height;
            width: $rect-width;
            border-image-slice: 10%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: $left-offset;
            border-width: $rect-border-width;
            border-style: solid;
            box-shadow: 2px 2px 90px 30px rgba(41, 50, 61, 0.22);
            will-change: auto;
            @include media-height(790px) {
                left: $left-offset-small;
                height: $rect-height-small;
                width: $rect-width-small;
                border-width: $rect-border-width-small;
            }
            @include media-height(730px) {
                top: 30%;
                transform: translateY(-30%);
            }
            &-filter {
                filter: brightness(110%) contrast(110%) saturate(110%);
            }
        }
        &-side-text {
            @extend %callout;
            position: absolute;
            left: calc(#{$left-offset} - 3rem);
            writing-mode: vertical-rl;
            top: calc((50% - (#{$rect-height} / 2)) + (#{$rect-border-width} / 2));
            @include media-height(790px) {
                left: calc(#{$left-offset-small} - 3rem);
                top: calc((50% - (#{$rect-height-small} / 2)) + (#{$rect-border-width-small} / 2));
            }
            @include media-height(730px) {
                top: calc((40% - (#{$rect-height-small} / 2)) + (#{$rect-border-width-small} / 2));
            }
            > span:first-child {
                font-weight: 700;
            }
            &:after {
                content: "";
                width: 1px;
                background-color: #fff;
                height: 40px;
                display: block;
                position: absolute;
                top: calc(100% + 25px);
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    // ------------- CONTROLS ------------- //
    .controls {
        &-container {
            position: absolute;
            z-index: 200;
            display: flex;
            bottom: 0;
            right: 100px;
            left: 60px;
            align-items: flex-end;
            @include media(630px) {
                display: none;
            }
        }
        &-button {
            @extend %callout;
            cursor: pointer;
            background-color: rgba(208, 206, 204, .32);
            border: 0;
            padding: $control-btn-padding 2.2rem;
            flex-basis: 0;
            flex-grow: 1;
            min-width: 15rem;
            transition: .25s ease-in-out;
            outline: 0;
            @include media(730px) {
                padding: 1.2rem 1.4rem;
                min-width: 13rem;
            }
            &:not(.active) {
                &:hover {
                    color: #000;
                    background-color: #fff;
                }
            }
            &.active {
                cursor: default;
                font-weight: 700;
                background-color: #3b3e45;
                padding-top: $control-btn-padding + $control-active-btn-offset;
                padding-bottom: $control-btn-padding + $control-active-btn-offset;
                margin-bottom: -$control-active-btn-offset;
                position: relative;
                @include media(730px) {
                    padding-top: 1.4rem;
                    padding-bottom: 1.4rem;
                    margin-bottom: -0.15rem;
                }
                &:after {
                    content: "";
                    background-color: #e3e3e3;
                    height: 5px;
                    width: calc(100% - 8px);
                    position: absolute;
                    top: 100%;
                    left: 4px;
                }
            }
            &:not(.active) + & {
                border-left: 1px solid rgba(255, 255, 255, .2);
            }
        }
    }

    // ------------- PAGINATION ------------- //
    .pagination {
        &-container {
            position: absolute;
            z-index: 200;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            @include media(920px) {
                display: none;
            }
        }
        &-item {
            width: 30px;
            height: 1px;
            /*background-color: rgba(255, 255, 255, .6);*/
            transition: .18s ease-in-out;
            & + & {
                margin-top: 1rem;
            }
            &.active {
                background-color: #fff;
                position: relative;
                transform: translateX(-.6rem);
                width: 35px;
                &:after {
                    content: "";
                    height: 4px;
                    width: 2px;
                    border-radius: 35%;
                    background-color: #fff;
                    display: inline-block;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateX(.6rem) translateY(-50%);
                }
            }
            &:not(.active) {
                cursor: pointer;
                &:hover {
                    background-color: #fff;
                    width: 35px;
                }
            }
        }
    }

    // ------------- ANIMATION EFFECT ------------- //
    $slide-swipe: .9s;
    $text-cut-up: .5s;
    @keyframes slideLeft {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }

    @keyframes slideRight {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes cutTextUp {
        from {
            clip-path: inset(0 0 -10% 0);
        }
        to {
            clip-path: inset(0 0 100% 0);
        }
    }

    @keyframes cutTextDown {
        from {
            clip-path: inset(100% 0 0 0);
        }
        to {
            clip-path: inset(-10% 0 -20% 0);
            opacity: 1;
        }
    }

    @keyframes cutTextDownFromTop {
        from {
            clip-path: inset(0 0 100% 0);
        }
        to {
            clip-path: inset(0 0 -30% 0);
            opacity: 1;
        }
    }

    @keyframes rectMovement {
        0% {
            transform: translateX(0) rotate(0) translateY(-50%);
        }
        60% {
            opacity: 1;
        }
        100% {
            transform: translateX(calc(-#{$rect-width} + -#{$left-offset})) rotate(12deg) translateY(-50%);
            opacity: 0;
        }
    }

    @include media-height(730px) {
        @keyframes rectMovement {
            0% {
                transform: translateX(0) rotate(0) translateY(-30%);
            }
            60% {
                opacity: 1;
            }
            100% {
                transform: translateX(calc(-#{$rect-width} + -#{$left-offset})) rotate(12deg) translateY(-30%);
                opacity: 0;
            }
        }
    }

    @keyframes rectMovementFromRight {
        0% {
            transform: translateX(calc(#{$rect-width})) rotate(12deg) translateY(-50%);
            opacity: 0;
        }
        60% {
            opacity: 1;
        }
        100% {
            transform: translateX(0) rotate(0) translateY(-50%);
            opacity: 1;
            @include media-height(730px) {
                transform: translateX(0) rotate(0) translateY(-30%);
            }
        }
    }

    @include media-height(730px) {
        @keyframes rectMovementFromRight {
            0% {
                transform: translateX(calc(#{$rect-width})) rotate(12deg) translateY(-30%);
                opacity: 0;
            }
            60% {
                opacity: 1;
            }
            100% {
                transform: translateX(0) rotate(0) translateY(-30%);
                opacity: 1;
            }
        }
    }

    @keyframes rectMovementRight {
        0% {
            transform: translateX(calc(-#{$rect-width} + -#{$left-offset})) rotate(12deg) translateY(-50%);
        }
        40% {
            opacity: 1;
        }
        100% {
            transform: translateX(0) rotate(0) translateY(-50%);
            opacity: 1;
            @include media-height(730px) {
                transform: translateX(0) rotate(0) translateY(-30%);
            }
        }
    }

    @include media-height(730px) {
        @keyframes rectMovementRight {
            0% {
                transform: translateX(calc(-#{$rect-width} + -#{$left-offset})) rotate(12deg) translateY(-30%);
            }
            40% {
                opacity: 1;
            }
            100% {
                transform: translateX(0) rotate(0) translateY(-30%);
                opacity: 1;
            }
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .slide-wrapper {
        opacity: 0;
        transition-delay: $slide-swipe + $text-cut-up;
        transition-duration: 0s;
        transition-property: opacity;
        will-change: opacity, transform;
        &:not(.active) {
            animation-delay: $text-cut-up;
            animation-name: slideLeft;
            animation-duration: $slide-swipe;
            animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
            pointer-events: none;
            .slide-content-text > p,
            .slide-side-text {
                animation-name: cutTextUp;
                animation-duration: $text-cut-up;
                animation-timing-function: ease-out;
            }
            .slide-rect {
                animation-name: rectMovement;
                animation-duration: $text-cut-up;
                animation-timing-function: ease;
                animation-fill-mode: forwards;
            }
        }
        &.active {
            transition-delay: 0s;
            opacity: 1;
            .slide-content-text > p {
                opacity: 0;
                animation-delay: $text-cut-up + .3s;
                animation-name: cutTextDown;
                animation-duration: $text-cut-up;
                animation-timing-function: ease;
                animation-fill-mode: forwards;
            }
            .slide-rect {
                opacity: 0;
                animation-name: rectMovementFromRight;
                animation-duration: $text-cut-up - .05s;
                animation-timing-function: ease;
                animation-fill-mode: forwards;
                animation-delay: $slide-swipe;
            }
        }
        .is-previous & {
            &:not(.active) {
                animation: none;
                .slide-rect {
                    animation: none;
                }
            }
            &.active {
                transform: translateX(-100%);
                animation-fill-mode: forwards;
                animation-delay: $text-cut-up;
                animation-name: slideRight;
                animation-duration: $slide-swipe - .1s;
                animation-timing-function: cubic-bezier(0.18, 0.54, 0.52, 0.93);
                .slide-rect {
                    opacity: 0;
                    animation-name: rectMovementRight;
                    animation-duration: $text-cut-up;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                    animation-delay: $slide-swipe;
                }
            }
        }
    }

    .first-load {
        .slide-wrapper.active .slide-side-text,
        .slide-wrapper.active .slide-content-cta,
        .slide-wrapper.active .slide-rect,
        .controls-container {
            opacity: 0;
            animation-name: fadeIn;
            animation-delay: .3s;
            animation-duration: .3s;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in;
        }
        .slide-wrapper.active .slide-content-text > p {
            animation-name: fadeIn;
            animation-delay: $text-cut-up;
            animation-duration: $text-cut-up + .2s;
        }
    }
</style>


<!--<template>-->
    <!--<div>-->
        <!--&lt;!&ndash;轮播图&ndash;&gt;-->
        <!--<el-row style="padding: 0px 0px 0px 0px">-->
            <!--<el-row type="flex" class="row-bg" justify="center">-->
                <!--<el-col :span="24" align="center">-->
                    <!--&lt;!&ndash;<el-carousel :interval="4000" type="card" height="400px">&ndash;&gt;-->
                        <!--&lt;!&ndash;<el-carousel-item v-for="item in itemList">&ndash;&gt;-->
                            <!--&lt;!&ndash;<h3>{{ item.imgUrl }}</h3>&ndash;&gt;-->
                        <!--&lt;!&ndash;</el-carousel-item>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-carousel>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-card class="box-card">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="text item">&ndash;&gt;-->
                            <!--&lt;!&ndash;{{desc}}&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
                    <!--<el-carousel indicator-position="outside" height="510px">-->
                        <!--<el-carousel-item v-for="item in projectList">-->
                            <!--<div>-->
                                <!--<div style="position: relative" @click="projectShow(item.projectName)">-->
                                    <!--<div style="position: absolute" class="layout">-->
                                        <!--<el-card class="box_style">-->
                                            <!--<span>{{item.projectName+':'+item.projectDetail | ellipsis}}</span>-->
                                        <!--</el-card>-->
                                    <!--</div>-->
                                    <!--<img :src='imgUrl+item.firstPicture' height="100%" width="100%">-->
                                    <!--&lt;!&ndash;<img src="e:\coding-java\1.png" height="100%" width="100%">&ndash;&gt;-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</el-carousel-item>-->
                    <!--</el-carousel>-->
                <!--</el-col>-->
            <!--</el-row>-->
        <!--</el-row>-->

        <!--&lt;!&ndash;Java类展示&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
            <!--&lt;!&ndash;java&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-row style="padding: 10px 80px 10px 50px" >&ndash;&gt;-->
            <!--&lt;!&ndash;<el-row>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-col :span="9" >&ndash;&gt;-->
                    <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="first_pic" alt="">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                        <!--&lt;!&ndash;项目一&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

                <!--&lt;!&ndash;<el-row :gutter="5" type="flex" class="row-bg" justify="center">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
                <!--&lt;!&ndash;<el-row :gutter="5" type="flex" class="row-bg" justify="center">&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-col :span="12">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="type">&ndash;&gt;-->
                            <!--&lt;!&ndash;项目一&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import axios from 'axios'-->
    <!--import qs from 'qs'-->
    <!--//import pic1 from "../../assets/img/img.jpg";-->
    <!--export default {-->
        <!--name: 'dashboard',-->
        <!--filters: {-->
            <!--ellipsis:function (value) {-->
                <!--if (!value) return ''-->
                <!--if (value.length > 60) {-->
                    <!--return value.slice(0,60) + '...'-->
                <!--}-->
                <!--return value-->
            <!--}-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--imgUrl:'http://localhost:8088/show?pictureName=',-->
                <!--name: localStorage.getItem('ms_username'),-->
                <!--desc:"这是文字",-->
                <!--projectList:[],-->
                <!--itemList: [-->
                    <!--{imgUrl: require('../../assets/img/login-bg.jpg'), introduction: "111"},-->
                    <!--{imgUrl: require('../../assets/img/login-bg.jpg'), introduction: "222"},-->
                    <!--{imgUrl: require('../../assets/img/login-bg.jpg'), introduction: "333"},-->
                    <!--{imgUrl: require('../../assets/img/login-bg.jpg'), introduction: "444"}-->
                <!--],-->
                <!--// projectList:[-->
                <!--//     {name:project1},-->
                <!--//     {name:project2},-->
                <!--//     {name:project3},-->
                <!--//     {name:project4},-->
                <!--//     {name:project5},-->
                <!--//     {name:project6},-->
                <!--//     {name:project7},-->
                <!--//     {name:project8},-->
                <!--//     {name:project9}-->
                <!--// ]-->
            <!--}-->
        <!--},-->
        <!--computed: {-->

        <!--},-->
        <!--created(){-->
            <!--this.getTopProject();-->
        <!--},-->
        <!--methods: {-->
            <!--projectShow(btn){-->
                <!--// console.log(btn.target.innerText)-->
                <!--console.log(btn)-->
                <!--this.$router.push({ path:'/projectShow?name='+btn})-->
                <!--// axios.post('http://localhost:8088/projectShow',qs.stringify({-->
                <!--//     "projectName" : btn.target.innerText-->
                <!--// })).then(response => {-->
                <!--//-->
                <!--// })-->
            <!--},-->
            <!--getTopProject(){-->
                <!--axios.get('http://localhost:8088/getHomePage').then(response => {-->
                    <!--console.log(response.data);-->
                    <!--this.projectList = response.data;-->
                <!--}).catch(e => {-->
                    <!--this.errors.push(e)-->
                <!--})-->
            <!--}-->
        <!--}-->
    <!--}-->

<!--</script>-->


<!--<style scoped>-->
    <!--/*.el-row {*/-->
        <!--/*margin-bottom: 20px;*/-->
    <!--/*}*/-->

    <!--/*.grid-content {*/-->
        <!--/*display: flex;*/-->
        <!--/*align-items: center;*/-->
        <!--/*height: 100px;*/-->
    <!--/*}*/-->

    <!--/*.grid-cont-right {*/-->
        <!--/*flex: 1;*/-->
        <!--/*text-align: center;*/-->
        <!--/*font-size: 14px;*/-->
        <!--/*color: #999;*/-->
    <!--/*}*/-->

    <!--/*.grid-num {*/-->
        <!--/*font-size: 30px;*/-->
        <!--/*font-weight: bold;*/-->
    <!--/*}*/-->

    <!--/*.grid-con-icon {*/-->
        <!--/*font-size: 50px;*/-->
        <!--/*width: 100px;*/-->
        <!--/*height: 100px;*/-->
        <!--/*text-align: center;*/-->
        <!--/*line-height: 100px;*/-->
        <!--/*color: #fff;*/-->
    <!--/*}*/-->

    <!--/*.grid-con-1 .grid-con-icon {*/-->
        <!--/*background: rgb(45, 140, 240);*/-->
    <!--/*}*/-->

    <!--/*.grid-con-1 .grid-num {*/-->
        <!--/*color: rgb(45, 140, 240);*/-->
    <!--/*}*/-->

    <!--/*.grid-con-2 .grid-con-icon {*/-->
        <!--/*background: rgb(100, 213, 114);*/-->
    <!--/*}*/-->

    <!--/*.grid-con-2 .grid-num {*/-->
        <!--/*color: rgb(45, 140, 240);*/-->
    <!--/*}*/-->

    <!--/*.grid-con-3 .grid-con-icon {*/-->
        <!--/*background: rgb(242, 94, 67);*/-->
    <!--/*}*/-->

    <!--/*.grid-con-3 .grid-num {*/-->
        <!--/*color: rgb(242, 94, 67);*/-->
    <!--/*}*/-->

    <!--/*.user-info {*/-->
        <!--/*display: flex;*/-->
        <!--/*align-items: center;*/-->
        <!--/*padding-bottom: 20px;*/-->
        <!--/*border-bottom: 2px solid #ccc;*/-->
        <!--/*margin-bottom: 20px;*/-->
    <!--/*}*/-->

    <!--/*.first_pic {*/-->
        <!--/*width: 350px;*/-->
        <!--/*height: 250px;*/-->
    <!--/*}*/-->

    <!--/*.other_pic {*/-->
        <!--/*width: 200px;*/-->
        <!--/*height: 150px;*/-->
    <!--/*}*/-->
    <!--/*.user-info-cont {*/-->
        <!--/*padding-left: 50px;*/-->
        <!--/*flex: 1;*/-->
        <!--/*font-size: 14px;*/-->
        <!--/*color: #999;*/-->
    <!--/*}*/-->

    <!--/*.user-info-cont div:first-child {*/-->
        <!--/*font-size: 30px;*/-->
        <!--/*color: #222;*/-->
    <!--/*}*/-->

    <!--/*.user-info-list {*/-->
        <!--/*font-size: 14px;*/-->
        <!--/*color: #999;*/-->
        <!--/*line-height: 25px;*/-->
    <!--/*}*/-->

    <!--/*.user-info-list span {*/-->
        <!--/*margin-left: 70px;*/-->
    <!--/*}*/-->

    <!--/*.mgb20 {*/-->
        <!--/*margin-bottom: 20px;*/-->
    <!--/*}*/-->

    <!--/*.todo-item {*/-->
        <!--/*font-size: 14px;*/-->
    <!--/*}*/-->

    <!--/*.todo-item-del {*/-->
        <!--/*text-decoration: line-through;*/-->
        <!--/*color: #999;*/-->
    <!--/*}*/-->

    <!--/*.schart {*/-->
        <!--/*width: 100%;*/-->
        <!--/*height: 300px;*/-->
    <!--/*}*/-->


    <!--/*.el-carousel__item h3 {*/-->
        <!--/*color: #475669;*/-->
        <!--/*font-size: 14px;*/-->
        <!--/*opacity: 0.75;*/-->
        <!--/*line-height: 200px;*/-->
        <!--/*margin: 0;*/-->
    <!--/*}*/-->

    <!--/*.el-carousel__item:nth-child(2n) {*/-->
        <!--/*background-color: #99a9bf;*/-->
    <!--/*}*/-->

    <!--/*.el-carousel__item:nth-child(2n+1) {*/-->
        <!--/*background-color: #d3dce6;*/-->
    <!--/*}*/-->
    <!--.el-carousel__item h3 {-->
        <!--color: #475669;-->
        <!--font-size: 18px;-->
        <!--opacity: 0.75;-->
        <!--line-height: 500px;-->
        <!--margin: 0;-->
    <!--}-->

    <!--.el-carousel__item:nth-child(2n) {-->
        <!--background-color: #99a9bf;-->
    <!--}-->

    <!--.el-carousel__item:nth-child(2n+1) {-->
        <!--background-color: #d3dce6;-->
    <!--}-->

    <!--.text {-->
        <!--font-size: 14px;-->
    <!--}-->

    <!--.item {-->
        <!--padding: 18px 0;-->
    <!--}-->

    <!--.box_style{-->
        <!--background: rgba(0,0,0,0);-->
        <!--width: 400px;-->
        <!--height: 300px;-->
        <!--pointer-events: none;-->

    <!--}-->
    <!--.layout{-->
        <!--padding-left: 100px;-->
        <!--padding-top: 100px;-->
    <!--}-->
<!--</style>-->
