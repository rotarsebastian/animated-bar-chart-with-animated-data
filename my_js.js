//Global variable to hold our JSON, and is it is a list of bars I named it bars!
let bars;

// Wait for the DOMcontent to load (https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)  then go ahead and call getJOSN

document.addEventListener("DOMContentLoaded", getJSON)



// Async function means that you can use "await" to await an event
async function getJSON() {
    // Await that the json is loaded, then go on
    let jonOBJ = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1QNJVbaDraIlFVbXcwiJHs0cKTisunb_DOBQw4n0zcvU");
    // Await that the json is put in to the bars variable
    bars = await jonOBJ.json();
    // For each takes each element in our json and does something to them.
    // Each element is in this case represented by "eachbar" and we also have an iterator going
    // counting from zero and op enabling us to point at our box classes 1 to 6,
    let myWidth = 50;
    let svgns = "http://www.w3.org/2000/svg";
    bars.forEach((eachBar, i) => {
        // Here we ask Tweenlite to tween box0 to box 5 with an elastic ease and a one second duration. Try to fiddle wit the duration!
        let mySvg = document.querySelector(".mySvg");
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, "x", myWidth);
        rect.setAttributeNS(null, "y", 0);
        rect.setAttributeNS(null, "class", "box box" + i);
        rect.setAttributeNS(null, "width", "10");
        rect.setAttributeNS(null, "height", 0);
        rect.setAttributeNS(null, "fill", `hsl(352, 71%, ${(i / 1.25) + 77}%)`);



        let text = document.createElementNS(svgns, 'text');
        text.setAttributeNS(null, "x", 0);
        text.setAttributeNS(null, "y", 0);
        text.setAttributeNS(null, "class", "text" + i);

        let dataText = document.createElementNS(svgns, 'text');
        dataText.setAttributeNS(null, "x", 0);
        dataText.setAttributeNS(null, "y", 0);
        dataText.setAttributeNS(null, "class", "data-text data-text" + i);

        mySvg.appendChild(rect);
        mySvg.appendChild(text);
        mySvg.appendChild(dataText);


        TweenLite.to(".box" + i, 1.5, {
            attr: {
                // the property we are tweening is the height of our box. We get the height from the JSON: "numberofpersons". It's divided by two as to not go out of bounds. A percentage calculation could be added here.
                height: eachBar.users / 12,
                //x : width,
                //  a one second delay is added and multiplied by i to get the bars to animate one after the other try to change this, and see what happens. 
            }, delay: 0.05 * i,
            //Easing, here elastic. Make easing experiments here: https://greensock.com/ease-visualizer.

            ease: Circ.easeOut, y: -500
        });

        // place them on the x axis (which is now rotated by 90 degrees)

        // Here we take our text0 to text5 rotatet them
        text.setAttribute("transform", "rotate(90)");
        // place them on the x axis (which is now rotated by 90 degrees)
        text.setAttribute("x", "205");
        // distributing the on the y axis (which is now also rotated by 90 degrees)
        text.setAttribute("y", (-13 * i) - 53);
        // Here we set the names of our bars. We get the names from JSON: "bar".
        text.textContent = eachBar.socialnetworks;
        text.readOnly = true;



        // Here we take our text0 to text5 rotatet them
        dataText.setAttribute("transform", "rotate(90)");
        // place them on the x axis (which is now rotated by 90 degrees)
        dataText.setAttribute("x", "184");
        // distributing the on the y axis (which is now also rotated by 90 degrees)
        dataText.setAttribute("y", (-13 * i) - 53);
        // Here we set the names of our bars. We get the names from JSON: "bar".
        dataText.textContent = eachBar.users;

        dataText.style.display = "none";

        rect.setAttributeNS(null, "onmouseover", "showDataOnHover(this)");
        rect.setAttributeNS(null, "onmouseout", "hideDataOnHover(this)");

        dataText.setAttributeNS(null, "onmouseover", "getOpacityForBar(this)");
        dataText.setAttributeNS(null, "onmouseout", "hideOpacityForBar(this)");

        myWidth = myWidth + 13;

    })


}

function getOpacityForBar(myBar) {
    let nums = document.querySelectorAll(".box");
    let numsArray = Array.from(nums);
    for (let i = 0; i < numsArray.length; i++) {
        if (((myBar.textContent) / 12).toFixed(1) == (numsArray[i].height.baseVal.value).toFixed(1)) {
            numsArray[i].style.opacity = ".66";
        }

    }
}

function hideOpacityForBar(myBar) {
    let nums = document.querySelectorAll(".box");
    let numsArray = Array.from(nums);
    for (let i = 0; i < numsArray.length; i++) {
        if (((myBar.textContent) / 12).toFixed(1) == (numsArray[i].height.baseVal.value).toFixed(1)) {
            numsArray[i].style.opacity = "1";
        }

    }
}

function showDataOnHover(myBar) {
    let nums = document.querySelectorAll(".data-text");
    let numsArray = Array.from(nums);
    for (let i = 0; i < numsArray.length; i++) {
        if (((numsArray[i].textContent) / 12).toFixed(1) == (myBar.height.baseVal.value).toFixed(1)) {
            numsArray[i].style.display = "block";
        }

    }
}

function hideDataOnHover(myBar) {
    let nums = document.querySelectorAll(".data-text");
    let numsArray = Array.from(nums);
    for (let i = 0; i < numsArray.length; i++) {
        if (((numsArray[i].textContent) / 12).toFixed(1) == (myBar.height.baseVal.value).toFixed(1)) {
            numsArray[i].style.display = "none";
        }

    }
}


