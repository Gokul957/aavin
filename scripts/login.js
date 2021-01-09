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
    $('#btnLogin').on('click', function () {
        const email = $("#txtEmailID").val();
        const pass = $("#txtPassword").val();
        const auth = firebase.auth();
        if ((pass != "" && email != "") && (pass != undefined && email != undefined)) {
            $.LoadingOverlay("show");
            var isloggedin = true;
            const promise = auth.signInWithEmailAndPassword(email, pass);
            promise.then(function (e) {
                firebase.auth().onAuthStateChanged(function (firebaseUser) {
                    if (firebaseUser) {
                        //console.log(JSON.stringify(firebaseUser.uid))
                        fnLoginUser(JSON.stringify(firebaseUser.uid).replace('"', '').replace('"', ''));
                        var expireTime = new Date();
                        expireTime.setTime(expireTime.getTime() + (15 * 60 * 1000));

                        $.cookie('login', email, { expires: expireTime });
                        $.LoadingOverlay("hide");

                    } else {
                        console.log(console.log(firebaseUser));
                        alert("Not logged in")
                        $.LoadingOverlay("hide");
                    }
                });
            }).catch(function (e) {

                isloggedin = false;
                $.LoadingOverlay("hide");
                alert("Invalid EmailId/Password. Please verify..")
                return false;
            });

        } else {
            
            if (email == "") {
                alert("Enter User Id");
                $("#txtEmailID").focus();
            }else{
                if (pass == "") {
                    alert("Enter Password");
                    $("#txtPassword").focus();
                }
            }
            
        }

    });
});


function fnLoginUser(userkey) {
    var userModel = null;
    var userListRef = firebase.database().ref().child("UserDetails");
    userListRef.orderByChild("userid").equalTo(userkey).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            userModel = childSnapshot.val();
            if (userModel != null) {
                localStorage.setItem("userinfo", JSON.stringify(userModel));
                window.location.href = "main.html";
            }

        });
        if (userModel == null) {
            firebase.auth().signOut().then(function () {
                console.log('done')
            }).catch(function (error) {
                // An error happened.
            });
            alert("Invalid user info.please try correct userid/password");
        }

    },
        function (error) {
            if (error) {
                console.error(error);
            } else {

            }
        });
}



