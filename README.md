# Gacha-Game
var w = 0;
document.addEventListener('keydown',(event)=>{
  if (event.key === ".") {
    rarityWeightsMap.infinity.rare += 300
    console.log(rarityWeightsMap.infinity.rare)
  }else if (event.key === ","){
    rarityWeightsMap.infinity.rare -= 300  
    console.log(rarityWeightsMap.infinity.rare)
    
  }else if (event.key === 'p'){
    rarityWeightsMap.infinity.mythical += 300  
    console.log(rarityWeightsMap.infinity.mythical)
    
  }else if (event.key === 'o'){
    rarityWeightsMap.infinity.mythical -= 300  
    console.log(rarityWeightsMap.infinity.mythical)
    
  }else if (event.key === '='){
    w++;
    if(w >= 5){
      rarityWeightsMap.infinity.legendary += 10000  
      console.log(rarityWeightsMap.infinity.legendary)
    }
    return
  }
})