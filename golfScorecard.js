// Something so i can create repository

let numcol = 19;
let numplayers = 4;

(function(){
  buildColumns();
})();

function buildColumns(){
  for(let c = 0; c < numcol; c++){
    $('.card').append(`<div id="col${c}" class='column'># ${c}</div>`);
  }
  addBoxes();
}
function addBoxes(){
  // cycle through number of players
  for(let p = 0; p < numplayers; p++){
    // cycle through number of holes
    for(let h = 0; h < numcol; h++){
      $('#col' + h).append(`<div id="p${p}h${h}" class="hole"></div>`);
    }
  }
}











//This is all for going into different lists/courses
let allcats;
let selcourse;
let seltype;

getCourses();

function getCourses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
    //    document.getElementById("demo").innerHTML = this.responseText;
    allcats = JSON.parse(this.responseText);
    // console.log(allcats.categories.length);
    for(let i= 0; i < allcats.categories.length; i++){
        // do something (4 times) because of 4 courses
            $('.centerbox').append(`<div class="classbox">
            <img width="100" src="${allcats.categories[i].courseimage}">
            <span>${allcats.categories[i].name}</span>
            <button onclick="returnCourse(${allcats.categories[i].catid}, this)">Select</button>
            </div>`);
        }
      }
    };
    xhttp.open("GET", "//api.jsonbin.io/b/5ad654fbf5d4cd62f4721e02", true);
    xhttp.send();
  }
  
  function returnCourse(courseid, mybtn) {
      let thecard = $(mybtn).parent();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        selcourse = JSON.parse(this.responseText);
        console.log(selcourse);
        // $(thecard).append(`<div>Found it</div>`);
        let levelsArray = selcourse.classes[0].levels;
        console.log(levelsArray);
        for(let i= 0; i < levelsArray.length; i++){
            $(thecard).append(`<a onclick="showAllClasses(${i})">${levelsArray[i].type}</a>`);
       }
      }
    };
    xhttp.open("GET", "http://golf-courses-api.herokuapp.com" + courseid, true);
    xhttp.send();
  }

  function showAllClasses(typeindex){
    seltype = typeindex;
    for(let c = 0; c < selcourse.classes.length; c++){
        $('.classdisp').append(`<div class="classrow">
        <div>${selcourse.classes[c].levels[seltype].type}</div>
        <div>${selcourse.classes[c].levels[seltype].teacher}</div>
        <div>${selcourse.classes[c].levels[seltype].schedule}</div>
        </div>`);
    }
  }    
