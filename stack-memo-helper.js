var tamariz = [ 
					"4C", "2H", "7D", "3C", "4H", "6D", "AS", "5H", "9S", "2S", "QH", "3D", "QC",
					"8H", "6S", "5S", "9H", "KC", "2D", "JH", "3S", "8S", "6H", "10C", "5D", "KD",
					"2C", "3H", "8D", "5C", "KS", "JD", "8C", "10S", "KH", "JC", "7S", "10H", "AD",
					"4S", "7H", "4D", "AC", "9C", "JS", "QD", "7C", "QS", "10D", "6C", "AH", "9D"
			];
			
var aronson = [
					"JS", "KC", "5C", "2H", "9S", "AS", "3H", "6C", "8D", "AC", "10S", "5H", "2D",
					"KD", "7D", "8C", "3S", "AD", "7S", "5S", "QD", "AH", "8S", "3D", "7H", "QH",
					"5D", "7C", "4H", "KH", "4D", "10D", "JC", "JH", "10C", "JD", "4S", "10H", "6H",
					"3C", "2S", "9H", "KS", "6S", "4C", "8H", "9C", "QS", "6D", "QC", "2C", "9D" 
];

var app = new Vue({
  el: '#stack-memo-helper',
  created: function()
  {
	this.init();
  },
  data: {
	current_card: null,
	correct_card: null,
	current_position: null,
	correct_position: null,
	view_stacks: {},
	decks: {
		"Tamariz": tamariz,
		"Aronson": aronson
	},
	deck: null,
	card_choices: null,
	position_choices: null,
	page: null,
	number_of_choices: parseInt(localStorage.getItem("number_of_choices")) || 8
  },
  watch:{
	number_of_choices: function(val)
	{
		this.init();
	}
  },
  computed: {
	number_of_choices_in_percent: function()
	{
		return "width: " + 10 * this.number_of_choices + "%";
	},
	current_stack: function()
	{
		return Object.keys(this.decks).filter(name => this.decks[name] == this.deck)[0];
	}
  },
  methods: {
	add: function()
	{
		if(this.number_of_choices < 10) this.number_of_choices++; 
		localStorage.setItem("number_of_choices", this.number_of_choices);
	},
	sub: function()
	{
		if(this.number_of_choices >2) this.number_of_choices--; 
		localStorage.setItem("number_of_choices", this.number_of_choices);
	},
	
	init: function()
	{
		this.deck = localStorage.getItem("deck") || this.decks["Tamariz"];
		this.current_card = this.randomCard();
		this.current_position = this.randomPosition();
		this.card_choices = this.randomPositions(1+this.deck.indexOf(this.current_card));
		this.position_choices = this.randomCards(this.deck[this.current_position - 1]);
		this.page = this.load("page") || "card2position";
		for(var name in this.decks) this.view_stacks[name] = false;
	},
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
	},
	toggleViewStacks: function(name)
	{
		var v = JSON.parse(JSON.stringify(this.view_stacks));
		v[name] = !v[name];
		this.view_stacks = v;
	}
  }
})
