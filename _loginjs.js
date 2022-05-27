$(document).ready(function() {
    $(".add-btn").hide();
    $(".home").hide();
    Users = JSON.parse(localStorage.getItem("Users_"))
        // console.log(Users)

    function check_if_user_exist(phone = "672301714", password = "1234") {
        var isValidUser = Users.some(x => x.password == password && x.phone == phone)
            // console.log(isValidUser)
        if (isValidUser) {
            var user = Users.find(user => user.password == password &&
                user.phone == phone)
            const { name, id } = user
            log_in_id = id
            _start()
            $(".name_of_user").text(id);
            $(".form").fadeOut(100);
            $(".home").fadeIn(500);
            $(".add-btn").fadeIn(2000);
        } else {
            alert("check your input and try again")
        }
    }
    var _number = sessionStorage.getItem("logindeatials")
    if (_number) {
        check_if_user_exist(_number)
    }
    $("#password").keydown(function(e) {
        if (e.keyCode == 13) {
            getloginsfromsignup()
        }

    });

    function getloginsfromsignup() {
        var number = $("#number").val();
        var password = $("#password").val();
        sessionStorage.setItem("logindeatials", number)
        check_if_user_exist(number)
    }

    $("#login").click(function(e) {
        getloginsfromsignup()
    });
});