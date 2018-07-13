Vue.component("navbar", {
  created: function() {
    this.$emit("page-change", this.page);
  },
  data: function() {
    return {
      page: localStorage.getItem("page") || "card2position",
      menu: {
        "card2position": "Card to Position",
        "position2card": "Position to Card",
        "settings": "Settings"
      }
    }
  },
  methods: {
    save: function(value) {
      localStorage.setItem("page", value);
      return value;
    }
  },
  watch: {
    page: function(val) {
      this.$emit("page-change", val)
    }
  },
  template: §navbar.vue.html
});

setTimeout(() => {
  $('.navbar-nav>li>a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });
}, 2000)