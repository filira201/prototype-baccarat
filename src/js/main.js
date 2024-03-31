import "../css/style.css";

const playButton = document.getElementById("play");
const appArea = document.getElementById("app");
const mainTitle = document.getElementById("h1-title");
const balance = document.getElementById("balance-title");

const discardTens = (number) => {
  return number >= 10 ? number - 10 : number;
};

const restartGame = () => {
  const restartButton = document.createElement("button");
  restartButton.id = "restart-button";
  restartButton.textContent = "Restart Game";
  document.getElementById("user-area").appendChild(restartButton);

  restartButton.addEventListener("click", () => {
    document.getElementById("table").remove();
    startGame();
  });
};

const win = (winner) => {
  if (winner === "draw") {
    document.getElementById("winner-result").textContent = "draw";
  } else {
    document.getElementById("winner-result").textContent = `${winner} win!`;
  }
  restartGame();
};

const baccarat = () => {
  document.getElementById("player-button").disabled = "true";
  document.getElementById("banker-button").disabled = "true";

  let scorePlayer = 0;
  let scoreBanker = 0;

  const cartsValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 0,
    j: 0,
    q: 0,
    k: 0,
    a: 1,
  };

  const cartsSuits = ["bu", "ch", "pi", "kr"];
  for (let i = 0; i < 2; i++) {
    const who = ["player", "banker"];
    for (let j = 0; j < 2; j++) {
      const randomSuits = cartsSuits[Math.floor(Math.random() * 4)];
      const randomValue =
        Object.keys(cartsValues)[Math.floor(Math.random() * 13)];
      document.querySelector(
        `.${who[i]}-${j}`
      ).src = `images/${randomValue}-${randomSuits}.png`;

      i === 0
        ? (scorePlayer += cartsValues[randomValue])
        : (scoreBanker += cartsValues[randomValue]);
    }
  }

  scoreBanker = discardTens(scoreBanker);
  scorePlayer = discardTens(scorePlayer);

  document.getElementById(
    "player-score"
  ).textContent = `player score: ${scorePlayer}`;
  document.getElementById(
    "banker-score"
  ).textContent = `banker score: ${scoreBanker}`;

  if (
    (scoreBanker === 8 || scoreBanker === 9) &&
    (scorePlayer !== 8 || scorePlayer !== 9)
  ) {
    win("banker");
    return;
  }
  if (
    (scorePlayer === 8 || scorePlayer === 9) &&
    (scoreBanker !== 8 || scoreBanker !== 9)
  ) {
    win("player");
    return;
  }

  const playerThirdSuit = cartsSuits[Math.floor(Math.random() * 4)];
  const playerThirdValue =
    Object.keys(cartsValues)[Math.floor(Math.random() * 13)];

  const bankerThirdSuit = cartsSuits[Math.floor(Math.random() * 4)];
  const bankerThirdValue =
    Object.keys(cartsValues)[Math.floor(Math.random() * 13)];

  let playerGiveThird = false;

  if (scorePlayer <= 5) {
    playerGiveThird = true;
    document.querySelector(
      `.player-2`
    ).src = `images/${playerThirdValue}-${playerThirdSuit}.png`;

    scorePlayer += cartsValues[playerThirdValue];
  }

  if (playerGiveThird === false && scoreBanker <= 5) {
    document.querySelector(
      `.banker-2`
    ).src = `images/${bankerThirdValue}-${bankerThirdSuit}.png`;

    scoreBanker += cartsValues[bankerThirdValue];
  } else if (scoreBanker <= 2 && playerGiveThird === true) {
    document.querySelector(
      `.banker-2`
    ).src = `images/${bankerThirdValue}-${bankerThirdSuit}.png`;

    scoreBanker += cartsValues[bankerThirdValue];
  } else if (
    scoreBanker === 3 &&
    playerThirdValue !== 8 &&
    playerGiveThird === true
  ) {
    document.querySelector(
      `.banker-2`
    ).src = `images/${bankerThirdValue}-${bankerThirdSuit}.png`;

    scoreBanker += cartsValues[bankerThirdValue];
  } else if (
    scoreBanker === 4 &&
    playerThirdValue !== 0 &&
    playerThirdValue !== 1 &&
    playerThirdValue !== 8 &&
    playerThirdValue !== 9 &&
    playerGiveThird === true
  ) {
    document.querySelector(
      `.banker-2`
    ).src = `images/${bankerThirdValue}-${bankerThirdSuit}.png`;

    scoreBanker += cartsValues[bankerThirdValue];
  } else if (
    scoreBanker === 5 &&
    playerThirdValue === 4 &&
    playerThirdValue === 5 &&
    playerThirdValue === 6 &&
    playerThirdValue === 7 &&
    playerGiveThird === true
  ) {
    document.querySelector(
      `.banker-2`
    ).src = `images/${bankerThirdValue}-${bankerThirdSuit}.png`;

    bankerScore += cartsValues[bankerThirdValue];
  } else if (
    scoreBanker === 6 &&
    playerThirdValue === 6 &&
    playerThirdValue === 7 &&
    playerGiveThird === true
  ) {
    document.querySelector(
      `.banker-2`
    ).src = `images/${bankerThirdValue}-${bankerThirdSuit}.png`;

    bankerScore += cartsValues[bankerThirdValue];
  }

  scoreBanker = discardTens(scoreBanker);
  scorePlayer = discardTens(scorePlayer);

  document.getElementById(
    "player-score"
  ).textContent = `player score: ${scorePlayer}`;
  document.getElementById(
    "banker-score"
  ).textContent = `banker score: ${scoreBanker}`;

  if (scorePlayer > scoreBanker) {
    win("player");
  } else if (scorePlayer === scoreBanker) {
    win("draw");
  } else {
    win("banker");
  }
};

