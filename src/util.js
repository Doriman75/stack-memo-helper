if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
}



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

var nikola = [
  "6D", "5C", "KC", "JH", "5S", "9D", "9S", "QH", "3C", "10C", "KS", "AH", "4D",
  "JD", "KD", "KH", "2D", "QC", "9C", "10H", "8D", "2C", "AC", "7H", "7C", "4S",
  "7S", "9H", "8S", "6S", "6C", "2H", "AS", "JS", "4C", "5H", "10S", "AD", "JC",
  "4H", "2S", "7D", "QS", "3H", "3S", "8C", "10D", "6H", "5D", "3D", "QD", "8H"
];

var aragon = [
  "JS", "7C", "10H", "AD", "4C", "7H", "4D", "AS", "4H", "7D", "4S", "AH", "10D",
  "7S", "JC", "KD", "10S", "8C", "JH", "AC", "KS", "5C", "8H", "3D", "QS", "KH",
  "9C", "QH", "6C", "9H", "2D", "3C", "6H", "5D", "2S", "3H", "8D", "5S", "KC",
  "JD", "8S", "10C", "2C", "5H", "6D", "3S", "2H", "9D", "6S", "QC", "QD", "9S"
];




var decks = {
  "Tamariz": tamariz,
  "Aronson": aronson,
  "Nikola": nikola,
  "Aragòn": aragon
}

function randomPosition() {
  return 1 + Math.floor(52 * Math.random());
}

function randomPositions(fixed) {
  let set = new Set([fixed]);
  var number_of_choices = parseInt(localStorage.getItem("number_of_choices") || "8");
  while (set.size < number_of_choices) set.add(randomPosition());
  return Array.from(set).sort((a, b) => a - b);
}

function randomCard(deck) {
  return deck[this.randomPosition() - 1];
}

function randomCards(deck, fixed) {
  let set = new Set([fixed]);
  var number_of_choices = parseInt(localStorage.getItem("number_of_choices") || "8");
  while (set.size < number_of_choices) set.add(randomCard(deck));
  return Array.from(set).sort();
}