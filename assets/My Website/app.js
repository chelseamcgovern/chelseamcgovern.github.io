$( document ).ready(function() {
    // initialize firebase
    <script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>
        <script>
    
      var config = {
        
          // Initialize Firebase
          var config = {
            apiKey: "AIzaSyDMj25Me5TYCYHFBp2LWyaWiUaS6anxb8s",
            authDomain: "i-like-trains-6256c.firebaseapp.com",
            databaseURL: "https://i-like-trains-6256c.firebaseio.com",
            projectId: "i-like-trains-6256c",
            storageBucket: "",
            messagingSenderId: "1062957186490"
          };
          firebase.initializeApp(config);
        </script>
      };
      // Initialize Firebase
      firebase.initializeApp(config);
    
    // a var to represent the database
     var database = firebase.database();
    
    // button to submit the user given info
    $("#trainInfoBtn").on("click", function(event) {
        event.preventDefault(); //no button reset
    
        //set user input values to variables
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        //converts user input to usable info
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var frequency = $("#freq").val().trim();
        
        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
        // console.log(trainName);
        // console.log(destination);
        // console.log(firstTime);
        // console.log(frequency);
        // console.log(currentTime);
    
    
    
        //gathers together all our new train info
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        };
    
    
        //uploads newTrain to firebase
        database.ref().push(newTrain);
        //*push* adds to info already in firebase. *set* overwrites preexisting info
        
        //clears elements before adding new text
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");
    
        //supposed to prevent from moving to a new page... idk how
        return false;
    
    }); //end of onclick
    
    //figure out what this does
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
            console.log(childSnapshot.val());
            //store in variables
            var trainName = childSnapshot.val().train;
            var destination =childSnapshot.val().trainGoing;
            var firstTime = childSnapshot.val().trainComing;
            var frequency = childSnapshot.val().everyXMin;
    
    // 		console.log(trainName);
    // 		console.log(destination);
    // 		console.log(firstTime);
    // 		console.log(frequency);
    
            //makes first train time neater
            var trainTime = moment.unix(firstTime).format("hh:mm");
            //calculate difference between times
            var difference =  moment().diff(moment(trainTime),"minutes");
    
            //time apart(remainder)
            var trainRemain = difference % frequency;
    
            //minutes until arrival
            var minUntil = frequency - trainRemain;
    
            //next arrival time
            var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
    
            //adding info to DOM table 
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    
    });
    });
    
    