var Users = [{
    name: "User1",
    password: "1234",
    phone: 672301714,
    id: "02",
    messages: []
}, {
    name: "User2",
    password: "1234",
    phone: 672301715,
    id: "03",
    messages: []
}, {
    name: "User3",
    password: "1234",
    phone: 672301716,
    id: "04",
    messages: []
}, {
    name: "User4",
    password: "1234",
    phone: 672301717,
    id: "05",
    messages: []
}]
let message_checker = setInterval(() => {

}, 1000);
let check_for_incoming_message = setInterval(() => {

}, 1000);
const islocal = localStorage.getItem("Users_")
if (!islocal) {
    localStorage.setItem("Users_", JSON.stringify(Users))
}
let log_in_id = null
let user_id = null
Users = JSON.parse(localStorage.getItem("Users_"))

function getmessages(x, y) {
    Users = JSON.parse(localStorage.getItem("Users_"))
    user_id = y
    var name = Users[findUser(y)].name
    $(".head-container-chatsbox .name").html(name);
    const messages = [...checkiftexted(x, y), ...checkiftexted(y, x)]

    messages.sort((a, b) => {
        var dateA = new Date(a.timestamp),
            dateB = new Date(b.timestamp)
        return dateA - dateB
    })

    return messages
}


function findUser(id) {
    const index = JSON.parse(localStorage.getItem("Users_")).findIndex(index => index.id == id)
    return index
}

function findMessage(otherid) {
    var have_texted = JSON.parse(localStorage.getItem("Users_"))[findUser(log_in_id)].messages.
    findIndex(m_id => m_id.id == otherid)
    return have_texted
}

function checkiftexted(userid, otherid) {
    var have_texted = JSON.parse(localStorage.getItem("Users_"))[findUser(userid)].messages.
    findIndex(m_id => m_id.id == otherid)
    if (have_texted >= 0) {
        const message = JSON.parse(localStorage.getItem("Users_"))[findUser(userid)].messages[have_texted].message
        return message
    }
    const newMessageobj = {
        id: otherid,
        message: []
    }
    Users[findUser(userid)].messages.push(newMessageobj)
    localStorage.setItem("Users_", JSON.stringify(Users))
    return Users[findUser(userid)].messages[Users[findUser(userid)]
        .messages.length - 1].message
}

function aligntext(message, id) {
    let format = ""
    for (let i = 0; i < message.length; ++i) {
        if (message[i].id == log_in_id) {
            format += `
       <div class="chat send">${message[i].text?message[i].text:""}
       </div>
       `
        }
        if (message[i].id == id) {
            format += `
       <div class="chat"><img src="./1.jpg" alt="ok">
       ${message[i].text?message[i].text:""}
       </div>
       `
        }
    }
    $(".message-container-chats").html(format);
}
const messageContainer = document.
querySelector(".message-container")

function _start() {
    // console.log(log_in_id)
    messageContainer.innerHTML = ""
    Users = JSON.parse(localStorage.getItem("Users_"))
        // console.log(Users[findUser(log_in_id)].messages)
    $(".name_of_user").html(Users[findUser(log_in_id)].id);
    JSON.parse(localStorage.getItem("Users_"))[findUser(log_in_id)].messages.forEach((item, index) => {
            const user = item.id

            const last_text = getmessages(log_in_id, user)
                // console.log(log_in_id, user_id)
            let _text = ""
            try {
                last_text[last_text.length - 1].text.length
                _text = last_text[last_text.length - 1].text.slice(0, 30) + "..."

            } catch (err) {
                console.log(err)
                _text = "start conversation"
            }
            messageContainer.innerHTML += `
    <div class="message-box" >
    <div class="img">
        <img src="./1.jpg" alt="">
    </div>
    <div class="name-and-text" id=${Users[findUser(user)].id}>
        <h2 class="name">${Users[findUser(user)].name.length>14?Users[findUser(user)].name.slice(0,14)+"..":Users[findUser(user)].name}</h2>
        <p class="text">${_text}</p>
    </div>
    <div class="options">
        <div>
           ${"01"}
        </div>
    </div>
    </div>
    `

        })
        // check_for_incoming_message
    const chats = document.querySelectorAll(".name-and-text")
    chats.forEach((elm, index) => {
        elm.addEventListener("click", () => {
            $(".head-container-chatsbox").fadeIn(1000);
            $(".home").fadeOut(1000);
            $(".innerchats").show(1000);
            $(".input-container").show(1000);
            $(".contain").fadeOut(1500);
            user_id = $(elm).attr("id")
            clearInterval(check_for_incoming_message)
            message_checker = setInterval(() => {
                aligntext(getmessages(log_in_id, user_id), user_id)
            }, 1000);
        })
    })
    let text = ""
    JSON.parse(localStorage.getItem("Users_")).forEach(x => {
        if (x.id != log_in_id) {
            text += `<li id=${x.id}> <p style="over-flow:hidden">${x.name.length>10?x.name.slice(0,10)+"...":x.name}
        </p> <button class="hidechatbox" onclick=aligntext(getmessages(${log_in_id},${x.id}),${x.id})>text</button></li>`
        }
    })
    $(".users").html(text)
    $(".hidechatbox").click(function(e) {
        $(".head-container-chatsbox").fadeIn(1000);
        $(".home").fadeOut(1000);
        $(".innerchats").show(1000);
        $(".input-container").show(1000);
        $(".contain").fadeOut(1500);
    });

}


function addtochats(otherid) {
    var val = $("#input").val();
    if (val.length > 0) {
        const obj = {
            id: log_in_id,
            timestamp: new Date().toString(),
            text: val
        }
        Users[findUser(log_in_id)].messages[findMessage(otherid)]
            .message.push(obj)
            // console.log(Users)
        localStorage.setItem("Users_", JSON.stringify(Users))
        aligntext(getmessages(log_in_id, otherid), otherid)
    }
    $("#input").val("")
}
$("#input").keyup(function(e) {
    const keycode = e.keyCode
    if (keycode == 13) {
        addtochats(user_id)
    }
})
$(".send_").click(function(e) {
    addtochats(user_id)
});
$(".add-btn").fadeIn();
$("#back").click(function(e) {
    clearInterval(message_checker)
    check_for_incoming_message = setInterval(() => {
        if (log_in_id && user_id) {
            _start()
                // console.log("fhdi")
        }
    }, 2000)
    _start()
    $(".innerchats").fadeOut(1000);
    $(".home").fadeIn(1000);
    $(".input-container").toggle(1000);
});


var click = 0
$(".add-btn").click(function(e) {
    $(".contain").toggle(1000, function() {
        ++click & 1 ? $(".add-btn").text("X").css("color", "red") :
            $(".add-btn").text("+").css("color", "white")
    });
})
$(".close-btn").click(function(e) {
    $(".contain").fadeOut(1000);
    $(".add-btn").text("+").css("color", "white")
});