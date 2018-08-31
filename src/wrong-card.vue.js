Vue.component("wrong-card", {
  data: function() {
    return {
      "position": 1,
      "card": "4C"
    };
  },
  created: function() {
    this.$root.$on("wrong-card", (x) => {
      this.position = x.position;
      this.card = x.card;
      $('#wrongCardModal').modal('show')
    });
  },
  template: `@include("wrong-card.vue.html")`
});