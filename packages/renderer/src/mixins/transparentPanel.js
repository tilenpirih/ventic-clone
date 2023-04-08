export default {
  computed: {
    transparentPanel() {
      return `background-color: ${this.$vuetify.theme.currentTheme.secondary}${this.$store.state.Settings.Appearance.panelOpacity};`
    },
  },
}
