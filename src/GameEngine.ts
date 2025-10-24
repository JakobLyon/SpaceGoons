import { travelRoute } from "./TravelRoute";
import { TravelResult } from "./interfaces/TravelResult";
import {
  winGameMessage,
  loseGameNoSuppliesMessage,
  loseGameTooLongMessage,
  CALC_SHORTEST_COST,
} from "./constants";
import { GameEndCondition } from "./enums/GameEndCondition";
import { askQuestion } from "./AskQuestion";
import { init } from "./InitGame";
import { calculateShortest } from "./CalculateShortest";

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
      } supplies left and must arrive in ${
        45 - newPlayer.distanceTraveled
      } Lightyears.`}\n`,
    );
    if (answer === "shortest") {
      const { nextStop } = calculateShortest(
        currentSystem,
        newGalaxy.destinationSystem,
      );
      console.log(
        `Your ship computer calculates which jump would bring you along the shortest path. Some time passes, burning through ${CALC_SHORTEST_COST} supply. Your ship determines ${nextStop.name} is the shortest route.\n`,
      );
      newPlayer.supplies -= CALC_SHORTEST_COST;
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
    if (playerChoice !== null && playerChoice !== undefined) {
      travelResult = travelRoute(currentSystem.routes[playerChoice], generator);

      newPlayer.travel(
        travelResult.suppliesConsumed,
        currentSystem.routes[playerChoice].distance,
      );
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
