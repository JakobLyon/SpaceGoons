import Galaxy from "./Galaxy";
import readline from "readline";
import { Chance } from "chance";
import Player from "./Player";
import { travelRoute } from "./TravelRoute";
import { TravelResult } from "./interfaces/TravelResult";
import {
  winGameMessage,
  loseGameNoSuppliesMessage,
  loseGameTooLongMessage
} from "./constants";
import { GameEndCondition } from "./enums/GameEndCondition";

/**
 * Ask user query and return their input
 *
 * @param query Text to print to stdout
 */
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

/**
 * Query the CLI for input, check it against a list of approved values. Repeat if input does not pass inspection
 *
 * @param query   Text to print to console
 * @param options List to check user input against
 */
const queryForTravelPlan = async (
  query: string,
  options: Array<number>
): Promise<number> => {
  let flag = true;
  let answer: number;
  while (flag) {
    answer = parseInt(await askQuestion(query), 10);
    if (options.includes(answer)) {
      flag = false;
    } else {
      console.log("That is not a valid travel plan.\n");
    }
  }

  return answer;
};

/**
 * Run Game
 */
export const GameEngine = async () => {
  let seed: string = await askQuestion(
    "Would you like to play with a custom seed?"
  );

  seed = seed ? seed : new Chance().guid();

  const generator: Chance.Chance = seed ? new Chance(seed) : new Chance();

  console.log(`Session seed is ${seed}.\n`);

  const newGalaxy = new Galaxy(generator);
  newGalaxy.generateGalaxy();
  const newPlayer = new Player();

  let currentSystem = newGalaxy.startingSystem;

  console.log(
    `You awake in the comfort of your Explorer grade spacecraft, with little memory of how you arrived here. An incoming message on your control panel reads, "Come home, ${generator.name()}." The source of the signal is from the ${
      newGalaxy.destinationSystem.name
    } system. Your ship has ${
      newPlayer.supplies
    } supplies and it will take ${newGalaxy.size - 1} jumps to reach home.\n`
  );

  console.log(
    `You will be presented a series of options and you must decide which path to take in order to reach home. Enter the number option presented and hit enter to choose. You will lose if your ship runs out of supplies or you take longer than 45 Lightyears to reach home. Risk and Reward is mutually exclusive, you will get one or the other. Typically, risk involves losing resources or time, and reward involves being given supplies.\n`
  );

  let gameEnd: GameEndCondition = null;
  while (!gameEnd) {
    const playerChoice = await queryForTravelPlan(
      `You are in System ${
        currentSystem.name
      } and your options are as follows: \n${currentSystem.travelOptions()}\nYou have ${
        newPlayer.supplies
      } supplies left and must arrive in ${45 - newPlayer.distanceTraveled}.\n`,
      currentSystem.routes.map((route, index) => index)
    );

    const travelResult: TravelResult = travelRoute(
      currentSystem.routes[playerChoice],
      generator
    );

    newPlayer.travel(travelResult.suppliesConsumed);
    console.log(`${travelResult.message}\n`);
    if (newPlayer.supplies <= 0) {
      gameEnd = GameEndCondition.OutOfSupplies;
      continue;
    } else if (newPlayer.distanceTraveled > 45) {
      gameEnd = GameEndCondition.TooManyLightyears;
    }

    if (
      travelResult.travelSuccessful &&
      currentSystem.routes[playerChoice].destination ===
        newGalaxy.destinationSystem
    ) {
      gameEnd = GameEndCondition.Victory;
    } else if (travelResult.travelSuccessful) {
      currentSystem = currentSystem.routes[playerChoice].destination;
    }
  }

  switch (gameEnd) {
    case GameEndCondition.OutOfSupplies:
      console.log(loseGameNoSuppliesMessage);
      break;
    case GameEndCondition.TooManyLightyears:
      console.log(loseGameTooLongMessage);
      break;
    default:
      console.log(winGameMessage);
  }
};
