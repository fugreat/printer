var Trello = require("trello");
var trello = new Trello("8bc026302bb0f1cd32ed8ccd13cfd567", "c82c4ea88a838a116216ac53f9cb680c8a991414251b1cd5b852ee99924389b6");

//var boardid="58c0fa31a6e5f859f748b98b";
var boardid="58afe1872214f1ef799dad35";
var cardid="5929f4066dfded9274f83062";
var labelneedprint="58afe187ced82109ff71bf20";
var labelprinted="58afe187ced82109ff71bf1f"



const Memobird = require('memobird');

const memobird = new Memobird({
  ak: '9ddb208868a048b296740fe986a9d484',
  memobirdID: '211af95b23817e56',
  useridentifying: '459495',
});

var msg={
 "needprint":false,
 "start":"-------  start ----------",
 "name":"",
 "desc":"",
 "owner":"",
 "end":"-------   end  ----------"
}
function pipe(i,j){
}




function changeLabel(trello, cardid, srcid, dstid){
trello.deleteLabelFromCard(cardid, srcid, function (error, del){
   if(error){
	console.log("failed:", errpr);
   }
   else {
     console.log("deletelabel:", del);
   }
});


trello.addLabelToCard(cardid, dstid, function (error, del){
   if(error){
	console.log("failed:", errpr);
   }
   else {
     console.log("addlabel:", del);
   }
});
}

function check(){
trello.getCardsOnBoard(boardid, function(error, cards){
   if(error){
	console.log("failed:", error);
   }
   if(!cards){ return; } 
   cards.forEach(function(card, i, a){
   if(card.labels){
      card.labels.forEach(function(label, i, a){
          if(label.name == "待打印")
          {
              changeLabel(trello, card.id, labelneedprint, labelprinted); 
              console.log("Find a card need print:", label.name);
              msg.name=card.name;
              if(card.badges.description){
	          msg.desc=card.desc;
              }
	      if(card.idMembers){
                   card.idMembers.forEach(function(idMember){
			trello.getMember(idMember, function(err, user){
			if(!err){
			    msg.owner = user.fullName;
		            msg.needprint = true;
			}
			});
		   });
	      }
          }
   })
   }
});

});
}


function  myfunc(Interval){
    check();
}

console.log("Service start");
var myInterval=setInterval(myfunc,1000,"Interval");

function printacard(){
  if(msg.needprint){
  msg.needprint = false;
  var txt=msg.start + "\n" + "TASK NAME: "+msg.name + "\n" + "TASK DESC: "+ msg.desc + "\n" + "TASK OWNER:" + msg.owner + "\n" + msg.end +"\n";
  memobird.init()
  .then(() => memobird.printText(txt))
  console.log("print:"+ txt);
  }


}

setInterval(printacard,200,"Interval");