const createTable = () => {
  const table = document.createElement("div");
  table.id = "table";
  return table;
};

const startGame = () => {
  balance.classList.remove("not-play-balance");
  balance.classList.add("play-balance");

  playButton.classList.add("hidden");
  mainTitle.style.fontSize = "60px";

  const table = createTable();
  table.appendChild(balance);

  const gameArea = document.createElement("div");
  gameArea.id = "game-area";
  table.appendChild(gameArea);

  const userArea = document.createElement("div");
  userArea.id = "user-area";
  table.appendChild(userArea);

  const playerArea = document.createElement("div");
  playerArea.id = "player-area";
  gameArea.appendChild(playerArea);

  const playerCards = document.createElement("div");
  playerCards.id = "player-cards";
  playerArea.appendChild(playerCards);

  const playerScore = document.createElement("p");
  playerScore.id = "player-score";
  playerScore.textContent = "Player Score: 0";
  playerArea.appendChild(playerScore);

  const bankerArea = document.createElement("div");
  bankerArea.id = "banker-area";
  gameArea.appendChild(bankerArea);

  const bankerCards = document.createElement("div");
  bankerCards.id = "banker-cards";
  bankerArea.appendChild(bankerCards);

  const bankerScore = document.createElement("p");
  bankerScore.id = "banker-score";
  bankerScore.textContent = "Banker Score: 0";
  bankerArea.appendChild(bankerScore);

  ["back-side", "back-side", "back-side"].forEach((el, i) => {
    const card = document.createElement("img");
    card.id = `card`;
    card.classList.add(`player-${i}`);
    card.src = `images/${el}.png`;
    playerCards.appendChild(card);
  });

  ["back-side", "back-side", "back-side"].forEach((el, i) => {
    const card = document.createElement("img");
    card.id = `card`;
    card.classList.add(`banker-${i}`);
    card.src = `images/${el}.png`;
    bankerCards.appendChild(card);
  });

  const winnerResult = document.createElement("div");
  winnerResult.id = "winner-result";
  userArea.appendChild(winnerResult);

  const choice = document.createElement("div");
  choice.id = "choice";
  userArea.appendChild(choice);

  const playerButton = document.createElement("button");
  playerButton.id = "player-button";
  playerButton.textContent = "Player";
  choice.appendChild(playerButton);

  const bankerButton = document.createElement("button");
  bankerButton.id = "banker-button";
  bankerButton.textContent = "Banker";
  choice.appendChild(bankerButton);

  appArea.appendChild(table);

  playerButton.addEventListener("click", baccarat);
  bankerButton.addEventListener("click", baccarat);
};

playButton.addEventListener("click", startGame);
