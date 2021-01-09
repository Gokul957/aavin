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
    const captcha = new Captcha($('#canvas'), {
        length: 5,
        autoRefresh: true,
        caseSensitive: true
    });
    alert('sdd')
    $('#btnSignUp').on('click', function () {
        if ($('input[name="code"]').val() != "") {
            const ans = captcha.valid($('input[name="code"]').val());
            // if (ans){
            //     CreateAccount();
            // }else{
            //     alert("Invalid Captcha code");
            //      $("#code").focus();   
            // }
            CreateAccount();
        } else {
            alert("Enter Captcha code");
            $("#code").focus();
        }
    });
    $('#btnBack').on('click', function () {
        window.location.href = "Index.html";
    });

    $('input[name="number"]').keydown(function (e) {
        var keyCode = e.which; // Capture the event
        if (keyCode != 8 && keyCode != 9 && keyCode != 13 && keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 46 && keyCode != 110 && keyCode != 190) {
            if (keyCode < 48) {
                e.preventDefault();
            }
            else if (keyCode > 57 && keyCode < 96) {
                e.preventDefault();
            } else if (keyCode > 105) {
                e.preventDefault();
            }
        }
    });


});

function CreateAccount() {
    if (fnValidation()) {
        alert("comes here")
        var UserDetail = {
            "applicantname": $("#txtName").val(),
            "emailid": $("#txtEmailID").val(),
            "mobile": $("#txtMobile").val(),
            "usertype": 1,
            "createdon": new Date().getTime(),
            "userid": "NA",
            "key": "NA",
            "isactive" : 1,
            "deleted" : 0,
            "appsubmitted" : 0
        };
        RegisterUser(UserDetail);
    }
}
function fnValidation() {

    if ($.trim($("#txtName").val()) == "") {
        alert("Name cannot be empty!!")
        $("#txtName").focus();
        return false;
    }
    if ($.trim($("#txtMobile").val()) == "") {
        alert("Mobile number cannot be empty!!")
        $("#txtMobile").focus();
        return false;
    }
    if ($.trim($("#txtEmailID").val()) == "") {
        alert("Email number cannot be empty!!")
        $("#txtEmailID").focus();
        return false;
    } else {
        var ret = validateEmail($.trim($("#txtEmailID").val()));
        if (!ret) {
            return false;
        } else {
            var userFound = fnCheckUserID($.trim($("#txtEmailID").val()));
            if (userFound) {
                return false;
            }
            alert(userFound)
        }
    }
    //   


    if ($.trim($("#txtPassword").val()) == "") {
        alert("Password cannot be empty!!")
        $("#txtPassword").focus();
        return false;
    } else {

        if ($.trim($("#txtPassword").val()).length < 6) {
            alert("Password lenght minimum 6 characters");
            $("#txtPassword").focus();
            return false;
        }
    }

    if ($.trim($("#txtConfirmPassword").val()) == "") {
        alert("Confirm Password cannot be empty!!")
        $("#txtConfirmPassword").focus();
        return false;
    }

    if ($.trim($("#txtPassword").val()) != $.trim($("#txtConfirmPassword").val())) {
        alert("Password and confirm passowrd must be same");
        return false;
    }
    return true;
}
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }
    else {
        return false;
    }
}
function fnCheckUserID(emailid) {
    var retType=false;
    var userDetailsDef = firebase.database().ref().child("UserDetails");
    if (userDetailsDef != null) {
        userDetailsDef.orderByChild("emailid").equalTo(emailid).once("value", function (snapshot) {
            var userDetail = snapshot.val();
            if (userDetail != null) {
                alert("Email Id already registered. Enter Valid user ID");
                retType = true;
                return true;
            }
        });
    }
    return retType;
}

function RegisterUser(UserDetail) {
    firebase.auth().createUserWithEmailAndPassword(UserDetail.emailid, $("#txtPassword").val()).then(function (value) {
        var rootRef = firebase.database().ref();
        var rootRef = firebase.database().ref().child("UserDetails");
        var newStoreRef = rootRef.push();
        var postId = newStoreRef.getKey();
        UserDetail.key = postId;
        UserDetail.userid = value.uid;
        newStoreRef.update(UserDetail);
        alert("Signed up successfully!!");
        window.location.href = "Index.html";
    }).catch(function (error) {
        alert("Error: Unable to signup..");
        console.log(error)
    });
}

