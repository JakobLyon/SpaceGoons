import Galaxy from "./Galaxy";
import readline from "readline";
import { Chance } from "chance";
import Player from "./Player";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let seed: string = null;
rl.question("Would you like to play with a custom seed?", userInput => {
  if (userInput) {
    seed = userInput;
  }
});

const generator: Chance.Chance = seed ? new Chance(seed) : new Chance();

const newGalaxy = new Galaxy(undefined, undefined, generator);
newGalaxy.generateGalaxy();
const newPlayer = new Player();

let currentSystem = newGalaxy.startingSystem;

console.log(`You awake in the comfort of your Explorer grade spacecraft, with little memory of how you arrived here. An incoming message on your control panel reads, "Come home, ${generator.name()}." The source of the signal is from the ${newGalaxy.destinationSystem.name} system. Your ship has ${newPlayer.supplies} supplies and it will take ${newGalaxy.size} jumps to reach home.`);

let gameEnd: boolean = false;
let winCondition: boolean = false;
let options: string;
while (!gameEnd) {
  // > you are on x and your options are y
  // 1. parse options into string
  options = currentSystem.travelOptions();
  rl.question(`You are in System ${currentSystem.name} and your options are as follows: \n${options}`, (userChoice) => {
    // process choice
    /**
     * calculate risk/reward
     * update supplies
     * check supplies for loss condition
     * update current system
     * check for win condition
     */
  });
}

if (winCondition) {
  console.log(`After a long and arduous journey, you finally arrive home.`);
} else {
  console.log(`You've run out of supplies and your ship is floating aimlessly into the void. `)
}

rl.close();
