var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var box = document.getElementById("box");
var noUsers = [];

$.ajax({
	type: "GET",
    url: "https://api.twitch.tv/kraken/streams?channel=" + twitchUsers,
    headers: {
    	"Client-ID": 'wj5oo91lbl7l5241065j9nwwkow8gv'
    },
    success: function(data) {
    	var streams = data.streams;
    	var online = [];
    	var offline = [];

    	for(var prop in streams){
    		var name = streams[prop].channel.display_name;
    		var logo = streams[prop].channel.logo;
    		var viewers = streams[prop].viewers;
    		var status = streams[prop].channel.status;
    		var url = streams[prop].channel.url;

    		// list streamers that are online
    		online.push(name);
    		// list streamers that are offline
    		offline = twitchUsers.filter(function(val) {
	    		return online.indexOf(val) === -1;
	    	});

    		// output online streamers
    		box.innerHTML += "<a href='"+url+"' target='_blank'><div class='item online'><img src='"+logo+"'/><ul><li><h4>"+name+"</h4></li><li><span id='status'>"+status+"</span></li><li><span>viewers: "+viewers+"</span></li></ul></div></a>";    		
    	} // end for
    	
    	// output offline streamers
    	for(var i = 0; i < offline.length; i++){
    		box.innerHTML += "<a href='https://www.twitch.tv/"+offline[i]+"'><div class='item offline'><div class='offline-box'>offline</div><span id='offlineName'>"+offline[i]+"</span></div></a>";
    	}
    }
});

function allFilter() {
	$(".online").show();
	$(".offline").show();
	$("#filter li:first-child a").addClass("current");
	$("#filter li:nth-child(2) a").removeClass("current");
	$("#filter li:nth-child(3) a").removeClass("current");
}
function onlineFilter() {
	$(".online").show();
	$(".offline").hide();
	$("#filter li:nth-child(2) a").addClass("current");
	$("#filter li:first-child a").removeClass("current");
	$("#filter li:nth-child(3) a").removeClass("current");
}
function offlineFilter() {
	$(".online").hide();
	$(".offline").show();
	$("#filter li:nth-child(3) a").addClass("current");
	$("#filter li:first-child a").removeClass("current");
	$("#filter li:nth-child(2) a").removeClass("current");
}