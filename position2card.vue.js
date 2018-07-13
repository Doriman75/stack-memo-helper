Vue.component("position2card", {
  created: function() {
    this.newPosition();
    this.$root.$on("new-position", this.newPosition);
  },
  data: function() {
    return {
      position: null,
      choices: [],
      stack: JSON.parse(localStorage.getItem("stack")) || tamariz,
      stack_name: localStorage.getItem("stack_name") || "Tamariz"
    }
  },
  methods: {
    newPosition: function() {
      this.position = randomPosition();
      this.choices = randomCards(this.stack, this.stack[this.position - 1]);
    },
    check: function(card) {
      if (this.stack.indexOf(card) + 1 != this.position) this.$root.$emit('wrong-card', {
        position: this.position,
        card: this.stack[this.position - 1]
      });
      else this.newPosition();
    },
  },
  template: §position2card.vue.html
});