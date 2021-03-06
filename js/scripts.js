$(document).ready(function () {
    
    window.displayStreams = function (e) {
        if (e.value == "all") {
            $(".content-online").show();
            $(".content-offline").show();
        }
        else if (e.value == "hideOnline") {
            console.log("hideOnline");
            $(".content-online").hide();
            $(".content-offline").show();
        }
        else if (e.value == "hideOffline") {
            $(".content-offline").hide();
            $(".content-online").show();
        }
    }
    var streamers = ["GalacticElliot", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var clientId = '3vrsrcu7vsyvtxv2uhcb8bpyou3fxwr';
    streamers.forEach(function (streamer,clientId) {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + "?client_id=3vrsrcu7vsyvtxv2uhcb8bpyou3fxwr", function (streamInfo) {
            console.log(streamInfo);
            if (streamInfo.stream == null) {
                offlineStream(streamer);
                console.log(streamer + "offline");
            }
            else {
                onlineStream(streamInfo);
                console.log(streamer + "online");
            }
        });
    });
});

function offlineStream(streamer) {
    $.getJSON("https://api.twitch.tv/kraken/channels/" + streamer + "?client_id=3vrsrcu7vsyvtxv2uhcb8bpyou3fxwr", function (channelInfo) {
        var html = "<a target = '_blank' href = " + channelInfo.url + "><div class = 'row style style-offline'><div class = 'col-md-2'><img src = " + channelInfo.logo + "></div><div class = 'col-md-10'><p>"+streamer+"<br>Offline</p></div></div></a>";
        $(".content-offline").append(html);
    });
}

function onlineStream(data) {
    var html = "<a target = '_blank' href ="+data.stream.channel.url+"><div class = 'row style style-online'><div class = 'col-md-2'><img src = "+data.stream.channel.logo+"></div><div class ='col-md-10'><p>"+data.stream.channel.display_name +"<br> "+data.stream.channel.status +"</p></div></div></a>";
    $(".content-online").append(html);
}