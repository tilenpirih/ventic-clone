export default {
  computed: {
    transparentMenu() {
      return `background-color: ${this.$vuetify.theme.currentTheme.secondary}${this.$store.state.Settings.Appearance.menuOpacity};`
    },
  },
}
