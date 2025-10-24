import { askQuestion } from "./AskQuestion";
import { Chance } from "chance";
import Galaxy from "./Galaxy";
import Player from "./Player";

export const init = async () => {
  let seed: string = await askQuestion(
    "Would you like to play with a custom seed?",
  );

  seed = seed ? seed : new Chance().guid();

  const generator: Chance.Chance = seed ? new Chance(seed) : new Chance();

  console.log(`Session seed is ${seed}.\n`);

  const newGalaxy = new Galaxy(generator);
  newGalaxy.generateGalaxy();
  const newPlayer = new Player();

  console.log(
    `You awake in the comfort of your Explorer grade spacecraft, with little memory of how you arrived here. An incoming message on your control panel reads, "Come home, ${generator.name()}." The source of the signal is from the ${
      newGalaxy.destinationSystem.name
    } system. Your ship has ${
      newPlayer.supplies
    } supplies and it will take ${newGalaxy.size - 1} jumps to reach home.\n`,
  );

  console.log(
    `You will be presented a series of options and you must decide which path to take in order to reach home. Enter the number option presented and hit enter to choose. You will lose if your ship runs out of supplies or you take longer than 45 Lightyears to reach home. Risk and Reward is mutually exclusive, you will get one or the other. Typically, risk involves losing resources or time, and reward involves being given supplies.\n`,
  );

  return { generator, newGalaxy, newPlayer };
};
