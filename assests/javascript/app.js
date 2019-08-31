class Train{
  constructor(name,destination,frequency,firstDeparture){
    this.name = name;
    this.destination = destination;
    this.frequency = frequency;
    this.firstDeparture = firstDeparture;
  }
}
// firebase
var firebaseConfig = {
  authDomain: "bootcamptest-b41c5.firebaseapp.com",
  databaseURL: "https://bootcamptest-b41c5.firebaseio.com",
  projectId: "bootcamptest-b41c5",
  storageBucket: "bootcamptest-b41c5.appspot.com",
  messagingSenderId: "891932610117",
  appId: "1:891932610117:web:99364afe978b9678"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// time converters
function calcMinTillTrain(train){
  train.firstDepartureT = moment(train.firstDeparture,"HH:mm");
  let diffTime = moment().diff(moment(train.firstDepartureT),"minutes");
  let tRemainder = diffTime % train.frequency;
  let minTillTrain = train.frequency - tRemainder;
  return minTillTrain;
}
function calcNextArival(train){
  let minutes = calcMinTillTrain(train)
  let nextTrain = moment().add(minutes,"minutes").format("hh:mm");
  return nextTrain;
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
  tdArival.text(calcNextArival(newTrain));
  tdMin.text(calcMinTillTrain(newTrain));
  // append new row with data
  tr.append(tdName,tdDest,tdFreq,tdArival,tdMin);
  $trainTable.append(tr);
}
function buildTable(){
  $('#newTrainGoesHere').empty();
  for(let i=0;i<trainList.length;i++)
  {
    addTrainToTable(trainList[i]);
  }
}
  // Form control
$('#addTrainButton').on("click",function(event){
  event.preventDefault();
  var trainName = $('#trainName').val().trim();
  var trainDest = $('#trainDestination').val().trim();
  var trainDepart = $('#trainDeparture').val().trim();
  var trainFreq = $('#trainFrequency').val().trim();
  // create new train
  let train = new Train(trainName,trainDest,trainFreq,trainDepart)
  trainList.push(train);

    // addTrainToTable(train); // testing purposes

  console.log(trainList);
  database.ref().push(train);
  //Empty text boxes
  $('#trainName').val("");
  $('#trainDestination').val("");
  $('#trainDeparture').val("");
  $('#trainFrequency').val("");
});

// Variables
  var trainList=[]
//================

