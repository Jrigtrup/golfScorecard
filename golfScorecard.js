
let numplayers = 0;
let numholes = 9;
let selcourse;
let seltype;
let courses = [];
let teeboxes = [];
let selectedTeebox;
let parTotal = 0;
let distanceTotal = 0;
let parIn = 0;
let parOut = 0;
let distanceIn = 0;
let distanceOut = 0;

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
        <a href="#" onclick="deletePlayer(${playgen.playerCollection[p].id})">Remove</a>           
        <span>${playgen.playerCollection[p].name}</span></div>`);
  }
}

function buildCard() {
  $('.score').append(`<div class='holes'></div>`)
  $('.score').append(`<div class='pars'></div>`)
  $('.score').append(`<div class='distances'></div>`)
  $('.score').append(`<div class='handicap'></div>`)
  $('.holes').append(`<div id='title' class='colm'><span>Hole #</span></div>`);

  $('.pars').append(`<div id='title' class='colm'><span>Par</span></div>`);
  $('.distances').append(`<div id='title' class='colm'><span>Distance</span></div>`);
  $('.handicap').append(`<div id='title' class='colm'><span>Handicap</span></div>`);
  for (let c = 0; c < 18; c++) {
    $('.holes').append(`<div id='holes-${c}' class='colm'><span>${c + 1}</span></div>`);
    $('.pars').append(`<div id='pars-${c}' class='colm'><span></span></div>`);
    $('.distances').append(`<div id='distances-${c}' class='colm'><span></span></div>`);
    $('.handicap').append(`<div id='handicap-${c}' class='colm'><span></span></div>`);
  }
  $('.holes').append(`<div id='foot' class='colm'><span>Out</span></div>`);
  $('.holes').append(`<div id='foot' class='colm'><span>In</span></div>`);
  $('.holes').append(`<div id='foot' class='colm'><span>Total</span></div>`);
  $('.pars').append(`<div id='pars-in' class='colm'></div>`);
  $('.pars').append(`<div id='pars-out' class='colm'></div>`);
  $('.pars').append(`<div id='pars-total' class='colm'></div>`);
  $('.distances').append(`<div id='distances-in' class='colm'></div>`);
  $('.distances').append(`<div id='distances-out' class='colm'></div>`);
  $('.distances').append(`<div id='distances-total' class='colm'></div>`);
  $('.handicap').append(`<div id='handicap-in' class='colm'></div>`);
  $('.handicap').append(`<div id='handicap-out' class='colm'></div>`);
  $('.handicap').append(`<div id='handicap-total' class='colm'></div>`);
}

function fillData(teeBox) {
  let teeTypeId = $('#teeboxSelect').val() - 1;
  parTotal = 0;
  distanceTotal = 0;
  selcourse.holes.forEach((hole, index) => {
    let par = hole.teeBoxes[teeTypeId] ? hole.teeBoxes[teeTypeId].par : 0;
    parTotal += par;
    $(`#pars-${index}`).html(par);
    let yards = hole.teeBoxes[teeTypeId] ? hole.teeBoxes[teeTypeId].yards : 0;
    distanceTotal += yards;
    $(`#distances-${index}`).html(yards);
    let hcp = hole.teeBoxes[teeTypeId] ? hole.teeBoxes[teeTypeId].hcp : 0;
    distanceTotal += hcp;
    $(`#handicap-${index}`).html(hcp);
    if(index < 9) {
      parIn += par;
      distanceIn += yards;
    } else {
      parOut += par;
      distanceOut += yards;
    }
  });
  $('#pars-total').html(parTotal);
  $('#distances-total').html(distanceTotal);
  $('#pars-in').html(parIn);
  $('#pars-out').html(parOut);
  $('#distances-in').html(distanceIn);
  $('#distances-out').html(distanceOut);
}

function updatescore(playerid) {
  let currentTotal = 0;
  let inScore = 0;
  let outScore = 0;
  for(i = 1; i <= 18; i++){
    let holeStroke = $(`#player-${playerid}-input-${i}`).val();
    if (holeStroke) {
      if (i < 10) {
        inScore += +holeStroke;
      } else {
        outScore += +holeStroke;
      }
      currentTotal += +holeStroke;
    }
  }
  $(`#player-${playerid}-input-in`).html(inScore);
  $(`#player-${playerid}-input-out`).html(outScore);
  $(`#player-${playerid}-input-total`).html(currentTotal);
}

function addPlayer(myval, event) {
  switch (event.key) {
    case "Enter":
      let myid = playgen.playerCollection.length + 1;
      playgen.add(myid, myval);
      console.log(playgen.count)
      placePlayers();
      $(".playerinput").val("");
      $('.score').append(`<div class='player-${playgen.count}'></div>`)
      $(`.player-${playgen.count}`).append(`<div id='title' class='colm'><span>${myval}</span></div>`);
      for (let c = 0; c < 18; c++) {
        $(`.player-${playgen.count}`).append(`<div class='colm'><input onkeyup='updatescore(${playgen.count})' id='player-${playgen.count}-input-${c + 1}'></span></div>`);
      }
      $(`.player-${playgen.count}`).append(`<div id='player-${playgen.count}-input-in' class='colm'></div>`);
      $(`.player-${playgen.count}`).append(`<div id='player-${playgen.count}-input-out' class='colm'></div>`);
      $(`.player-${playgen.count}`).append(`<div id='player-${playgen.count}-input-total' class='colm'></div>`);
      break;
  }
}

function deletePlayer(id) {
  playgen.delplayer(id);
  placePlayers();
}

getCourses();

function getCourses() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      courses = response.courses;
      for (let i = 0; i < courses.length; i++) {
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
      teeboxes = selcourse.holes[0].teeBoxes;
      console.log(teeboxes);
      displayTeeboxes(teeboxes);
      $('.score').html('');
      buildCard();
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
