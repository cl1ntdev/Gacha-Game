(function () {
  // --- GAME DATA (Copied from script.js) ---
  const items = [
    {
      name: "Champi 1x",
      rarity: "common",
      value: 0.5,
      image: "images/Champi.png",
    },
    {
      name: "Champi 2x",
      rarity: "uncommon",
      value: 0.5,
      image: "images/Champi.png",
    },
    {
      name: "Frutos 1x",
      rarity: "common",
      value: 0.7,
      image: "images/Frutos.png",
    },
    {
      name: "Frutos 2x",
      rarity: "uncommon",
      value: 0.7,
      image: "images/Frutos.png",
    },
    {
      name: "Icool 1x",
      rarity: "common",
      value: 0.7,
      image: "images/Icool.png",
    },
    {
      name: "Icool 2x",
      rarity: "uncommon",
      value: 0.7,
      image: "images/Icool.png",
    },
    {
      name: "Champi 3x",
      rarity: "rare",
      value: 0.7,
      image: "images/Champi.png",
    },
    {
      name: "Frutos 3x",
      rarity: "rare",
      value: 0.7,
      image: "images/Frutos.png",
    },
    {
      name: "Icool 3x",
      rarity: "rare",
      value: 0.7,
      image: "images/Icool.png",
    },
    {
      name: "Sticker of Choice",
      rarity: "mythical",
      value: 15,
      image: "images/Sticker.png",
    },
    {
      name: "Green Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Green_Penguin.png",
    },
    {
      name: "Black Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Black_Penguin.png",
    },
    {
      name: "Purple Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Purple_Penguin.png",
    },
    {
      name: "Red Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Red_Penguin.png",
    },
    {
      name: "Pink Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Pink_Penguin.png",
    },
    {
      name: "Orange Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Orange_Penguin.png",
    },
    {
      name: "Brown Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Brown_Penguin.png",
    },
    {
      name: "Blue Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Blue_Penguin.png",
    },
    {
      name: "Sky Blue Penguin",
      rarity: "legendary",
      value: 30,
      image: "images/Sky_Blue_Penguin.png",
    },
    {
      name: "Bouquet of Flowers",
      rarity: "legendary",
      value: 30,
      image: "images/Bouquet.png",
    },
    {
      name: "100 Pesos Cash",
      rarity: "infinity",
      value: 10000,
      image: "images/100 Pesos.png",
    },
  ];

  let rarity_NORMAL_Weights = {
    common: 3000,
    uncommon: 2000,
    rare: 450,
    mythical: 1,
    legendary: 1,
  };
  let rarityWeights = rarity_NORMAL_Weights;

  const rarity_PREMIUM_Weights = {
    common: 200,
    uncommon: 300,
    rare: 700,
    mythical: 120,
    legendary: 6,
  };

  const rarity_INFINITY_Weights = {
    common: 5,
    uncommon: 6,
    rare: 450,
    mythical: 120,
    legendary: 10,
    infinity: 1,
  };

  const chanceList = document.getElementById("chance-list");
  const normalCaseBtn = document.getElementById("normal-case-btn");
  const premiumCaseBtn = document.getElementById("premium-case-btn");
  const infinityCaseBtn = document.getElementById("infinity-case-btn");

  function displayPrizePool(rarityWeights) {
    if (!chanceList) return;
    chanceList.innerHTML = "";

    const allowedRarities = Object.keys(rarityWeights);
    const filteredItems = items.filter(item => allowedRarities.includes(item.rarity));

    const totalWeight = filteredItems.reduce(
      (sum, item) => sum + (rarityWeights[item.rarity] || 0),
      0
    );

    const sortedItems = [...filteredItems].sort(
      (a, b) =>
        (rarityWeights[b.rarity] || 0) - (rarityWeights[a.rarity] || 0)
    );

    sortedItems.forEach((item) => {
      const probability = (rarityWeights[item.rarity] / totalWeight) * 100;
      const chancePercent = probability.toFixed(4);

      const li = document.createElement("li");
      const rarityClass = item.rarity.toLowerCase().replace(" ", "-");
      li.className = `prize-card ${rarityClass}`;
      li.innerHTML = `
          <div class="prize-card-img-container">
              <img src="${item.image || " "}" alt="${
        item.name
      }" class="prize-card-img">
          </div>
          <div class="card-details">
              <span class="item-name">${item.name}</span>
              <span class="item-rarity">Rarity: ${item.rarity}</span>
              <span class="item-chance">~${chancePercent}%</span>
          </div>
      `;
      chanceList.appendChild(li);
    });
  }

  normalCaseBtn.addEventListener("click", () => displayPrizePool(rarity_NORMAL_Weights));
  premiumCaseBtn.addEventListener("click", () => displayPrizePool(rarity_PREMIUM_Weights));
  infinityCaseBtn.addEventListener("click", () => displayPrizePool(rarity_INFINITY_Weights));

  // Initially display the normal case prize pool
  displayPrizePool(rarity_NORMAL_Weights);
})();
