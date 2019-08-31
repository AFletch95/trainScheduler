class Train{
  constructor(name,destination,frequency,firstDeparture){
    this.name = name;
    this.destination = destination;
    this.frequency = frequency;
    this.firstDeparture = moment(firstDeparture, "HH:mm");
  }
  getMinTillTrain(){
    return this.calcMinTillTrain();
  }
  calcMinTillTrain(){
    let diffTime = moment().diff(moment(this.firstDeparture),"minutes");
    let tRemainder = diffTime % this.frequency;
    let minTillTrain = this.frequency - tRemainder;
    return minTillTrain;
  }
  getNextArival(){
    return this.calcNextArival();
  }
  calcNextArival(){
    let diffTime = moment().diff(moment(this.firstDeparture),"minutes");
    let tRemainder = diffTime % this.frequency;
    let minTillTrain = this.frequency - tRemainder;
    let nextTrain = moment().add(minTillTrain,"minutes").format("hh:mm");
    return nextTrain;
  }
}
// Add train to list
function addTrainToTable(newTrain){
  var $trainTable = $('#newTrainGoesHere');
  // Create elements
  var tr = $('<tr>');
  var tdName = $('<td>');
  var tdDest = $('<td>');
  var tdFreq = $('<td>');
  var tdArival = $('<td>');
  var tdMin = $('<td>');
  // Store info
  tdName.text(newTrain.name);
  tdDest.text(newTrain.destination);
  tdFreq.text(newTrain.frequency);
  tdArival.text(newTrain.getNextArival());
  tdMin.text(newTrain.getMinTillTrain());
  // append new row with data
  tr.append(tdName,tdDest,tdFreq,tdArival,tdMin);
  $trainTable.append(tr);
}

$('#addTrainButton').on("click",function(event){
  event.preventDefault();
  var trainName = $('#trainName').val().trim();
  var trainDest = $('#trainDestination').val().trim();
  var trainDepart = $('#trainDeparture').val().trim();
  var trainFreq = $('#trainFrequency').val().trim();

  let train = new Train(trainName,trainDest,trainFreq,trainDepart)
  trainList.push(train);
  addTrainToTable(train);
  console.log(trainList);
});
// Variables
  var trainList=[]
//================