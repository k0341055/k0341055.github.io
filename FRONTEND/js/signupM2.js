let sendMail = async() => {
    let email = document.getElementById("email");

    let payload = {
        email: email.value
    };

    let Status = 0;
    let Message = "";
    let result = await fetch('http://127.0.0.1:3000/ver_email', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => {
        Status = res.status;
        return res.json();
    }).catch(error => {
        console.log("fetch error");
        Message = "email格式有誤，請重新輸入";
    })

    if(Status === 200) {
        window.alert("驗證碼已寄出，請盡速至信箱收取驗證碼");
    }else if (Status === 401){
        window.alert("很抱歉，註冊失敗，您的email已被其他使用者註冊，請再次確認您的email是否正確");
    } else {
        window.alert(Message);
    }
}

let checkCode = async() => {
    let code = document.getElementById("verCode");
    let email = document.getElementById("email");

    let payload = {
        code: code.value,
        email: email.value
    };

    let Status = 0;
    let Message = "";
    let result = await fetch('http://127.0.0.1:3000/ver_code', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => {
        Status = res.status;
        return res.json();
    }).catch(error => {
        console.log("fetch error");
        Message = "sth wrong";
    })

    if(Status === 200) {
        window.alert("驗證碼輸入正確");
    }else if (Status === 201){
        window.alert("驗證碼輸入錯誤");
    }else{
        window.alert("很抱歉，註冊失敗，您尚未成為合作社社員");
    }
}
let signup = async() => {
    let acc = document.getElementById("acc");
    let phone = document.getElementById("phone");
    let line_id = "ihatejavascript";
    let line_name = "wrk";
    let email = document.getElementById("email");
    let payload = {
        line_name : line_name,
        line_id: line_id,
        acc: acc.value,
        phone: phone.value,
        email: email.value
    };
    let Status = 0;
    let Message = "";
    let result = await fetch('http://127.0.0.1:3000/authM2', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => {
        Status = res.status;
        return res.json();
    }).catch(error => {
        console.log("fetch error");
        Message = "很抱歉，註冊失敗，請您重新註冊";
    })

    if(Status === 200) {
        window.alert("恭喜您已註冊成功");
    } else {
        window.alert(Message);
    }
}