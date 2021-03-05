// init dom
window.onload = function() {
    document.getElementById("mainCounter").innerHTML = '';
    for (var i = 0; i < 5; i++) {
        var dNode = document.createElement("span");
        dNode.classList.add("digitNode");
        dNode.style.left = `${20*i}%`;
        document.getElementById("mainCounter").append(dNode);
        for (var j = 0; j < 10; j++) {
            var nNode = document.createElement("div");
            nNode.innerHTML = j;
            nNode.style.top = `${1/3*100*j}vh`
            nNode.classList.add("numberNode");
            dNode.append(nNode);
        } // make number node one by one
    } // make digit node
    
    document.onclick = function(){game.time--;};
}

// main
function runGameTick(dt = 0) {
    game.bottomTime -= dt/1000;
    [...document.getElementsByClassName('digitNode')].forEach((ele, idx) => {ele.style.top = `${-Math.ceil(game.bottomTime).toString()[idx]*1/3*100+30}vh`});
}

// save&load
savePoint = "spotky86400";
tempGame = {
    time: 86400,
    bottomTime: 86400,
    startTime: new Date().getTime(),
    lastTime: new Date().getTime(),
};
function load() {
    game = JSON.parse(localStorage[savePoint] || "{}");
    for (var i in tempGame) if (typeof game[i] == "undefined") game[i] = tempGame[i];
}
function save() {
    localStorage[savePoint] = JSON.stringify(game);
}

// init game
load();

var startTime = new Date().getTime();
var uptimeChecker = () => {return new Date().getTime() - startTime};

var deltaTime;
gameInterval = setInterval( function() {
    if (uptimeChecker() > 5000) document.title = game.time;
    deltaTime = new Date().getTime() - game.lastTime;
    runGameTick(deltaTime);
    game.lastTime = new Date().getTime();
}, 33);
saveInterval = setInterval( function() {
    save();
}, 5000);