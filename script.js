(function () {
  // --- CONFIGURATION ---
  const REEL_ITEM_COUNT = 100;
  const WINNING_ITEM_INDEX = 95;

  // --- DOM ELEMENT REFERENCES ---
  const reel = document.getElementById("reel");
  const openNormalCaseBtn = document.getElementById("open-normal-case-btn");
  const openRareCaseBtn = document.getElementById("open-rare-case-btn");
  const openInfinityCaseBtn = document.getElementById("open-infinity-case-btn");
  const wonItemContainer = document.getElementById("won-item-container");
  const liveFeedList = document.getElementById("live-feed-list");
  const openPromoCaseBtn = document.querySelector(".promo-case");

  // --- GAME DATA ---
  const items = [
    { name: "Champi 1x", rarity: "common", value: 0.5, image: "images/Champi.png" },
    { name: "Champi 2x", rarity: "uncommon", value: 0.5, image: "images/Champi.png" },
    { name: "Frutos 1x", rarity: "common", value: 0.7, image: "images/Frutos.png" },
    { name: "Frutos 2x", rarity: "uncommon", value: 0.7, image: "images/Frutos.png" },
    { name: "Icool 1x", rarity: "common", value: 0.7, image: "images/Icool.png" },
    { name: "Icool 2x", rarity: "uncommon", value: 0.7, image: "images/Icool.png" },
    // { name: "Champi 3x", rarity: "rare", value: 0.7, image: "images/Champi.png" },
    // { name: "Frutos 3x", rarity: "rare", value: 0.7, image: "images/Frutos.png" },
    // { name: "Icool 3x", rarity: "rare", value: 0.7, image: "images/Icool.png" },
    { name: "Sticker Art", rarity: "rare", value: 15, image: "images/Sticker.png" },
    { name: "Sticker of Choice", rarity: "mythical", value: 15, image: "images/Sticker.png" },
    { name: "Green Penguin", rarity: "legendary", value: 30, image: "images/Green_Penguin.png" },
    { name: "Black Penguin", rarity: "legendary", value: 30, image: "images/Black_Penguin.png" },
    { name: "Purple Penguin", rarity: "legendary", value: 30, image: "images/Purple_Penguin.png" },
    { name: "Red Penguin", rarity: "legendary", value: 30, image: "images/Red_Penguin.png" },
    { name: "Pink Penguin", rarity: "legendary", value: 30, image: "images/Pink_Penguin.png" },
    { name: "Orange Penguin", rarity: "legendary", value: 30, image: "images/Orange_Penguin.png" },
    { name: "Brown Penguin", rarity: "legendary", value: 30, image: "images/Brown_Penguin.png" },
    { name: "Blue Penguin", rarity: "legendary", value: 30, image: "images/Blue_Penguin.png" },
    { name: "Sky Blue Penguin", rarity: "legendary", value: 30, image: "images/Sky_Blue_Penguin.png" },
    { name: "Bouquet of Flowers", rarity: "legendary", value: 30, image: "images/Bouquet.png" },
    { name: "100 Pesos Cash", rarity: "infinity", value: 10000, image: "images/100 Pesos.png" },
  ];

  // Rarity weights per case type
  const rarityWeightsMap = {
    normal: {
      common: 3000,
      uncommon: 2000,
      rare: 450,
      mythical: 300,
      legendary: 1,
    },
    rare: {
      common: 200,
      uncommon: 200,
      rare: 850,
      mythical: 600,
      legendary: 3,
    },
    infinity: {
      common: 5,
      uncommon: 6,
      rare: 300,
      mythical: 790,
      legendary: 5,
      infinity: 1,
    },
  };

  let caseType = "";
  let isSpinning = false;
  let liveFeed = [];
  let promoState = "none";
  let spins = 0;

  function init() {
    openNormalCaseBtn.addEventListener("click", () => {
      caseType = "normal";
      openCase();
    });

    openRareCaseBtn.addEventListener("click", () => {
      caseType = "rare";
      openCase();
    });

    openInfinityCaseBtn.addEventListener("click", () => {
      caseType = "infinity";
      openCase();
    });

    openPromoCaseBtn.addEventListener("click", togglePromoMode);
  }

  function togglePromoMode() {
    if (promoState === "none") {
      openInfinityCaseBtn.innerText = "Use Infinity Ticket 5x Promo";
      openRareCaseBtn.innerText = "Use Premium Ticket 5x Promo";
      openNormalCaseBtn.innerText = "Use Normal Ticket 5x Promo";
      promoState = "promo";
    } else {
      openInfinityCaseBtn.innerText = " Use Infinity Ticket (5 PHP)";
      openRareCaseBtn.innerText = " Use Premium Ticket (10 PHP)";
      openNormalCaseBtn.innerText = " Use Normal Ticket (15 PHP)";
      promoState = "none";
    }
  }

  function openCase() {
    console.log(caseType)
    if (isSpinning) return;

    isSpinning = true;
    setButtonsDisabled(true);

    const winningItem = pickWeightedItem(items, rarityWeightsMap[caseType]);
    console.log(winningItem)
    buildAndAnimateReel(winningItem);

    reel.addEventListener("transitionend", () => onSpinEnd(winningItem), {
      once: true,
    });
  }

  /** PICK WINNING ITEM BASED ON WEIGHTED RARITY */
  function pickWeightedItem(pool, weights) {
    const totalWeight = pool.reduce(
      (sum, item) => sum + (weights[item.rarity] || 0),
      0
    );
    let random = Math.random() * totalWeight;

    for (const item of pool) {
      const weight = weights[item.rarity] || 0;
      if (random < weight) return item;
      random -= weight;
    }
    return pool[pool.length - 1];
  }

  /** REEL SPINS THROUGH ALL ITEMS RANDOMLY */
  function buildAndAnimateReel(winningItem) {
    reel.innerHTML = "";
    reel.style.transition = "none";
    reel.style.transform = "translateX(0)";

    // Fill the reel with completely random items (ALL items appear)
    const reelItems = [];
    for (let i = 0; i < REEL_ITEM_COUNT; i++) {
      reelItems.push(items[Math.floor(Math.random() * items.length)]);
    }

    // Insert the guaranteed winning item
    reelItems[WINNING_ITEM_INDEX] = winningItem;
    
    // ADD ITEMS TO DOM
    reelItems.forEach((item) => {
      reel.appendChild(createItemElement(item));
    });

    // Force repaint
    void reel.offsetWidth;

    // Animate
    reel.style.transition = "transform 7s cubic-bezier(0.15, 0.5, 0.3, 1)";
    const itemWidth = reel.firstElementChild.offsetWidth;
    const containerWidth = reel.parentElement.offsetWidth;
    const offset = containerWidth / 2 - itemWidth / 2;
    const winningPosition = WINNING_ITEM_INDEX * itemWidth - offset;

    reel.style.transform = `translateX(-${winningPosition}px)`;
  }

  function onSpinEnd(winningItem) {
    isSpinning = false;

    if (promoState === "promo") {
      if (spins === 4) {
        updateLiveFeed(winningItem);
        spins = 0;
        setButtonsDisabled(false);
        return;
      }

      updateLiveFeed(winningItem);
      spins++;
      setButtonsDisabled(false);
      setTimeout(() => openCase(), 400);
      return;
    }

    updateLiveFeed(winningItem);
    setButtonsDisabled(false);
  }

  function createItemElement(item) {
    const div = document.createElement("div");
    div.className = `item ${item.rarity}`;
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name}</span>
    `;
    return div;
  }

  function updateLiveFeed(item) {
    liveFeed.unshift(item);
    if (liveFeed.length > 10) liveFeed.pop();

    liveFeedList.innerHTML = liveFeed
      .map(
        (i) => `
        <li>
          <img src="${i.image}" width="40">
          <span class="${i.rarity}">${i.name}</span>
        </li>
      `
      )
      .join("");
  }

  function setButtonsDisabled(disabled) {
    openNormalCaseBtn.disabled = disabled;
    openRareCaseBtn.disabled = disabled;
    openInfinityCaseBtn.disabled = disabled;
  }

  init();
})();
