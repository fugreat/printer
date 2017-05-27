  var Trello = require("trello");
  var trello = new Trello("8bc026302bb0f1cd32ed8ccd13cfd567", "c82c4ea88a838a116216ac53f9cb680c8a991414251b1cd5b852ee99924389b6");
/*
  trello.addCard('Clean car', 'Wax on, wax off', "58c0fa4e927b2a969f2dcbf7",
      function (error, trelloCard) {
          if (error) {
              console.log('Could not add card:', error);
          }
          else {
              console.log('Added card:', trelloCard);
          }
      });
*/
var TR = function (key, token) {
    this.key = key;
    this.token = token;
    this.trello = trello;
    this.listid = nil;
};

// bind a list
TR.prototype.bind = function (listname) {
   this.listid = "58c0fa4e927b2a969f2dcbf7";
};

// find card to print
TR.prototype.findcard = function (cb) {
 if(this.listid){
     this.trello.getCardsOnList(this.listid, cb);
  }
}
module.exports = TR;
//mark printed card


