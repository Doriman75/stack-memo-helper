Vue.component("wrong-position", {
  data: function() {
    return {
      "position": 1,
      "card": "4C"
    };
  },
  created: function() {
    this.$root.$on("wrong-position", (x) => {
      this.position = x.position;
      this.card = x.card;
      $('#wrongPositionModal').modal('show')
    });
  },
  template: `@include("wrong-position.vue.html")`
});