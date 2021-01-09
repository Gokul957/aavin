const config = {
    apiKey: "AIzaSyBzzXJcNIgEs95X3QF9WDZLVD6KcdwtpB8",
    authDomain: "aavin-tpr-rec.firebaseapp.com",
    projectId: "aavin-tpr-rec",
    databaseURL: "https://aavin-tpr-rec-default-rtdb.firebaseio.com/",
    storageBucket: "aavin-tpr-rec.appspot.com",
    messagingSenderId: "761478785831",
    appId: "1:761478785831:web:dbb3779c848fd0c6765702",
    measurementId: "G-HQ0L3ECJ0R"
};
firebase.initializeApp(config);
$(document).ready(function () {

    var loginBy = $.cookie('login');
    if (loginBy == null || loginBy == "") {
        alert("Please login");
        window.location.href = "index.html";
    }
    firebase.auth().onAuthStateChanged(function (user) {

        if (user != null) {
            $.cookie('userid', user.uid);
            if (user) {
          
                $("#divMainContent").empty().load("Home.html", function () {
                    $("#divMainContent").show();
                });
            } else {
                $.removeCookie('login');
                window.location = 'index.html';
            }
        } else {
            $.removeCookie('login');
            window.location = 'index.html';
        }
    });
});