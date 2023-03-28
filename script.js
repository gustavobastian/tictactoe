console.log("starting")



const turnController= function(){
    let players=['X','O']
    let current_turn='X';

    let setCurrentTurn = function(){
        
        if (this.current_turn==='X'){
            this.current_turn='O';
        }
        else{
            this.current_turn='X';
        }
        return;
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

        let resetLocal=document.getElementById("buttonReset");        
        resetLocal.addEventListener('click',reset);
        return;
    }

    let resetControl = function(){
        this.current_turn='X';
    }

    return {
        players,
        current_turn,
        setCurrentTurn,
        getCurrentTurn,
        printControl,
        resetControl
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

        //generating buttons on the screen
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
        //adding listeners
        for (let d=0;d<9;d++)
        {
            let component=document.getElementById("button_"+d);
            component.addEventListener("click",buttonFun);
        }

    }

    let resetBoard = function(){
        line1=new Array(3).fill(' ');
        line2=new Array(3).fill(' ');
        line3=new Array(3).fill(' ');
        printBoard();
    }

    let checkWinner = function(){
        let winner=" "
        //checking columns
        if ((line1[0]==line2[0])&&(line2[0]==line3[0]))
            { winner=line1[0];}
        else if ((line1[1]==line2[1])&&(line2[1]==line3[1]))
            { winner=line1[1];}    
        else if ((line1[2]==line2[2])&&(line2[2]==line3[2]))
            { winner=line1[2];}  
        //check rows          
        else if ((line1[0]==line1[1])&&(line1[2]==line1[1]))
            { winner=line1[0];}
        else if ((line2[0]==line2[1])&&(line2[1]==line2[2]))
            { winner=line2[1];}    
        else if ((line3[0]==line3[1])&&(line3[2]==line3[1]))
            { winner=line3[2];}  
        
            if(winner!=" "){
                console.log(winner)
                const winElement=document.createElement("div");
                const winElementInter=document.createElement("h1");
                winElementInter.style.cssText='display:flex; flex-direction:row;justify-content=center;text-align:center;color:red !important;';
                winElementInter.textContent="The Winner is "+winner;
                winElement.style.cssText='display:flex; flex-direction:row;justify-content=center;text-align:center;color:red !important;font-size: 58px !important;';
                winElement.appendChild(winElementInter);
                let elementLocal=document.getElementById("Winner");
                elementLocal.appendChild(winElement)
                let containerLocal=document.getElementById("container");
                containerLocal.innerHTML="";
                
            }
        return;
    }

    return {
        line1,
        line2,
        line3,
        setValue,
        printBoard,
        resetBoard,
        checkWinner
    }
}

let myGame= gameboard();
let myControl= turnController();

/**
 * cleaning board function
 */
const reset = function(){
    console.log("reseting");
    myGame.resetBoard();
    myGame.printBoard();
    myControl.resetControl();
    myControl.printControl();
    let elementLocal=document.getElementById("Winner");
    elementLocal.innerHTML="";
}

/**
 * each control uses this function
 */
const buttonFun = function(x){
    
    let localId=x.srcElement.id;
    let user= myControl.getCurrentTurn();
    myControl.setCurrentTurn();    
    if(localId==='button_0')
    {        
        myGame.setValue(0,0,user)
    }
    if(localId==='button_1')
    {     
        myGame.setValue(1,0,user)
    }
    if(localId==='button_2')
    {
        myGame.setValue(2,0,user)
    }
    if(localId==='button_3')
    {
        myGame.setValue(0,1,user)
    }
    if(localId==='button_4')
    {
        myGame.setValue(1,1,user)
    }
    if(localId==='button_5')
    {
        myGame.setValue(2,1,user)
    }
    if(localId==='button_6')
    {
        myGame.setValue(0,2,user)
    }
    if(localId==='button_7')
    {
        myGame.setValue(1,2,user)
    }
    if(localId==='button_8')
    {
        myGame.setValue(2,2,user)
    }
    myGame.checkWinner();
    myControl.printControl();
    return;
}

myControl.printControl();
myGame.printBoard();