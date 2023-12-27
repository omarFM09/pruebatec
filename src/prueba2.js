const readline = require('readline');

function simulateLCR(players, rolls) {
  const chips = new Array(players).fill(3);
  let centerChips = 0;
  let currentPlayer = 0;

  for (let roll of rolls) {
    if (chips[currentPlayer] > 0) {
      switch (roll) {
        case 'L':
          chips[currentPlayer]--;
          chips[(currentPlayer + players - 1) % players]++;
          break;
        case 'C':
          chips[currentPlayer]--;
          centerChips++;
          break;
        case 'R':
          chips[currentPlayer]--;
          chips[(currentPlayer + 1) % players]++;
          break;
      }
    }

    currentPlayer = (currentPlayer + 1) % players;
  }

  const winner = chips.findIndex((count) => count > 0);
  const currentPlayerStr = winner !== -1 ? `(${winner + 1}(W))` : `(*)`;

  return {
    chips,
    centerChips,
    currentPlayerStr,
  };
}

function printGameState(gameNumber, players, state) {
  console.log(`Game ${gameNumber}:`);
  for (let i = 0; i < players; i++) {
    const suffix = i === state.chips.findIndex((count) => count > 0) ? state.currentPlayerStr : '';
    console.log(`Player ${i + 1}:${state.chips[i]}${suffix}`);
  }
  console.log(`Center:${state.centerChips}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let gameNumber = 1;

function processInput(line) {
  const [players, rolls] = line.split(' ');
  if (players === '0') {
    rl.close();
    return;
  }

  const state = simulateLCR(parseInt(players), rolls);
  printGameState(gameNumber, parseInt(players), state);
  console.log(); // Separate test cases with a blank line
  gameNumber++;

  rl.question('', processInput);
}

rl.question('', processInput);