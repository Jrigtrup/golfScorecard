
let numplayers = 0;
let numholes = 9;
let selcourse;
let seltype;
let courses = [];
let teeboxes = [];
let selectedTeebox;

loadCard();
placePlayers();

function loadCard() {
    for (let p = 1; p <= numplayers; p++) {
        playgen.add(p, undefined);
    }
    buildCard();
}

function placePlayers() {
    $(".playerbox").html("Enter name below...");
    for (let p = 0; p < playgen.playerCollection.length; p++) {
        $(".playerbox").append(`<div>
        <a href="#" onclick="deletePlayer(${playgen.playerCollection[p].id})">Remove___</a>           
        <span>${playgen.playerCollection[p].name}</span></div>`);
    }

}

function buildCard() {
  $('.score').append(`<div class='holes'></div>`)
  $('.score').append(`<div class='pars'></div>`)
  $('.score').append(`<div class='distances'></div>`)
  $('.holes').append(`<div id='title' class='colm'><span>Hole #</span></div>`);
  $('.pars').append(`<div id='title' class='colm'><span>Par</span></div>`);
  $('.distances').append(`<div id='title' class='colm'><span>Distance</span></div>`);
    for (let c = 0; c < 18; c++) {     
      $('.holes').append(`<div id='holes-${c}' class='colm'><span>${c+1}</span></div>`);  
      $('.pars').append(`<div id='pars-${c}' class='colm'><span></span></div>`);
      $('.distances').append(`<div id='distances-${c}' class='colm'><span></span></div>`);
    }
}

function fillData(teeBox) {
  console.log($('#teeboxSelect').val());
  let teeTypeId = $('#teeboxSelect').val()-1;
  selcourse.holes.forEach((hole, index) => {
    let par = hole.teeBoxes[teeTypeId].par;
    console.log(par);
    $(`#pars-${index}`).html(par);
    let yards = hole.teeBoxes[teeTypeId].yards;
    $(`#distances-${index}`).html(yards);
  });
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
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selcourse = JSON.parse(this.responseText).data;
            console.log(selcourse);
            teeboxes = selcourse.holes[0].teeBoxes;
            console.log(teeboxes);
            displayTeeboxes(teeboxes);
        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseid}`, true);
    xhttp.send();
}

function displayTeeboxes(tempTeeboxes) {
  $('#teeboxSelect').remove()
  $('.course-container').append(`<select id="teeboxSelect" onchange="fillData()">
  <option value=''>Select Difficulty</option></select>`);
  tempTeeboxes.forEach(teeBox => {
    $('#teeboxSelect').append(`<option value="${teeBox.teeTypeId}">${teeBox.teeType}</option>`);
  });
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
