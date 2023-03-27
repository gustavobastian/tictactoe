console.log("starting")


const gameboard= function (){
    let line1=new Array(3).fill('_');
    let line2=new Array(3).fill('_');
    let line3=new Array(3).fill('_');

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
    }
    
    let printBoard= function(){
        console.log("***********************")
        console.log(this.line1[0]+","+this.line1[1]+","+this.line1[2]);
        console.log(line2[0]+","+line2[1]+","+line2[2]);
        console.log(line3[0]+","+line3[1]+","+line3[2]);
        let elementLocal=document.getElementById("container");


        let content="<div class='content'>";

        content+="<ul>";
        for (let d=0;d<9;d++)
        {content+="<li>";
        content+="<div class='insideGrid'><button>"+d+"</button></div>"
        content+="</li>";
        }
        content+="</ul>";
        content+="</div>";

        elementLocal.innerHTML=content;
    }

    return {
        line1,
        line2,
        line3,
        setValue,
        printBoard
    }
}

let myGame= gameboard();

myGame.printBoard();
myGame.setValue(1,2,"X");
myGame.printBoard();
myGame.setValue(0,2,"O");
myGame.printBoard();