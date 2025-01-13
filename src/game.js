document.addEventListener("alpine:init", () => {
	const gate = {
		name: "Gateway",
		short: "the entrance to your temple.",
		desc: "A massive gateway and entrance to your temple. At its sides rest massive Obelisks, depicting Pharaohs standing tall.",
		items: [],
	};
	const cour = {
		name: "Courtyard",
		short: "a roofless court for all who enter the temple.",
		desc: "A roofless colonnaded court and is accesible to all for their spiritual needs. It is most often used for ceremonies, celebrations and festivals, but between the columns lie shrines other gods, namely: Horus, Khonshu and Taweret",
		items: [],
	};
	const hall = {
		name: "Hallway",
		short: "at its end, giving way to the deeper rooms of the temple.",
		desc: "Here the columns of the hallway end to give way to doors to the more focused areas of the temple, including the Sanctuary of Thoth, the storeroom and the pool.",
		items: [],
	};
	const hal2 = {
		name: "Hallway",
		short: "a long hall with columns that depict myths and legends.",
		desc: "A long hall, supported by sandstone columns. The columns depict stories of the gods and your kings, powerful events and rites that happened in the past.",
		items: ["incense"],
	};
	const none = {
		name: "Empty",
		short: "out of bounds :(",
		desc: "You shouldn't be here. This is a bug the developer can't be arsed to fix. Please go back as to not go truly out of bounds and break the game...",
		items: [],
	};
	const pool = {
		name: "Pool",
		short: "a pool reserved for priests to bathe in.",
		desc: "A sacred pool of water ripples before you. Its qualities allow priests to bath in it to ensure purity for when they perform their rituals. In some ways, it is seen as a ritual itself to bathe in it.",
		items: [],
	};
	const stor = {
		name: "Storeroom",
		short: "a storage closet containing various items.",
		desc: "A room containing multiple items for rituals and maintenance in and around the temple. Mainly it carries the offerings given to the gods in rituals, but among the items, you notice that the incense is missing.",
		items: ["wine", "flowers", "food"],
	};
	const obel = {
		name: "Obelisk",
		short: "a tall statue.",
		desc: "A tall carved monument that depicts a past pharoah in glorious and wonderful detail.",
		items: [""],
	};
	const ob3l = {
		name: "Obelisk",
		short: "a tall statue.",
		desc: "A tall carved monument that depicts a past pharoah in glorious and wonderful detail.",
		items: ["sillycat"],
	};
	const barq = {
		name: "Barque",
		short:
			"a room containing the boat and shrines required for rituals for the god of the temple.",
		desc: `In this room a lies a small boat and some shrines used for ceremonies and rituals. Strangly, a box has been left in the room. It's supposed to carry a miniature of your god, and it usually lies in the Sanctuary ahead`,
		items: ["statue"],
	};
	const sanc = {
		name: "Sanctuary",
		short: "an inner chamber reserved for Thoth, and the priest of the temple.",
		desc: "This inner area is reserved only for priests of the temple. In here special rituals and ceremonies are performed for the primary god of the temple, Thoth. A statue of him is kept behind the altar, but it nor the box is there.",
		items: [],
	};

	const shri = {
		name: "Shrine",
		short: "a small shrine dedicated to other gods.",
		desc: "These small shrines in the courtyard allow for those visiting to make offerings to other gods aside from the primary one that resides in the sanctum.",
	};

	function win() {
		window.location.href = "credits.html";
	}

	Alpine.data("gameData", () => ({
		// Program info
		name: "temple_html",
		version: "0.1.0",
		mode: "title", // "game" or "credits"
		// User input
		input: "",
		command: "",
		// Player data
		position: { x: 2, y: 3 },
		items: [],
		// Output store
		output: [
			{
				text: `You wake up in the temple in your bed, and get up to perform your rituals for the day. As you make your way out of your room, you find your self by the temple's sacred pool.`,
				type: "output", // other valid values are "command" and "error"
			},
		],

		// Game data
		layout: [
			[none, none, none, none, none, none, none],
			[none, none, none, sanc, none, none, none],
			[none, none, none, barq, none, none, none],
			[none, pool, pool, hall, stor, none, none],
			[none, none, none, hal2, none, none, none],
			[none, none, shri, cour, shri, none, none],
			[none, none, obel, gate, ob3l, none, none],
			[none, none, none, none, none, none, none],
		],

		bathed: false,
		gatesOpen: false,
		offering: false,
		godsSorted: 0,

		time: 0,

		// Input handling

		readInput() {
			// Pipe input to output
			this.command = `> ${this.input}`;
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
					this.help();
					break;
				case "north":
					inputs.length > 1
						? (this.position.y -= parseInt(inputs[1]))
						: (this.position.y -= 1);
					this.glance();
					break;
				case "east":
					inputs.length > 1
						? (this.position.x += parseInt(inputs[1]))
						: (this.position.x += 1);
					this.glance();
					break;
				case "west":
					inputs.length > 1
						? (this.position.x -= parseInt(inputs[1]))
						: (this.position.x -= 1);
					this.glance();
					break;
				case "south":
					inputs.length > 1
						? (this.position.y += parseInt(inputs[1]))
						: (this.position.y += 1);
					this.glance();
					break;
				case "get":
				case "grab":
					this.grabItem(inputs[1]);
					break;
				case "use":
				case "place":
				case "drop":
					this.dropItem(inputs[1]);
					break;
				case "look":
					this.look();
					break;
				case "map":
				case "area":
					this.map();
					break;
				case "stuff":
				case "inventory":
					this.showInventory();
					break;
				case "ritual":
					this.performRitual(inputs);
					break;
				case "done":
				case "finish":
				case "end":
				case "win":
					if (
						!this.gatesOpen &&
						this.bathed &&
						this.offering &&
						this.time >= 4 &&
						this.godsSorted >= 3
					) {
						this.output.push({
							text: `Good work priest! You have completed all your tasks for the day and have done an excellent job!`,
							type: "ritual",
						});
						setTimeout(win, 1500);
					} else {
						this.output.push({
							text: `Insolence priest! You have yet to complete all of your tasks!`,
							type: "error",
						});
					}
					break;
				case "gibson":
				case "insecure":
					this.output.push({
						text: "mess with the best, die like the rest",
						type: "ritual",
					});
					this.gatesOpen = false;
					this.offering = true;
					this.time = 4;
					this.godsSorted = 4;
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
				case "gate":
				case "gates":
				case "door":
				case "doors":
				case "doorway":
				case "gateway":
					if (this.layout[this.position.y][this.position.x].name == "Gateway") {
						if (rites[2] == "open" && this.time >= 1) {
							if (!this.gatesOpen) {
								this.gatesOpen = true;
								this.time += 1;
							}
							this.output.push({
								text: `The gates of the temple swing open, ready to welcome all.`,
								type: "ritual",
							});
						} else if (rites[2] == "close" && this.time >= 4) {
							this.gatesOpen = false;
							this.output.push({
								text: `The gates of the temple shut. They will remain closed until the next day.`,
								type: "ritual",
							});
						} else {
							this.output.push({
								text: `This is not a valid action to perform on the gates of the temple at this time. Consider your other tasks.`,
								type: "error",
							});
						}
					} else {
						this.output.push({
							text: `No action or ritual can be performed on the gates if you are not there to perform it!`,
							type: "error",
						});
					}
					break;
				case "pool":
				case "bath":
					if (rites[2] == "bathe" || rites[2] == "wash" || rites[2] == "bath") {
						if (!this.bathed) {
							this.bathed = true;
							this.time += 1;
						}
						this.output.push({
							text: `You wash in the pool, now purified and ready to tackle your tasks.`,
							type: "ritual",
						});
					}
					break;
				default:
					// God sorting
					if (this.bathed && this.gatesOpen) {
						if (
							this.layout[this.position.y][this.position.x].name == "Shrine"
						) {
							switch (rites[2]) {
								case "wine":
									if (rites[1] == "horus" && this.items.includes(rites[2])) {
										this.godsSorted += 1;
										this.output.push({
											text: `Horus accepts the offering of wine`,
											type: "ritual",
										});
										this.dropItem(rites[2]);
									} else {
										this.output.push({
											text: `This is not what will appease Horus`,
											type: "error",
										});
									}
									break;
								case "flowers":
									if (rites[1] == "taweret" && this.items.includes(rites[2])) {
										this.godsSorted += 1;
										this.output.push({
											text: `Taweret accepts the offering of flowers`,
											type: "ritual",
										});
										this.dropItem(rites[2]);
									} else {
										this.output.push({
											text: `This is not what will appease Taweret`,
											type: "error",
										});
									}
									break;
								case "food":
									if (rites[1] == "khonshu" && this.items.includes(rites[2])) {
										this.godsSorted += 1;
										this.output.push({
											text: `Khonshu accepts the offering of food`,
											type: "ritual",
										});
										this.dropItem(rites[2]);
									} else {
										this.output.push({
											text: `This is not what will appease Khonshu`,
											type: "error",
										});
									}
									break;
								default:
									this.output.push({
										text: `${rites[2]} is not a valid ritual for ${rites[1]}`,
										type: "error",
									});
							}
						} else if (
							this.layout[this.position.y][this.position.x].name ==
								"Sanctuary" &&
							rites[1] == "thoth"
						) {
							if (
								this.layout[this.position.y][this.position.x].items.includes(
									"statue",
								)
							) {
								if (rites[2] == "incense" && this.items.includes("incense")) {
									if (!this.offering) {
										this.offering = true;
										this.time += 1;
									}
									this.output.push({
										text: `You offer incense to the primary god of your temple. He is pleased.`,
										type: "ritual",
									});
									this.dropItem("incense");
								} else if (
									rites[2] == "kiss" &&
									rites[3] == "boys" &&
									this.items.includes("sillycat")
								) {
									this.output.push({
										text: `Θώθ whats this?`,
										type: "ritual",
									});
								}
							}
							break;
						} else {
							this.output.push({
								text: `${rites[2]} is not a valid ritual for ${rites[1]}`,
								type: "error",
							});
						}
					} else {
						if (!this.bathed) {
							this.output.push({
								text: `You are too unclean to perform an offering to the gods!`,
								type: "error",
							});
						}
						if (!this.gatesOpen) {
							this.output.push({
								text: `The gates are not open! The gods will not accept an offering under these circumstances!`,
								type: "error",
							});
						}
					}
			}

			if (this.godsSorted >= 3 && this.time <= 3) {
				this.time += 1;
			}
		},

		grabItem(item) {
			if (this.layout[this.position.y][this.position.x].items.includes(item)) {
				if (
					this.layout[this.position.y][this.position.x].name == "Courtyard" &&
					this.godsSorted > 0
				) {
					if (item == "wine" || item == "food" || item == "flowers") {
						this.godsSorted--;
					}
				}

				if (
					(this.layout[this.position.y][this.position.x].name == "Sanctuary" &&
						item == "incense") ||
					item == "statue"
				) {
					this.offering = false;
					if (this.time >= 2) {
						this.time--;
					}
				}
				let index =
					this.layout[this.position.y][this.position.x].items.indexOf(item);
				this.items.push(item);
				this.layout[this.position.y][this.position.x].items.splice(index, 1);

				this.output.push({ text: `You picked up ${item}.`, type: "output" });
			}
		},

		dropItem(item) {
			if (this.items.includes(item)) {
				let index = this.items.indexOf(item);
				this.layout[this.position.y][this.position.x].items.push(item);
				this.items.splice(index, 1);

				this.output.push({ text: `You put down ${item}.`, type: "output" });
			}
		},

		map() {
			this.output.push({ text: "Location:", type: "ritual" });
			this.output.push({
				text: `[${this.layout[this.position.y - 1][this.position.x - 1].name}][${this.layout[this.position.y - 1][this.position.x].name}][${this.layout[this.position.y - 1][this.position.x + 1].name}]`,
				type: "ritual",
			});
			this.output.push({
				text: `[${this.layout[this.position.y][this.position.x - 1].name}](${this.layout[this.position.y][this.position.x].name})[${this.layout[this.position.y][this.position.x + 1].name}]`,
				type: "output",
			});
			this.output.push({
				text: `[${this.layout[this.position.y + 1][this.position.x - 1].name}][${this.layout[this.position.y + 1][this.position.x].name}][${this.layout[this.position.y + 1][this.position.x + 1].name}]`,
				type: "ritual",
			});
		},

		look() {
			console.log(this.position.x);
			console.log(this.position.y);
			this.output.push({
				text: this.layout[this.position.y][this.position.x].desc,
				type: "output",
			});

			let inv = "[";
			inv.concat();
			for (let item of this.layout[this.position.y][this.position.x].items) {
				inv = inv.concat(" ", item);
			}
			inv = inv.concat(" ]");
			this.output.push({
				text: inv,
				type: "output",
			});
		},

		glance() {
			let eye = `You find yourself in the ${this.layout[this.position.y][this.position.x].name}, ${this.layout[this.position.y][this.position.x].short}`;
			this.output.push({
				text: eye,
				type: "output",
			});
		},

		showInventory() {
			this.output.push({
				text: "Inventory:",
				type: "ritual",
			});

			let inv = "[";
			inv.concat();
			for (let item of this.items) {
				inv = inv.concat(" ", item);
			}
			inv = inv.concat(" ]");

			this.output.push({
				text: inv,
				type: "output",
			});
		},

		help() {
			this.output.push({
				text: `Are you lost? You can type 'look' to get an idea of the room you are in. Or, type 'map' for a view of nearby rooms`,
				type: "output",
			});
			this.output.push({
				text: `Other acceptable commands are:`,
				type: "output",
			});
			this.output.push({
				text: `north/east/south/west [optional number] - move around`,
				type: "output",
			});
			this.output.push({
				text: `ritual [god/location] [rite/object] - perform a ritual in a gods name.`,
				type: "output",
			});
			this.output.push({
				text: `grab/get [item] - pick up an item in a room.`,
				type: "output",
			});
			this.output.push({
				text: `drop/place [item] - put an item down in a room.`,
				type: "output",
			});
		},

		get responses() {
			return this.output.toReversed();
		},

		get currentRoom() {
			return this.layout[this.position.y][this.position.x].name;
		},
	}));
});
