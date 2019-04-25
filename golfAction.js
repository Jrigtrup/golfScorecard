

class PlayerGenerator{
    constructor(){
        this.playerCollection = [];
        this.myarray = [0];
        this.nameArray = [""];
        this.count = 0;
    }
    add(id, name){
        let myname;
        this.count ++;
        let randum = Math.floor(Math.random() * this.nameArray.length);
        if(name === undefined){
            myname = this.nameArray[randum];
        }
        else{
            myname = name;
        }
        this.playerCollection.push(new Player(id, myname, this.myarray));
        this.nameArray.splice(randum, 1);
    }
    delplayer(id){
        for(let p = 0; p < this.playerCollection.length; p++){
            if(this.playerCollection[p].id === id){
                this.playerCollection.splice(p, 1);
            }
        }
    }

}
class Player{
    constructor(id, name, scores) {
        this.scoreArray = scores;
        this.name = name;
        this.id = id;
    }
}

let playgen = new PlayerGenerator();



