<template>
  <v-layout class="wrapper mx-3 mb-3" :style="transparentPanel">
    <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption-->
    <!--<div class="videoWrapper">
      <video ref="videoPlayer" class="video-js">
        <span class="vjs-icon-placeholder" aria-hidden="true"></span>
      </video>
    </div>-->
    <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption -->
    <video src="https://dl5.webmfiles.org/video-h264.mkv" controls style="position: relative">
      Not supported
      <div class="" style="position: absolute; top: 0px; left: 0px">asdf</div>
    </video>
    <!-- <Test /> -->
    <!-- <v-btn @click="play()">play</v-btn>
    <v-btn @click="pause()">pause</v-btn> -->
  </v-layout>
</template>

<script>
import videojs from 'video.js'
import transparentPanel from '@/mixins/transparentPanel'
import Test from '@/components/player/components/Test.vue'
// import video from '../../assets/video-h265.mkv'

export default {
  name: 'VideoPlayer',
  // components: { Test },
  mixins: [transparentPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data: () => ({
    // player: null,
  }),
  computed: {
    // player() {
    //   return videojs(this.$refs.videoPlayer, {
    //     controls: true,
    //     fluid: true,
    //     loop: true,
    //     aspectRatio: '16:9',
    //     sources: [
    //       {
    //         // src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //         src: 'https://dl5.webmfiles.org/video-h265.mkv',
    //         // src: video,
    //       },
    //     ],
    //   })
    // },
  },
  mounted() {
    // this.player = videojs(this.$refs.videoPlayer, {
    //   // autoplay: true,
    //   controls: true,
    //   fluid: true,
    //   loop: true,
    //   aspectRation: '16:9',
    //   sources: [
    //     {
    //       src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //       // src: video,
    //     },
    //   ],
    // })
    // console.log(this.player)
  },
  // beforeDestroy() {
  //   if (this.player) {
  //     this.player.dispose()
  //   }
  // },
  // methods: {
  //   play() {
  //     this.player.play()
  //   },
  //   pause() {
  //     this.player.pause()
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 150px;
  max-height: 150px;
}
.videoWrapper {
  height: 100%;
  aspect-ratio: 16/9;
}
</style>
