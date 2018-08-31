Vue.component("card2position", {
  created: function() {
    this.newCard();
    this.$root.$on("new-card", this.newCard);
  },
  data: function() {
    return {
      card: null,
      choices: [],
      stack: JSON.parse(localStorage.getItem("stack")) || tamariz,
      stack_name: localStorage.getItem("stack_name") || "Tamariz"
    }
  },
  methods: {
    newCard: function() {
      this.card = this.stack[randomPosition() - 1];
      this.choices = randomPositions(1 + this.stack.indexOf(this.card));
    },
    check: function(position) {
      if (this.stack[position - 1] != this.card) this.$root.$emit('wrong-position', {
        position: 1 + this.stack.indexOf(this.card),
        card: this.card
      });
      else this.newCard();
    },
  },
  template: `@include("card2position.vue.html")`
});