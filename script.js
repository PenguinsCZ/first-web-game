let scroll = 0;
let oldscroll = 0;
let iteration = 1;
let hearts = 3;

//Detect up and down movement
window.addEventListener('scroll', function (e) {

    // Get the new Value
    scroll = window.scrollY;

    //Subtract the two and conclude
    if (oldscroll - scroll < 0) {
        document.getElementById("player").style.top = `${scroll}px`;
    } else if (oldscroll - scroll > 0) {
        document.getElementById("player").style.top = `${scroll}px`;
    }
    // Update the old value
    oldscroll = scroll;
})

//The actual game
function play(gamemode) {
    hearts = 3
    document.getElementById("heartstatus").innerHTML = `${hearts} ❤️`
    console.log("Game started")
    document.querySelectorAll(".tree").forEach(tree => {
        tree.remove()
    })
    document.getElementById("menu").remove()

    //Main game loop
    let gameloop = window.setInterval(function () {
        document.getElementById("meters").innerHTML = `Score: ${iteration} m`
        var rect = document.getElementById("player").getBoundingClientRect();
        if (document.getElementById("gamefield").classList.contains("animation")) {
            document.getElementById("gamefield").classList.remove("animation")
        }

        //Generate random square position
        var topoffset = Math.floor(Math.random() * 27)
        if ((gamemode == 'normal' && iteration % 2 === 0) || gamemode == "expert") { document.getElementById("gamefield").innerHTML += `<div class="tree hiton" style="top:${topoffset * 33}px"> ` }

        //Check for each tree
        document.querySelectorAll(".tree").forEach(tree => {

            //Gets data about each tree
            var top = tree.computedStyleMap().get('left').value;
            tree.style.left = `${top - 33}px`
            treecoords = tree.getBoundingClientRect()

            //Collision detection
            if (treecoords.left < 160 &&
                treecoords.left + 33 > 60 &&
                treecoords.top < rect.top + 100 &&
                33 + treecoords.top > rect.top && tree.classList.contains("hiton")) {

                //Getting hit animation
                document.getElementById("gamefield").classList.add("animation")
                tree.classList.remove("hiton")

                //Updates the hearts value
                hearts--
                document.getElementById("heartstatus").innerHTML = `${hearts} ❤️`
                
                //Death detection
                if (hearts === 0) {
                    clearInterval(gameloop)

                    //Creates a new menu
                    const node = document.createElement("div")
                    node.innerHTML = `<div class="h1div">
                <h1>Dodge the trees!</h1>
            </div>
            <div><button class="playbutton1" onclick="javascript:play('normal')">Try again! (Normal)</button>
            <button class="playbutton2" onclick="javascript:play('expert')">Try again! (Expert)</button></div>`
                    node.classList.add("menu")
                    node.id = "menu"
                    document.getElementById("gamefield").appendChild(node)
                    iteration = 0
                }
            }
            if (top < 0) {
                tree.remove()
            }
        }
        )
        iteration++
    }, 300);
}