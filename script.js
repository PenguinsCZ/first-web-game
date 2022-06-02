let scroll = 0;
let oldscroll = 0;
let iteration = 1;
let hearts = 3;

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

let gameloop = window.setInterval(function () {
    var rect = document.getElementById("player").getBoundingClientRect();
    if(document.getElementById("gamefield").classList.contains("animation")){
        document.getElementById("gamefield").classList.remove("animation")
    }
/* */
    var topoffset = Math.floor(Math.random() * 27)
   /*  if (iteration % 2 === 0) */{ document.getElementById("gamefield").innerHTML += `<div class="tree hiton" style="top:${topoffset * 33}px"> ` }

    document.querySelectorAll(".tree").forEach(tree => {

        var top = tree.computedStyleMap().get('left').value;
        tree.style.left = `${top - 33}px`

        treecoords = tree.getBoundingClientRect()

        if (treecoords.left < 160 &&
            treecoords.left + 33 > 60 &&
            treecoords.top < rect.top + 100 &&
            33 + treecoords.top > rect.top && tree.classList.contains("hiton")) {

            document.getElementById("gamefield").classList.add("animation")
            tree.classList.remove("hiton")
            hearts--
            document.getElementById("heartstatus").innerHTML = `${hearts} ❤️`

            if(hearts === 0){   
                clearInterval(gameloop)
            }
        }

        if (top < 0) {
            tree.remove()

        }
    }

    )
    iteration++

}, 300);




