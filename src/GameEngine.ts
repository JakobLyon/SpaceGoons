import { travelRoute } from "./TravelRoute";
import { TravelResult } from "./interfaces/TravelResult";
import {
  winGameMessage,
  loseGameNoSuppliesMessage,
  loseGameTooLongMessage
} from "./constants";
import { GameEndCondition } from "./enums/GameEndCondition";
import { askQuestion } from "./AskQuestion";
import { init } from "./InitGame";

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
  let answer: string;
  while (flag) {
    answer = await askQuestion(
      `${query}\nshortest: Pay 1 supply to calculate the immediate route leading to the shortest path.\n`
    );
    if (answer === "shortest") {
      // calculate shortest path, print it, ask again
      // we need the current node in this context, we also need the last node to check when we reach the end
    } else if (options.includes(parseInt(answer, 10))) {
      flag = false;
    } else {
      console.log("That is not a valid travel plan.\n");
    }
  }

  return parseInt(answer, 10);
};

/**
 * Run Game
 */
export const GameEngine = async () => {
  const { generator, newGalaxy, newPlayer } = await init();
  let currentSystem = newGalaxy.startingSystem;

  let gameEnd: GameEndCondition = null;
  while (!gameEnd) {
    let playerChoice = null;
    const answer = await askQuestion(
      `${`You are in System ${
        currentSystem.name
      } and your options are as follows: \n${currentSystem.travelOptions()}\nshortest: Pay 1 supply to calculate the immediate route leading to the shortest path.\nYou have ${
        newPlayer.supplies
      } supplies left and must arrive in ${45 -
        newPlayer.distanceTraveled}.`}\n`
    );
    if (answer === "shortest") {
      // calculate shortest path, print it, ask again
      // we need the current node in this context, we also need the last node to check when we reach the end
      // const nextShortestOption = calculateShortest(currentSystem);
      // console.log(`The next shortest option is: ${nextShortestOption}`);
    } else if (
      currentSystem.routes
        .map((route, index) => index)
        .includes(parseInt(answer, 10))
    ) {
      playerChoice = parseInt(answer, 10);
    } else {
      console.log("That is not a valid travel plan.\n");
    }

    let travelResult: TravelResult;
    if (playerChoice) {
      travelResult = travelRoute(currentSystem.routes[playerChoice], generator);

      newPlayer.travel(travelResult.suppliesConsumed, currentSystem.routes[playerChoice].distance);
      console.log(`${travelResult.message}\n`);

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

    if (newPlayer.supplies <= 0) {
      gameEnd = GameEndCondition.OutOfSupplies;
    } else if (newPlayer.distanceTraveled > 45) {
      gameEnd = GameEndCondition.TooManyLightyears;
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
