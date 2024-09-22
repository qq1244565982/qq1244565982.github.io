
let quarkCount = 0;
let leptonCount = 0;
let electronCount = 0;
let bosonCount = 0;
let baryonCount = 0;
let hyperonCount = 0;
let dustCount = 1; // 尘埃初始值设置为1
let electronProductionRate = 1; // 初始电子生产率
let electronUpgradeCost = 10;
let electronLevel = 1; // 电子等级
let dustLevel = 1; // 尘埃等级
let dustUpgradeCost = 10000; // 尘埃升级初始消耗

document.getElementById('collectButton').onclick = function() {
    quarkCount += Math.floor(Math.random() * 10) + 1;
    document.getElementById('quarkCount').innerText = quarkCount;
};

document.getElementById('synthesizeLeptonButton').onclick = function() {
    if (quarkCount >= 10 && electronCount >= 1) {
        quarkCount -= 10;
        electronCount -= 1;
        leptonCount += 1;
        updateDisplay();
    } else {
        alert("需要更多夸克或电子合成轻子！");
    }
};

document.getElementById('oneClickSynthesizeLeptonButton').onclick = function() {
    let leptonToSynthesize = Math.min(Math.floor(quarkCount / 10), electronCount);
    if (leptonToSynthesize > 0) {
        quarkCount -= leptonToSynthesize * 10;
        electronCount -= leptonToSynthesize;
        leptonCount += leptonToSynthesize;
        updateDisplay();
    } else {
        alert("需要更多夸克或电子合成轻子！");
    }
};

document.getElementById('upgradeElectronButton').onclick = function() {
    if (quarkCount >= electronUpgradeCost) {
        quarkCount -= electronUpgradeCost;
        electronLevel += 1; // 升级电子等级
        electronUpgradeCost *= 10;
        updateDisplay();
    } else {
        alert("需要更多夸克进行升级！");
    }
};

document.getElementById('upgradeDustButton').onclick = function() {
    if (quarkCount >= dustUpgradeCost) {
        quarkCount -= dustUpgradeCost;
        dustLevel += 1; // 升级尘埃等级
        dustUpgradeCost *= 10; // 每次升级提升10倍消耗
        electronProductionRate += 1; // 每级提升电子产量倍数
        updateDisplay();
    } else {
        alert("需要更多夸克进行尘埃升级！");
    }
};

document.getElementById('synthesizeBosonButton').onclick = function() {
    if (leptonCount >= 100 && electronCount >= 1) {
        leptonCount -= 100;
        electronCount -= 1;
        bosonCount += 1;
        updateDisplay();
    } else {
        alert("需要更多轻子或电子合成玻色子！");
    }
};

document.getElementById('oneClickSynthesizeBosonButton').onclick = function() {
    let bosonToSynthesize = Math.min(Math.floor(leptonCount / 100), electronCount);
    if (bosonToSynthesize > 0) {
        leptonCount -= bosonToSynthesize * 100;
        electronCount -= bosonToSynthesize;
        bosonCount += bosonToSynthesize;
        updateDisplay();
    } else {
        alert("需要更多轻子或电子合成玻色子！");
    }
};

document.getElementById('synthesizeBaryonButton').onclick = function() {
    if (bosonCount >= 1000 && electronCount >= 1) {
        bosonCount -= 1000;
        electronCount -= 1;
        baryonCount += 1;
        updateDisplay();
    } else {
        alert("需要更多玻色子或电子合成重子！");
    }
};

document.getElementById('oneClickSynthesizeBaryonButton').onclick = function() {
    let baryonToSynthesize = Math.min(Math.floor(bosonCount / 1000), electronCount);
    if (baryonToSynthesize > 0) {
        bosonCount -= baryonToSynthesize * 1000;
        electronCount -= baryonToSynthesize;
        baryonCount += baryonToSynthesize;
        updateDisplay();
    } else {
        alert("需要更多玻色子或电子合成重子！");
    }
};

document.getElementById('synthesizeHyperonButton').onclick = function() {
    if (baryonCount >= 10000 && electronCount >= 1) {
        baryonCount -= 10000;
        electronCount -= 1;
        hyperonCount += 1;
        updateDisplay();
    } else {
        alert("需要更多重子或电子合成超重子！");
    }
};

