<template>
  <v-list style="min-width: 200px; max-width: 400px">
    <v-list-item v-for="(torrent, index) in torrents" :key="index">
      <div class="mb-1" style="width: 100%">
        <div class="mb-1 d-flex align-center">
          <div style="width: 100%">
            <!-- currently overflow is not working, will deal with this problem later -->
            <small
              style="color: gray; white-space: nowrap; text-overflow: ellipsis; overflow: hidden"
              >{{ torrent.title }}</small
            ><br />
            <v-progress-linear v-model="torrent.progress" class="progress" color="primary" />
            <small style="color: gray"
              >{{ torrent.progress }}%
              <v-icon small color="grey">mdi-arrow-down</v-icon>
              {{ torrent.downloadSpeed }} |
              <v-icon small color="grey">mdi-arrow-up</v-icon>
              {{ torrent.uploadSpeed }}
            </small>
          </div>
          <v-btn fab x-small class="mx-2" elevation="2">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn fab x-small elevation="2">
            <v-icon>mdi-folder</v-icon>
          </v-btn>
        </div>
        <v-divider />
      </div>
    </v-list-item>
    <v-btn class="primary my-2 ml-4">Open all torrents</v-btn>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    torrents: [
      {
        title: 'Batman',
        progress: 76,
        estimatedTime: '23min',
        downloadSpeed: '650 kb/s',
        uploadSpeed: '23KB/s',
      },
      {
        title: 'Wonder woman with text',
        progress: 26,
        estimatedTime: '48min',
        downloadSpeed: '320 kb/s',
        uploadSpeed: '23KB/s',
      },
      {
        title: 'Superman',
        progress: 40,
        estimatedTime: '32min',
        downloadSpeed: '450 kb/s',
        uploadSpeed: '23KB/s',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
/*
.progress{
  height: 100px !important;
}*/
</style>
