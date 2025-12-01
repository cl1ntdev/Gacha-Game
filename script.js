(function () {
  // --- CONFIGURATION ---
  const REEL_ITEM_COUNT = 100;
  const WINNING_ITEM_INDEX = 95; // Must be less than REEL_ITEM_COUNT
  const STATTRAK_CHANCE = 0.1; // 10% chance

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
    legendary: 3,
  };

  const rarity_INFINITY_Weights = {
    common: 5,
    uncommon: 6,
    rare: 450,
    mythical: 120,
    legendary: 5,
    infinity: 1,
  };

  const caseTiers = {
    normal: {
      allowedRarities: ["common", "uncommon", "rare", "mythical", "legendary"],
    },
    rare: {
      allowedRarities: [
        "common",
        "uncommon",
        ,
        "rare",
        "mythical",
        "legendary",
      ],
    },
    infinity: {
      allowedRarities: [
        "common",
        "uncommon",
        "rare",
        "mythical",
        "legendary",
        "infinity",
      ],
    },
  };

  let isSpinning = false;
  const liveFeed = [];

  // --- INITIALIZATION ---
  let caseType = "";
  let state = "none"
  function init() {
    openNormalCaseBtn.addEventListener("click", () => {
      ((caseType = "normal"), openCase(caseTiers.normal));
    });
    openRareCaseBtn.addEventListener("click", () => {
      caseType = "rare";
      openCase(caseTiers.rare);
    });
    openInfinityCaseBtn.addEventListener("click", () => {
      caseType = "infinity";
      openCase(caseTiers.infinity);
    });
    openPromoCaseBtn.addEventListener("click", () => {
      console.log(state)
      if(state === "none") {
        openInfinityCaseBtn.innerText = 'Use Infinity Ticket 5x Promo'
        openRareCaseBtn.innerText = 'Use Premium Ticket 5x Promo'
        openNormalCaseBtn.innerText = 'Use Normal Ticket 5x Promo'
        state = "promo";
      }else {
        openInfinityCaseBtn.innerText = ' Use Infinity Ticket (5 PHP)'
        openRareCaseBtn.innerText = ' Use Premium Ticket (10 PHP)'
        openNormalCaseBtn.innerText = ' Use Normal Ticket (15 PHP)'
        state = 'none' 
      }
    });
  
  }

  // --- CORE GAME LOGIC ---

  function openCase(caseTier) {
    if (isSpinning) return;
    isSpinning = true;
    setButtonsDisabled(true);

    const availableItems = items.filter((item) =>
      caseTier.allowedRarities.includes(item.rarity),
    );

    const winningItem = determineWinningItem(availableItems);
    console.log(availableItems);
    console.log(winningItem);
    buildAndAnimateReel(winningItem);

    reel.addEventListener(
      "transitionend",
      () => onSpinEnd(winningItem, caseTier),
      { once: true },
    );
  }

  function determineWinningItem(availableItems) {
    let winningItem = { ...getWeightedItem(availableItems) };

    // if (Math.random() < STATTRAK_CHANCE) {
    //   winningItem.name = `StatTrak™ ${winningItem.name}`;
    //   winningItem.value *= 5;
    //   winningItem.isStatTrak = true;
    // }
    return winningItem;
  }

  function getWeightedItem(itemPool) {
    // change rarityWeights
    switch (caseType) {
      case "normal":
        rarityWeights = rarity_NORMAL_Weights;
        break;
      case "rare":
        rarityWeights = rarity_PREMIUM_Weights;
        break;
      case "infinity":
        rarityWeights = rarity_INFINITY_Weights;
        break;
    }

    console.log(caseType);
    console.log(rarityWeights);

    const totalWeight = itemPool.reduce(
      (sum, item) => sum + (rarityWeights[item.rarity] || 0),
      0,
    );
    let randomNum = Math.random() * totalWeight;

    for (const item of itemPool) {
      const itemWeight = rarityWeights[item.rarity] || 0;
      if (randomNum < itemWeight) {
        return item;
      }
      randomNum -= itemWeight;
    }
    return itemPool[itemPool.length - 1];
  }

  
  let spins = 0;
  function onSpinEnd(winningItem, caseTier) {
    isSpinning = false;

    // for debug
    // if (winningItem != null) {
    //   updateLiveFeed(winningItem);
    //   setButtonsDisabled(false);
    //   setTimeout(() => openCase(caseTier), 500);
    //   return;
    // }
    if(state == 'promo'){
        
        if (winningItem.name.includes("Spin Again")) {
          setButtonsDisabled(false);
          setTimeout(() => openCase(caseTier), 500);
          return;
        }
      
      
        if(spins == 4){
          setButtonsDisabled(false);
          updateLiveFeed(winningItem);
          spins = 0;
          return
        }else{
          
          updateLiveFeed(winningItem);
          setButtonsDisabled(false);
          setTimeout(() => openCase(caseTier), 500);
          spins++;
          
        }
        console.log(spins)
        
        return;
    }
    
    if (winningItem.name.includes("Spin Again")) {
      setButtonsDisabled(false);
      setTimeout(() => openCase(caseTier), 500);
      return;
    }

    setButtonsDisabled(false);
    updateLiveFeed(winningItem);
    // showWonItemModal(winningItem);
  }

  // --- UI AND ANIMATION ---

  function buildAndAnimateReel(winningItem) {
    reel.innerHTML = "";
    reel.style.transition = "none";
    reel.style.transform = "translateX(0)";

    const reelItems = [];
    for (let i = 0; i < REEL_ITEM_COUNT; i++) {
      reelItems.push(getWeightedItem(items));
    }
    reelItems[WINNING_ITEM_INDEX] = winningItem;

    reelItems.forEach((item) => {
      reel.appendChild(createItemElement(item));
    });

    void reel.offsetWidth;

    reel.style.transition = "transform 7s cubic-bezier(0.15, 0.5, 0.3, 1)";
    const itemWidth = reel.firstElementChild.offsetWidth;
    const containerWidth = reel.parentElement.offsetWidth;
    const offset = containerWidth / 2 - itemWidth / 2;
    const winningPosition = WINNING_ITEM_INDEX * itemWidth - offset;
    reel.style.transform = `translateX(-${winningPosition}px)`;
  }

  function setButtonsDisabled(isDisabled) {
    openNormalCaseBtn.disabled = isDisabled;
    openRareCaseBtn.disabled = isDisabled;
    openInfinityCaseBtn.disabled = isDisabled;
  }

  function showWonItemModal(item) {
    wonItemContainer.innerHTML = `
      <div class="won-item-modal-content">
        <h2>You Won:</h2>
        <div class="modal-item-display">
            ${createItemElement(item).outerHTML}
        </div>
        <button id="close-modal-btn">Play Again</button>
      </div>
    `;
    wonItemContainer.style.display = "flex";

    const closeModalBtn = document.getElementById("close-modal-btn");
    closeModalBtn.addEventListener("click", hideWonItemModal, { once: true });
    setTimeout(() => {
      document.addEventListener("click", handleOutsideModalClick, {
        once: true,
      });
    }, 50);
  }

  function hideWonItemModal() {
    wonItemContainer.style.display = "none";
    document.removeEventListener("click", handleOutsideModalClick);
  }

  function handleOutsideModalClick(event) {
    const modalContent = document.querySelector(".won-item-modal-content");
    if (modalContent && !modalContent.contains(event.target)) {
      hideWonItemModal();
    } else {
      document.addEventListener("click", handleOutsideModalClick, {
        once: true,
      });
    }
  }

  function updateLiveFeed(item) {
    liveFeed.unshift(item);
    if (liveFeed.length > 10) {
      liveFeed.pop();
    }

    liveFeedList.innerHTML = "";
    liveFeed.forEach((feedItem) => {
      const li = document.createElement("li");
      const rarityClass = feedItem.rarity.toLowerCase().replace(" ", "-");
      const nameSpan = `<span class="${rarityClass} ${
        feedItem.isStatTrak ? "stattrack" : ""
      }">${feedItem.name}</span>`;

      li.innerHTML = `
          <img src="${
            feedItem.image || " "
          }" alt="${feedItem.name}" width="40" style="vertical-align: middle; margin-right: 10px;">
          ${nameSpan}
        `;
      liveFeedList.appendChild(li);
    });
  }

  function createItemElement(item) {
    const itemElement = document.createElement("div");
    const rarityClass = item.rarity.toLowerCase().replace(" ", "-");
    itemElement.className = `item ${rarityClass}`;

    const nameSpan = `<span class="${
      item.isStatTrak ? "stattrack" : ""
    }">${item.name}</span>`;

    itemElement.innerHTML = `
        <img src="${item.image || " "}" alt="${item.name}">
        ${nameSpan}
    `;
    return itemElement;
  }

  init();
})();
