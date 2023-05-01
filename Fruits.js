const FRUITS = {
  "Banana": 5,
  "Orange": 1,
  "Mango": 0.5
};

const MAX_FRUITS = 100;
const MAX_COST = 100;

const combinations = [];

for (let bananaCount = 0; bananaCount <= MAX_FRUITS; bananaCount++) {
  for (let orangeCount = 0; orangeCount <= MAX_FRUITS - bananaCount; orangeCount++) {
    let mangoCount = MAX_FRUITS - bananaCount - orangeCount;
    let cost = (bananaCount * FRUITS["Banana"]) + (orangeCount * FRUITS["Orange"]) + (mangoCount * FRUITS["Mango"]);
    if (cost === MAX_COST) {
      combinations.push({
        "Banana": bananaCount,
        "Orange": orangeCount,
        "Mango": mangoCount
      });
    }
  }
}

console.log(combinations);
