Vue.component("card", {
	props: ['name'],	
	data: function() {
	return {
		symbols: { "C": "&clubs;", "S": "&spades;", "H": "&hearts;", "D": "&diams;"}
		}
	},
	template: `
	<span v-if="name" class="font-weight-bold" v-bind:class="name.charAt(name.length - 1)">
		<span>{{name.substring(0, name.length - 1)}}</span>
		<span v-html="symbols[name.substring(name.length - 1)]"></span>
	</span>
	`
});