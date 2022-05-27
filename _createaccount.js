$(document).ready(function() {
    $(".input-container").hide();
    $(".head-container-chatsbox").hide();
    $(".contain").hide();
    $(".signup-container").hide();
    $(".create-account").click(function(e) {
        $(".login-container").hide();
        $(".signup-container").show();
    });
    $("#signup-login").click(function(e) {
        $(".login-container").show();
        $(".signup-container").hide();
    });
    $(".signup-container .create-account").click(function(e) {
        getdetailsfromcreateaccount()

    });

    function createanewuser(name, number, password) {
        Users = JSON.parse(localStorage.getItem("Users_"));
        const newUserId = Math.floor(Math.random() * 100)
        const newUser = {
            name: name,
            password: password,
            phone: number,
            id: newUserId,
            messages: []
        }
        Users.push(newUser)
        localStorage.setItem("Users_", JSON.stringify(Users))
        log_in_id = newUserId
        _start()
        $(".name_of_user").text(newUserId);
        $(".form").fadeOut(100);
        $(".home").fadeIn(500);
        $(".add-btn").fadeIn(2000);

    }

    function getdetailsfromcreateaccount() {
        var user_name = $("#signup_name").val();
        var user_number = $("#signup_number").val();
        var user_password = $("#signup_password").val();
        validatecreateaccountfromlogin(user_name, user_number, user_password)
    }

    function validatecreateaccountfromlogin(name, number, password) {
        if (password.length <= 3) {
            alert("password must be greater or equal to 4")
        } else if (name.length <= 2) {
            alert("check your name must be 3 or more character long")
        } else if (number.length < 9) {
            alert("number must be 9 character long")
        } else {
            createanewuser(name, number, password)
        }
    }
});