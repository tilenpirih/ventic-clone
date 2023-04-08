<template>
  <v-layout justify-center>
    <v-flex xs12 sm11 md10 lg9 xl8>
      <v-tabs class="transparent" center-active show-arrows>
        <v-tab
          v-for="(value, name, index) in torrents"
          :key="index"
          class="text-none"
          @click.stop="selectedSite = name"
        >
          {{ name }}
        </v-tab>
      </v-tabs>
      <v-simple-table height="600" class="transparent">
        <template #default>
          <thead class="mr-2">
            <tr>
              <th class="text-left tranparent">Name</th>
              <th class="text-left tranparent">Size</th>
              <th class="text-left tranparent">S/L</th>
              <th class="text-left tranparent">Resolution</th>
              <th class="pa-0 pr-3" style="border-bottom: 0px"></th>
            </tr>
          </thead>
          <tbody style="max-height: 500px; overflow: auto">
            <tr
              v-for="(item, i) in torrents[selectedSite]"
              :key="i"
              :class="{ trBack: i % 2 }"
              class="torrentRow"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.size }}</td>
              <td>{{ item.seeders }}</td>
              <td>{{ item.resolution }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    torrents: {
      rarbg: [
        {
          name: 'The.Good.Doctor.S05E15.My.Way.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rartv]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'Death.On.The.Nile.2022.1080p.BluRay.x265-RARBG',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'Peaky.Blinders.S01.1080p.BluRay.x264-SHORTBREHD[rartv]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
        {
          name: 'The.Good.Doctor.S05E07.Expired.REPACK.1080p.AMZN.WEBRip.DDP5.1.x264-NOSiViD[rarbg]',
          size: '4.4GB',
          seeders: '1300/23',
          resolution: 1080,
        },
      ],
      '1337x': [{ name: 'neki2', size: '4.4GB' }],
      partis: [{ name: 'neki3', size: '4.4GB' }],
    },
    selectedSite: null,
  }),
  created() {
    // eslint-disable-next-line prefer-destructuring
    this.selectedSite = Object.keys(this.torrents)[0]
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
.torrentContainer {
  min-height: 400px;
  max-height: 500px;
  overflow: auto;
}
th {
  background: transparent !important;
}
tr {
  background: transparent !important;
}
.trBack {
  background-color: rgba(#6f6f6f, 0.2) !important;
}
td:first-child {
  overflow-wrap: anywhere;
}
.torrentRow:hover {
  background-color: rgba(123, 123, 123, 0.3) !important;
}
tbody {
  max-height: 500px;
  overflow: auto;
}
</style>
