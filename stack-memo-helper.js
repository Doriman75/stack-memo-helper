var tamariz = [ 
					"4C", "2H", "7D", "3C", "4H", "6D", "AS", "5H", "9S", "2S", "QH", "3D", "QC",
					"8H", "6S", "5S", "9H", "KC", "2D", "JH", "3S", "8S", "6H", "10C", "5D", "KD",
					"2C", "3H", "8D", "5C", "KS", "JD", "8C", "10S", "KH", "JC", "7S", "10H", "AD",
					"4S", "7H", "4D", "AC", "9C", "JS", "QD", "7C", "QS", "10D", "6C", "AH", "9D"
				]
var symbols = { "C": "&clubs;", "S": "&spades;", "H": "&hearts;", "D": "&diams;"}

Vue.component("card", {
	props: ['name'],	
	data: function() {
	return {
		symbols: { "C": "&clubs;", "S": "&spades;", "H": "&hearts;", "D": "&diams;"}
		}
	},
	template: '<span v-if="name" class="font-weight-bold" v-bind:class="name.charAt(name.length - 1)"><span>{{name.substring(0, name.length - 1)}}</span><span v-html="symbols[name.substring(name.length - 1)]"></span></span>'
});

var app = new Vue({
  el: '#stack-memo-helper',
  created: function()
  {
	this.current_card = this.randomCard();
	this.current_position = this.randomPosition();
	this.card_choices = this.randomPositions(1+this.deck.indexOf(this.current_card));
	this.position_choices = this.randomCards(this.deck[this.current_position - 1]);
	this.page = this.load("page") || "card2position";
  },
  data: {
	current_card: null,
	correct_card: null,
	current_position: null,
	correct_position: null,
	deck: tamariz,
	card_choices: null,
	position_choices: null,
	page: null,
	number_of_choices: 8
  },
  methods: {
	randomPosition: function()
	{
		return 1+Math.floor(this.deck.length * Math.random());
	},
	randomPositions: function(fixed)
	{
		let set = new Set([fixed]);
		while(set.size < this.number_of_choices) set.add(this.randomPosition());
		return Array.from(set).sort((a, b) => a - b);
	},
	randomCards: function(fixed)
	{
		let set = new Set([fixed]);
		while(set.size < this.number_of_choices) set.add(this.randomCard());
		return Array.from(set).sort();
	},
	randomCard: function()
	{
		return this.deck[this.randomPosition()-1];
	},
	guessCard: function(guess) {
		this.correct_card = this.current_card;
		if(this.deck[guess-1] != this.current_card) $('#wrongCardModal').modal('show'); else this.newCard();
	},
	guessNumber: function(guess) {
		this.correct_position = this.current_position;
		if(this.deck[this.current_position-1] != guess) $('#wrongPositionModal').modal('show'); else this.newPosition();
	},
	newCard: function()
	{
		this.current_card = this.randomCard();
		this.card_choices = this.randomPositions(1+this.deck.indexOf(this.current_card));		
	},
	newPosition: function()
	{
		this.current_position = this.randomPosition();
		this.position_choices = this.randomCards(this.deck[this.current_position-1]);
	},
	save: function(key, value)
	{
		localStorage.setItem(key, value);
		return value;
	},
	load: function(key)
	{
		return localStorage.getItem(key);
	}
  }
})
