  var Trello = require("trello");
  var trello = new Trello("8bc026302bb0f1cd32ed8ccd13cfd567", "c82c4ea88a838a116216ac53f9cb680c8a991414251b1cd5b852ee99924389b6");
var boardid="58c0fa31a6e5f859f748b98b";
var cardid="5929f4066dfded9274f83062";
var labelneedprint="58c0fa31ced82109ffa6058b";
var labelprinted="58c0fa31ced82109ffa60586"




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
function pipe(i,j){
 console.log("[print]", i,j);
}
function check(){
trello.getCardsOnBoard(boardid, function(error, cards){
   if(error){
	console.log("failed:", error);
   }
   cards.forEach(function(card, i, a){
   if(card.labels){
      card.labels.forEach(function(label, i, a){
          if(label.name == "待打印")
          {
              changeLabel(trello, card.id, labelneedprint, labelprinted); 
              console.log("Find a card need print:", label.name);
              pipe("----------start-------------");
              pipe("Task name: ", card.name);
              if(card.badges.description){
                  pipe("Task desc: ", card.desc);
              }
	      if(card.idMembers){
                   card.idMembers.forEach(function(idMember){
			trello.getMember(idMember, function(err, user){
			if(!err){
				pipe("Owner: ", user.username);
			}
                            pipe("---------- end -------------");
			});
		   });

	      }else {
	          pipe("Owner: ", "None. ");
                  pipe("---------- end -------------");
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


