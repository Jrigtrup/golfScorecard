
let numplayers = 2;
let numholes = 9;
let selcourse;
let seltype;
let courses = [];
let teeboxes = [];

loadCard();
placePlayers();

function loadCard() {
    for (let p = 1; p <= numplayers; p++) {
        playgen.add(p, undefined);
    }
    buildCard();
    buildCard2();
}

function placePlayers() {
    $(".playerbox").html("");
    for (let p = 0; p < playgen.playerCollection.length; p++) {
        $(".playerbox").append(`<div>
        <a href="#" onclick="deletePlayer(${playgen.playerCollection[p].id})">-</a>
        <span>${playgen.playerCollection[p].name}</span></div>`);
    }

}

function buildCard() {

    for (let c = 0; c < 9; c++) {
        $('.score').append(`<div id='c${c}' class='colm'><span>${c + 1}</span></div>`);
    }
    $('.score').append(`<div id='out' class='colm'><span>out</span></div>`);

    for (let p = 0; p < 4; p++) {

        for (let h = 0; h < 9; h++) {
            $(`#c${h}`).append(`<input onkeyup='updatescore(${p})' type='text' id="p${p}h${h}" class='hole'></div>`);
        }
        $('#out').append(`<div id='o${p}' class='hole'></div>`);
    }
}

function buildCard2() {

    for (let c = 0; c < 9; c++) {
        $('.score').append(`<div id='c${c}' class='colm'><span>${c + 1}</span></div>`);
    }
    $('.score').append(`<div id='out' class='colm'><span>in</span></div>`);

    for (let p = 0; p < 4; p++) {

        for (let h = 0; h < 9; h++) {
            $(`#c${h}`).append(`<input onkeyup='updatescore(${p})' type='text' id="p${p}h${h}" class='hole'></div>`);
        }
        $('#out').append(`<div id='o${p}' class='hole'></div>`);
    }
}


function updatescore(playerid) {
    let total = 0;
    for (let h = 0; h < 9; h++) {
        total += Number($(`#p${playerid}h${h}`).val());
    }
    $(`#o${playerid}`).html(total);
}

function addPlayer(myval, event) {

    switch (event.key) {
        case "Enter":
            let myid = playgen.playerCollection.length + 1;
            playgen.add(myid, myval);
            placePlayers();
            $(".playerinput").val("");
            break;
    }
}

function deletePlayer(id) {
    playgen.delplayer(id);
    placePlayers();
}

getCourses();

function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            console.log(response);
            courses = response.courses;
            console.log(courses);
            for (let i = 0; i < courses.length; i++) {
                console.log(courses[i]);
                $('#courseSelect').append(`<option value="${courses[i].id}">${courses[i].name}</option>`)
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function returnCourse(courseid) {
    // let thecard = $(mybtn).parent();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selcourse = JSON.parse(this.responseText).data;
            console.log(selcourse);
            // let levelsArray = selcourse.classes[0].levels;
            // console.log(levelsArray);
            // for (let i = 0; i < levelsArray.length; i++) {
            //     $(thecard).append(`<a onclick="showAllClasses(${i})">${levelsArray[i].type}</a>`);
            // }
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseid}`, true);
    xhttp.send();
}

function showAllClasses(typeindex) {
    seltype = typeindex;
    for (let c = 0; c < selcourse.classes.length; c++) {
        $('.classdisp').append(`<div class="classrow">
        <div>${selcourse.classes[c].levels[seltype].type}</div>
        <div>${selcourse.classes[c].levels[seltype].teacher}</div>
        <div>${selcourse.classes[c].levels[seltype].schedule}</div>
        </div>`);
    }
}    
