$(document).ready(function() {

    var id_speaker = $('#id-speaker');
    var id_team = $('#id-team');
    var id_video = $('#id-video');
    var video_tab = $(".video-tabs");
    var speaker_tab = $(".speaker-tabs");
    var team_tab = $(".team-tabs");
    var video_tab_open = $(".video-tab-open");
    var speakers_tab_open = $(".speakers-tab-open");
    var team_tab_open = $(".team-tab-open");
    var name_speaker = $("#name");
    var topic_speaker = $("#topic");
    var desc_speaker = $("#description");
    var title_video = $("#title");
    var desc_video = $("#desc");
    var url_video = $("#url");
    var name_team = $("#nameofteam");
    var position_team = $("#position");
    var social_team = $("#sociallink");


    var showVideo = function showVideo() {
        $('.button-collapse').sideNav('hide');
        video_tab_open.addClass("bottom-border");
        video_tab.removeClass("tab-gone");
        video_tab.addClass("tab-on");
        speaker_tab.addClass("tab-gone");
        speakers_tab_open.removeClass("bottom-border");
        team_tab.addClass("tab-gone");
        team_tab_open.removeClass("bottom-border");
    };
    var showTeam = function showTeam() {
        $('.button-collapse').sideNav('hide');
        team_tab.removeClass("tab-gone");
        team_tab.addClass("tab-on");
        team_tab_open.addClass("bottom-border");
        speaker_tab.addClass("tab-gone");
        speakers_tab_open.removeClass("bottom-border");
        video_tab.addClass("tab-gone");
        video_tab_open.removeClass("bottom-border");
    };
    var showSpeakers = function showSpeakers() {
        $('.button-collapse').sideNav('hide');
        speaker_tab.removeClass("tab-gone");
        speakers_tab_open.addClass("bottom-border");
        speaker_tab.addClass("tab-on");
        team_tab.addClass("tab-gone");
        team_tab_open.removeClass("bottom-border");
        video_tab.addClass("tab-gone");
        video_tab_open.removeClass("bottom-border");
    };

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    var tab = getUrlParameter('tab');
    var id = getUrlParameter('id');

    if(tab === "speakers") {
        showSpeakers();
        id_speaker.val(id);
        $.get("/getspeakerbyid",{"id" : id}, function(response){
            name_speaker.val(response[0].name);
            topic_speaker.val(response[0].topic);
            desc_speaker.val(response[0].description);
            console.log(response.toString());
        });

    }else if(tab === "team") {
        showTeam();
        id_team.val(id);
        $.get("/getteambyid",{"id" : id}, function(response){
            name_team.val(response[0].name);
            position_team.val(response[0].position);
            social_team.val(response[0].link);
            console.log(response.toString());
        });

    }else if(tab === "video") {
        showVideo();
        id_video.val(id);
        $.get("/getvideobyid",{"id" : id}, function(response){
            title_video.val(response[0].title);
            desc_video.val(response[0].description);
            url_video.val(response[0].video_url);
            console.log(response.toString());
        });
    }


});