import Galaxy from "./Galaxy";
import readline from "readline";
import { Chance } from "chance";
import Player from "./Player";

const askQuestion = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
};

export const GameEngine = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let seed: string = await askQuestion("Would you like to play with a custom seed?");

  const generator: Chance.Chance = seed ? new Chance(seed) : new Chance();

  const newGalaxy = new Galaxy(undefined, generator);
  newGalaxy.generateGalaxy();
  const newPlayer = new Player();

  let currentSystem = newGalaxy.startingSystem;

  console.log(
    `You awake in the comfort of your Explorer grade spacecraft, with little memory of how you arrived here. An incoming message on your control panel reads, "Come home, ${generator.name()}." The source of the signal is from the ${
      newGalaxy.destinationSystem.name
    } system. Your ship has ${newPlayer.supplies} supplies and it will take ${
      newGalaxy.size
    } jumps to reach home.\n`
  );

  let gameEnd: boolean = false;
  let winCondition: boolean = false;
  while (!gameEnd) {
    // > you are on x and your options are y
    // 1. parse options into string
    if (process.env.NODE_ENV === "debug") {
      console.log(newGalaxy);
      console.log(currentSystem.routes[0])
    }
    const options = await askQuestion(`You are in System ${
      currentSystem.name
    } and your options are as follows: \n${currentSystem.travelOptions()}\n`);


          /**
           * calculate risk/reward
           * update supplies
           * check supplies for loss condition
           * update current system
           * check for win condition
           */
  }

  if (winCondition) {
    console.log(`After a long and arduous journey, you finally arrive home.`);
  } else {
    console.log(
      `You've run out of supplies and your ship is floating aimlessly into the void. `
    );
  }

  rl.close();
};
