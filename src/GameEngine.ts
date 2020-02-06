import Galaxy from "./Galaxy";
import readline from "readline";
import { Chance } from "chance";
import Player from "./Player";
import { travelRoute } from "./TravelRoute";
import { TravelResult } from "./interfaces/TravelResult";
import { winGameMessage, loseGameMessage } from "./constants";

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

  const generator: Chance.Chance = seed ? new Chance(seed) : new Chance();

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

  let gameEnd: boolean = false;
  let winCondition: boolean = false;
  while (!gameEnd) {
    const playerChoice = await queryForTravelPlan(
      `You are in System ${
        currentSystem.name
      } and your options are as follows: \n${currentSystem.travelOptions()}\nYou have ${newPlayer.supplies} supplies left.\n`,
      currentSystem.routes.map((route, index) => index)
    );

    const travelResult: TravelResult = travelRoute(
      currentSystem.routes[playerChoice],
      generator
    );

    newPlayer.travel(travelResult.suppliesConsumed);
    console.log(`${travelResult.message}\n`);
    if (newPlayer.supplies <= 0 || newPlayer.distanceTraveled > 55) {
      gameEnd = true;
      continue;
    }

    if (
      travelResult.travelSuccessful &&
      currentSystem.routes[playerChoice].destination ===
        newGalaxy.destinationSystem
    ) {
      gameEnd = true;
      winCondition = true;
    } else if (travelResult.travelSuccessful) {
      currentSystem = currentSystem.routes[playerChoice].destination;
    }
  }

  if (winCondition) {
    console.log(winGameMessage);
  } else {
    console.log(loseGameMessage);
  }
};
