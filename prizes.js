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

  const rarityWeights = {
    common: 7500, // Increased
    uncommon: 2000,
    rare: 450, // Decreased
    mythical: 50,  // Decreased
    legendary: 10, // Decreased
    ancient: 4,    // Decreased
    "exceedingly-rare": 1,
    infinity: 1,
  };

  const chanceList = document.getElementById("chance-list");

  function displayPrizePool() {
    if (!chanceList) return;
    chanceList.innerHTML = "";

    const totalWeight = items.reduce(
      (sum, item) => sum + (rarityWeights[item.rarity] || 0),
      0
    );

    const sortedItems = [...items].sort(
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

  displayPrizePool();
})();
