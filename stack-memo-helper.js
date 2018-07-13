var app = new Vue({
  el: '#stack-memo-helper',
  data: {
    page: localStorage.getItem("page") || "card2position"
  }
})