function fnManager(ev) {
    $("#divMainContent").hide();
    $("#divMainContent").empty().load("ApplicationForm.html", function () {
        $("#divMainContent").show("slow");
    });
    return false;
}

function fnManagerDeputy(ev) {
    $("#divMainContent").hide();
    $("#divMainContent").empty().load("ApplicationForm.html", function () {
        $("#divMainContent").show("slow");
    });
    return false;
}