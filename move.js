const runValue = 5
const changePosition = change_posiotion_in_table(document.getElementById("Character").style.top,document.getElementById("Character").style.left)
const x = 0
const y = 1


function try_collision(direction){
    console.log(player);
    let map = maps[player['position_map'][0]][player['position_map'][1]]
    let collision_blocks = ["water_vertical","water_horizontal",'block',"window",'wall',"water","water_2","water_left","water_merge","water_merge_2","water_right","waterfall","woda","woda_1","woda_2","woda_3","woda_4","wall_2","wall_3","ruins_2"]
    if(collision_blocks.includes(map[player['y']][player['x']]))  {
        if(direction == 'up')document.getElementById("Character").style.top = parseInt(document.getElementById("Character").style.top ) + (runValue*5) + "px"
        if(direction == 'down') document.getElementById("Character").style.top = parseInt(document.getElementById("Character").style.top ) - (runValue*5) + "px"
        if(direction == 'left') document.getElementById("Character").style.left = parseInt(document.getElementById("Character").style.left ) + (runValue*5) + "px"
        if(direction == 'right') document.getElementById("Character").style.left = parseInt(document.getElementById("Character").style.left ) - (runValue*5) + "px"
    }
    if(map[player['y']][player['x']] == "temple"){
        openBattle();
    }
}
function openBattle(){
    document.open("/index.html");
    document.write('<!doctype html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <link rel="icon" href="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=">\n' +
        '    <link rel="stylesheet" href="battlestyle.css">\n' +
        '    <script src="battle-logic.js"></script>\n' +
        '    <title>Battle</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div id="battlearena">\n' +
        '    <div id="Character">\n' +
        '       <img class="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" />\n' +
        '       <img id="Character-moves" class="Character_spritesheet pixelart face-down" src="static/sheet/_Idle.png" alt="Character" />\n' +
        '    </div>\n' +
        '    <div id="Sceleton">\n' +
        '        <img class="Sceleton_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" />\n' +
        '        <img id="Skeleton-moves" class="Sceleton_spritesheet pixelart face-down" src="static/sheet/Skeleton%20Idle.png" alt="Sceleton" />\n' +
        '    </div></div>\n' +
        '<div id="battlescore">\n' +
        '    <button id="button-attack" onclick="attackAnimation()">Attack</button>\n' +
        '    <button id="button-goaway" role="button">Go away</button>\n' +
        '    <div id="battleTable">\n' +
        '    <table>\n' +
        '        <tr>\n' +
        '            <th>Knight</th>\n' +
        '            <th>Skeleton</th>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <th id="characterHp"></th>\n' +
        '            <th id="SkeletonHp"></th>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <th id="characterAttack"></th>\n' +
        '            <th id="skeletonAttack"></th>\n' +
        '        </tr>\n' +
        '    </table>\n' +
        '    </div>\n' +
        '</div>\n' +
        '<script src="battle-game.js"></script>\n' +
        '</body>\n' +
        '</html>')
}

function charMove() {
    document.getElementById("Character-moves").src="static/sheet/_Run.png";
}
function charStop() {
    document.getElementById("Character-moves").src = "static/sheet/_Idle.png";
}
function up() {
    document.getElementById("Character").style.top = parseInt(document.getElementById("Character").style.top) - runValue + "px"
    try_collision("up")
    change_posiotion_in_table()
    if (parseInt(document.getElementById("Character").style.top) < -1270) {
        document.getElementById("Character").style.top = "-185px";
        player["position_map"][x] = player["position_map"][x] - 1
        change_map()
    }


}
function down() {
    document.getElementById("Character").style.top = parseInt(document.getElementById("Character").style.top ) + runValue + "px"
    try_collision('down')
    change_posiotion_in_table() //changePosiotion
    if (parseInt(document.getElementById("Character").style.top) > -185){
        document.getElementById("Character").style.top = "-1270px";
        player["position_map"][x] = player["position_map"][x]+1
        change_map()
    }
}

function left() {
    document.getElementById("Character").style.left = parseInt(document.getElementById("Character").style.left ) - runValue + "px"
    try_collision('left')
    change_posiotion_in_table()//changePosiotion
    if (parseInt(document.getElementById("Character").style.left) < -535) {
        document.getElementById("Character").style.left = "535px";
        player["position_map"][y] = player["position_map"][y] +  -1
        change_map()
    }
}
function right() {
    document.getElementById("Character").style.left = parseInt(document.getElementById("Character").style.left ) + runValue + "px";
    try_collision('right');
    change_posiotion_in_table() //        changePosiotion
    if (parseInt(document.getElementById("Character").style.left) > 535){
      document.getElementById("Character").style.left = "-535px";
        player["position_map"][y] = player["position_map"][y]+1
        change_map()
    }
}

function change_posiotion_in_table() {
    let left = parseInt(document.getElementById("Character").style.left)
    let top = parseInt(document.getElementById("Character").style.top)
    for (let i = 0; i < 11; i++) {
        if (left > (-560 + (i * 100)) && left < (-360 + (i * 100))) player['x'] = (i )
    }
    for (let i = 0; i < 11; i++) {
        if (top > (-1280 + (i * 100)) && top < (-1080 + (i * 100))) player['y'] = (i)
    }
}

function click_move() {
    const alias = {
        "uparrow": 38,
        "downarrow": 40,
        "leftarrow": 37,
        "rightarrow": 39
    }

    document.onkeydown = (e) => {
        e = e || window.event;
        if (e.keyCode === alias["uparrow"]) {up(changePosition, charMove())}
        else if (e.keyCode === alias["leftarrow"]) {left(changePosition, document.getElementById("Character-moves").src="static/sheet/_Runleft.png")}
        else if (e.keyCode === alias["rightarrow"]) {right(changePosition, charMove())}
        else if (e.keyCode === alias["downarrow"]) {down(null, charMove())}
    }
    document.onkeyup = (e) => {
        e = e || window.event;
        if (e.keyCode === alias["uparrow"]) {
            up(null, charStop())
        }else if (e.keyCode === alias["leftarrow"]){
            left(null, document.getElementById("Character-moves").src="static/sheet/_Idleleft.png")
        }else if (e.keyCode === alias["rightarrow"]){
            right(changePosition, charStop())
        }else if (e.keyCode === alias["downarrow"]){
            down(changePosition, charStop())
        }

    }
}
