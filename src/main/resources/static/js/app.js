/**
 * Created by toufiq on 9/19/2021.
 */
var stompClient = null;
var lOptrns = [];
var lSigeofArray=0;


function onloadCall(param) {
    var cUrl = l_NOTIFICATION_URL + "/getUserOpenTrns/" + param;
    //console.log(cUrl);
    $.ajax({
        headers: {  'Access-Control-Allow-Origin': cUrl },
        crossDomain: true,
        //url: "http://172.20.1.58:9001/getUserOpenTrns/"+param
        url: cUrl
    }).then(function (data) {
        setOpenAppTrns(JSON.stringify(data));
    }, function () {

        alert('Notification Service is unreachable! please contact with system admin!');
    });

}


function startConnect(p) {
    //$("#easyNotify").easyNotify(options);
    var nUrl = l_NOTIFICATION_URL + "/notifications";
    if (stompClient == null) {
        //console.log(p);
        setDefaultNotificationFregment();
        var socket = new SockJS(nUrl);
        //var socket = new SockJS('http://172.20.1.58:9001/notifications');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/user/notification/' + p, function (greeting) {
                //var text=JSON.parse(greeting.body);
                //setOpenAppTrns(greeting.body);
                setOpenAppTrnsForSubscribe(greeting.body);
            });
        });

    }

}

function disconnectFromServer() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendToServer() {
    if (stompClient && stompClient.connected) {
        stompClient.send('/swns/start');
        //console.log("Send");
    }
}

function setOpenAppTrnsForSubscribe(elements)
{
    console.log("setOpenAppTrnsForSubscribe");
    var jsonData = JSON.parse(elements);
    if (jsonData.length > 0) {
        console.log(jsonData.length+" "+lSigeofArray);
        if(jsonData.length> lSigeofArray)
        {
            var n=jsonData.length- lSigeofArray;
            windowsPushNotification(n);
        }
        setOpenAppTrns(elements);
    }
}

function setOpenAppTrns(elements) {
    console.log("setOpenAppTrns");
    var jsonData = JSON.parse(elements);

    if (jsonData.length > 0) {
        lSigeofArray =jsonData.length;
        //console.log(lSigeofArray);
        //windowsPushNotification();
        //notifyMe();
        var lCounter = 0;
        lOptrns = [];
        //console.log(lOptrns);
        //$('#openAppTrnsId').val(elements);
        var nBadge = "<ul><li role='presentation' class='dropdown' id='notificationId' data-th-fragment='notifications-section'>";
        nBadge += "<a href='javascript:;' class='dropdown-toggle info-number' data-toggle='dropdown' aria-expanded='false'> <i class='fa fa-bell'>";
        nBadge += "<span class='badge bg-red' >" + jsonData.length + "</span></i></a>";
        //console.log(nBadge);
        var html = "<ul id='menu1' class='dropdown-menu list-unstyled msg_list' role='menu' >";
        for (j in jsonData) {

            //cretaeObject(jsonData[j]);
            //if(lOptrns!=null)
            //{
            //    var item = lOptrns.find(el => el.id === jsonData[j].id);
            //    if(item==null||item=='undefined')
            //    {
            //        lOptrns.push(jsonData[j]);
            //        console.log("Add New");
            //
            //
            //    }
            //
            //}else
            //{
            //    lOptrns =[];
            //    lOptrns.push(jsonData[j]);
            //}
            if (lCounter < 6) {
                var lNote;
                if (jsonData[j].note != null) {
                    lNote = jsonData[j].note;
                } else {
                    lNote = "";
                }

                html += "<li> <a href=" + jsonData[j].urlPath + ">" +
                    " <span class='' >" + jsonData[j].trnsSourceNameDetailName + "</span>" +
                    "<span class='time' >" + moment(jsonData[j].date).format('DD-MMM-YY h:mma') + "</span>" +
                    "<span class='message' >" + jsonData[j].firstName + " " + jsonData[j].lastName + " " + lNote

                    + "</span>" +
                    "</a> </li>";
            }
            lCounter++;
        }
        //console.log(jsonData.length);
        $('#openAppTrnsSize').text(lOptrns.length);
        //$('#notificationsList').val(lOptrns);


        //console.log(sessionStorage.getItem("openAppTrns"));
        //sessionStorage.setItem("openAppTrns",lOptrns);
        html += "<li> <div class='text-center' > <a href='/AYE/AppTrns/getTrns/E/1/1'>" +
            "<strong> See All Alerts</strong> <i class='fa fa-angle-right'></i> </a> </div> </li>";
        html += "</ul>";
        //

        nBadge += html + "</li></ul>";
        $("#top-navigation-notifications").html(nBadge);

    }


}

function cretaeObject(parameter) {
    var newOb = new Object();
    $.each(parameter, function (k, v) {
        newOb[k] = v;
    });
    //console.log(newOb);
    lOptrns.push(newOb);
}

function setDefaultNotificationFregment() {
    var nBadge = "<ul><li role='presentation' class='dropdown' th:id='notificationId' data-th-fragment='notifications-section'>";
    nBadge += "<a href='javascript:;' class='dropdown-toggle info-number' data-toggle='dropdown' aria-expanded='false'> <i class='fa fa-bell'>";
    nBadge += "<span></span></i></a></li></ul>";
    $("#top-navigation-notifications").html(nBadge);
}

function windowsPushNotification(count) {
    console.log("windowsPushNotification");
    var icn =$("#appIcnId").prop("src");
    //notifyMe();
    if (Notification.permission === 'granted') {
        var options = {
            //title: "HTML <a href='https://www.jqueryscript.net/tags.php?/Notification/'>Notification</a>",

            options:
            {body: "You have "+count+" New Notification in Lively Application",
                icon: icn,
                lang: 'en-US'
            }
        };

        $("#easyNotify").easyNotify(options);
    }
    else if (Notification.permission === 'default') {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        });
        //$('#allow-push-notification-bar').show();
    }

}

function notifyMe() {
    console.log(Notification.permission);
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hi there!");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Hi there!");
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}

