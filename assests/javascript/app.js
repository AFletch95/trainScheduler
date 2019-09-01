
// Variables
var trainList=[]
//================



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
  apiKey: "AIzaSyBGTThuvE93KPnQXhZqYAoN2XIlq-FOBW0",
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

// TODO: get each train from database and add to the trainList

// *Database data stored like:     databaseURL: "https://bootcamptest-b41c5.firebaseio.com",
// bootcamptest-b41c5
  // -LndoriCeAfzrR-DejZT
    // destination: "london"
    // firstDeparture: "12:00"
    // frequency: "5"
    // name: "t1"
  // LndovA5pfebY334gGPm
  // -Lndp5O6F5Wb7ONxJdV0
  // -Lndq9cD-y7qAG2kiKrC

  // 1) Get the "train" from the database and push it onto the trainList array
  // 2) Do that for each element in the database
  // 3) Pass that array into the buildTable function

  // *My problem is that I cannot figure out the right command to access my data correctly*
  // *I may need to store the data differently to access the data that I want*


  database.ref().on("value", function(snapshot){
    console.log(snapshot.val())
  });



//================


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

// Takes a train obj passed into the function and accesses its members to populate the table
function addTrainToTable(newTrain){
  var $trainTable = $('#newTrainGoesHere');
  // Create elements
  var tr = $('<tr>');
  var tdName = $('<td>');
  var tdDest = $('<td>');
  var tdFreq = $('<td>');
  var tdArival = $('<td>');
  var tdMin = $('<td>');
  // Store data
  tdName.text(newTrain.name);
  tdDest.text(newTrain.destination);
  tdFreq.text(newTrain.frequency);
  tdArival.text(calcNextArival(newTrain));
  tdMin.text(calcMinTillTrain(newTrain));
  // append new row with data
  tr.append(tdName,tdDest,tdFreq,tdArival,tdMin);
  $trainTable.append(tr);
}
// Loop through the trainList and add each train to the table
function buildTable(list){
  $('#newTrainGoesHere').empty();
  for(let i=0;i<list.length;i++)
  {
    addTrainToTable(list[i]);
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
  console.log(trainList);
  database.ref().set("train",train); // **This is where I store the data to the database**
  //Empty text boxes
  $('#trainName').val("");
  $('#trainDestination').val("");
  $('#trainDeparture').val("");
  $('#trainFrequency').val("");
});
