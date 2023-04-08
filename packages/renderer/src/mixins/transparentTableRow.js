export default {
  computed: {
    transparentRow1() {
      return `background-color: ${this.$vuetify.theme.currentTheme.secondary}99;`
    },
    transparentRow2() {
      return `background-color: ${this.$vuetify.theme.currentTheme.secondary6}99;`
    },
  },
  methods: {
    transparentRow(index) {
      if (index % 2 === 0) {
        return this.transparentRow1
      }
      return this.transparentRow2
    },
  },
}