document.getElementById('oneClickSynthesizeHyperonButton').onclick = function() {
    let hyperonToSynthesize = Math.min(Math.floor(baryonCount / 10000), electronCount);
    if (hyperonToSynthesize > 0) {
        baryonCount -= hyperonToSynthesize * 10000;
        electronCount -= hyperonToSynthesize;
        hyperonCount += hyperonToSynthesize;
        updateDisplay();
    } else {
        alert("需要更多重子或电子合成超重子！");
    }
};

document.getElementById('saveButton').onclick = function() {
    saveGame();
};

document.getElementById('resetButton').onclick = function() {
    if (confirm("您确定要重置游戏吗？这将清除所有进度！")) {
        resetGame();
    }
};

setInterval(function() {
    // 根据电子等级计算电子生产量
    electronCount += 1 + (electronLevel * electronLevel); // 电子生产量 = 初始值 + 等级 * 等级
    document.getElementById('electronCount').innerText = electronCount;

    // 每个轻子生产一个夸克
    if (leptonCount > 0) {
        quarkCount += leptonCount; // 每秒根据轻子的数量生产夸克
        document.getElementById('quarkCount').innerText = quarkCount;
    }
    // 每个玻色子生产一个轻子
    if (bosonCount > 0) {
        leptonCount += bosonCount; // 每秒根据玻色子的数量生产轻子
        document.getElementById('leptonCount').innerText = leptonCount;
    }
    // 每个重子生产一个玻色子
    if (baryonCount > 0) {
        bosonCount += baryonCount; // 每秒根据重子的数量生产玻色子
        document.getElementById('bosonCount').innerText = bosonCount;
    }
}, 1000);

// 每100秒自动保存游戏
setInterval(function() {
    saveGame();
}, 100000); // 100秒

function updateDisplay() {
    document.getElementById('quarkCount').innerText = quarkCount;
    document.getElementById('leptonCount').innerText = leptonCount;
    document.getElementById('electronCount').innerText = electronCount;
    document.getElementById('bosonCount').innerText = bosonCount;
    document.getElementById('baryonCount').innerText = baryonCount;
    document.getElementById('hyperonCount').innerText = hyperonCount;
    document.getElementById('dustCount').innerText = dustCount; // 更新尘埃数量
    document.getElementById('dustLevel').innerText = dustLevel; // 更新尘埃等级
    document.getElementById('electronUpgradeCost').innerText = electronUpgradeCost;
    document.getElementById('dustUpgradeCost').innerText = dustUpgradeCost; // 更新尘埃升级消耗
}

function saveGame() {
    const gameState = {
        quarkCount,
        leptonCount,
        electronCount,
        bosonCount,
        baryonCount,
        hyperonCount,
        dustCount,
        electronProductionRate,
        electronUpgradeCost,
        electronLevel, // 保存电子等级
        dustLevel,
        dustUpgradeCost // 保存尘埃升级消耗
    };
    localStorage.setItem('particleIdleGame', JSON.stringify(gameState));
}

function loadGame() {
    const savedState = localStorage.getItem('particleIdleGame');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        quarkCount = gameState.quarkCount;
        leptonCount = gameState.leptonCount;
        electronCount = gameState.electronCount;
        bosonCount = gameState.bosonCount;
        baryonCount = gameState.baryonCount;
        hyperonCount = gameState.hyperonCount;
        dustCount = gameState.dustCount; // 加载尘埃数量
        electronProductionRate = gameState.electronProductionRate;
        electronUpgradeCost = gameState.electronUpgradeCost;
        electronLevel = gameState.electronLevel; // 加载电子等级
        dustLevel = gameState.dustLevel; // 加载尘埃等级
        dustUpgradeCost = gameState.dustUpgradeCost; // 加载尘埃升级消耗

        updateDisplay(); // 自动更新显示
    }
}

function resetGame() {
    quarkCount = 0;
    leptonCount = 0;
    electronCount = 0;
    bosonCount = 0;
    baryonCount = 0;
    hyperonCount = 0;
    dustCount = 1; // 重置尘埃初始值为1
    electronProductionRate = 1;
    electronUpgradeCost = 10;
    electronLevel = 1; // 重置电子等级
    dustLevel = 1; // 重置尘埃等级
    dustUpgradeCost = 10000; // 重置尘埃升级消耗

    updateDisplay();
    alert("游戏已重置！");
}

// 页面加载时自动加载游戏
window.onload = function() {
    loadGame();
};
