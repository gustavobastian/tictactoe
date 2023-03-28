console.log("starting")

const turnController= function(){
    let players=['X','O']
    let current_turn='X';

    let setCurrentTurn= function(){
        if (current_turn=='X'){
            current_turn='O';
        }
        else{
            current_turn='X';
        }
    }

    let getCurrentTurn=function(){
        return this.current_turn;
    }

    let printControl= function(){
        let elementLocal=document.getElementById("turnController");        
        let content="<div id='leftC'> </div><div class='contentControl'>";
        content+="<div id='textControl'>Turn :"+this.current_turn+"</div>"
        content+="<div id='buttonControl'><button id='buttonReset'>Restart</button></div>"
        content+="</div><div id='rightC'></div>"

        elementLocal.innerHTML=content;

    }

    return {
        players,
        current_turn,
        setCurrentTurn,
        printControl
    }
}
const gameboard= function (){
    let line1=new Array(3).fill(' ');
    let line2=new Array(3).fill(' ');
    let line3=new Array(3).fill(' ');

    let setValue = function(x,y,player){
        if((y<0)||(y>2)){return Error;}
        else{
            if(y==0){
                line1[x]=player;
            }
            if(y==1){
                line2[x]=player;
            }
            if(y==2){
                line3[x]=player;
            }
        }
        printBoard();
    }
    
    let printBoard= function(){        
        let elementLocal=document.getElementById("container");
        let buttons_values=[];
        //moving buttons values to an array in order to check them in an easy way later
        buttons_values.push(line1[0]);
        buttons_values.push(line1[1]);
        buttons_values.push(line1[2]);
        buttons_values.push(line2[0]);
        buttons_values.push(line2[1]);
        buttons_values.push(line2[2]);
        buttons_values.push(line3[0]);
        buttons_values.push(line3[1]);
        buttons_values.push(line3[2]);

        let content="<div class='content2'>";

        content+="<ul>";
        for (let d=0;d<9;d++)
        {content+="<li>";
        content+="<div class='insideGrid'><button id='button_"+d+"'>"+buttons_values[d]+"</button></div>"
        content+="</li>";
        }
        content+="</ul>";
        content+="</div>";

        elementLocal.innerHTML=content;
    }

    let resetBoard= function(){
        this.line1=new Array(3).fill(' ');
        this.line2=new Array(3).fill(' ');
        this.line3=new Array(3).fill(' ');
        printBoard();
    }

    return {
        line1,
        line2,
        line3,
        setValue,
        printBoard,
        resetBoard
    }
}

let myGame= gameboard();
let myControl= turnController();
myControl.printControl();
myGame.printBoard();
myGame.setValue(1,2,"X");
myGame.printBoard();
myGame.setValue(0,2,"O");
myGame.printBoard();