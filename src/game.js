document.addEventListener("alpine:init", () => {
	Alpine.data("gameData", () => ({
		// Program info
		name: "temple_html",
		version: "0.1.0",
		score: 0,
		// User input
		input: "",
		command: "",
		// Player data
		position: { x: 0, y: 0 },
		items: [],
		// Output store
		output: [
			{
				text: `You wake up in the temple of [name]. On your table lies a note, listing your duties for the day. Better get started!`,
				type: "output", // other valid values are "command" and "error"
			},
		],

		// Game data
		layout: {
			rows: [],
			columns: [],
		},

		// Input handling

		readInput() {
			// Pipe input to output
			this.command = `> ${this.input}`;
			console.log(this.command);
			this.output.push({
				text: this.command,
				type: "command",
			});
			this.input = this.input.toLowerCase();
			// Parse input and respond
			let inputs = this.input.split(" ");
			this.parse(inputs);
			// Clear input
			this.input = "";
		},

		parse(inputs) {
			switch (inputs[0]) {
				case "help":
					break;
				case "north":
					inputs.length > 1
						? (this.position.y += inputs[1])
						: (this.position.y += 1);
					break;
				case "east":
					inputs.length > 1
						? (this.position.x += inputs[1])
						: (this.position.x += 1);
					break;
				case "west":
					inputs.length > 1
						? (this.position.x -= inputs[1])
						: (this.position.x -= 1);
					break;
				case "south":
					inputs.length > 1
						? (this.position.y -= inputs[1])
						: (this.position.y -= 1);
					break;
				case "grab":
					this.grabItem(inputs[1]);
					break;
				case "drop":
					this.dropItem(inputs[1]);
					break;
				case "look":
					look();
					break;
				case "stuff":
				case "inventory":
					this.showInventory();
					break;
				case "ritual":
					this.performRitual(inputs);
					break;
				default:
					this.output.push({
						text: `Command "${inputs[0]}" is not recognized`,
						type: "error",
					});
			}
		},

		performRitual(rites) {
			switch (rites[1]) {
				case "khonshu":
					switch (rites[2]) {
						case "vengance":
							this.output.push({
								text: "Calm down Mark Spector.",
								type: "output",
							});
							break;
						default:
							this.output.push({
								text: "No such ritual for the god Khonshu exists!",
								type: "error",
							});
					}
					break;
				default:
					this.output.push({
						text: `There is no god "${rites[1]}" you heretic!`,
						type: "error",
					});
			}
		},

		grabItem(item) {},

		dropItem(item) {},

		look() {},

		showInventory() {},

		get responses() {
			return this.output.toReversed();
		},
	}));
});
