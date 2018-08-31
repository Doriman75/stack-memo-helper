Vue.component("card", {
  props: ['name'],
  data: function() {
    return {
      symbols: {
        "C": "&clubs;",
        "S": "&spades;",
        "H": "&hearts;",
        "D": "&diams;"
      }
    }
  },
  template: `@include("card.vue.html")`
});