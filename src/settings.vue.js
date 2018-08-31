Vue.component("settings", {
  data: function() {
    return {
      number_of_choices: parseInt(localStorage.getItem('number_of_choices')) || 8,
      stack_name: localStorage.getItem('stack_name') || "Tamariz",
      stack: JSON.parse(localStorage.getItem('stack')) || tamariz,
      view_stacks: {},
      stacks: decks
    }
  },
  computed: {
    number_of_choices_in_percent: function() {
      return "width: " + 10 * this.number_of_choices + "%";
    }
  },
  props: ['decks'],
  methods: {
    changeStack: function(stack_name, stack) {
      localStorage.setItem("stack", JSON.stringify(stack));
      localStorage.setItem("stack_name", stack_name)
      this.$root.$emit('change-stack');
      this.stack = stack;
      this.stack_name = stack_name;
    },
    add: function() {
      if (this.number_of_choices < 10) this.number_of_choices++;
      localStorage.setItem("number_of_choices", this.number_of_choices);
    },
    sub: function() {
      if (this.number_of_choices > 2) this.number_of_choices--;
      localStorage.setItem("number_of_choices", this.number_of_choices);
    },
    toggleViewStacks: function(name) {
      var v = JSON.parse(JSON.stringify(this.view_stacks));
      v[name] = !v[name];
      this.view_stacks = v;
    }
  },
  template: `@include("settings.vue.html")`
});