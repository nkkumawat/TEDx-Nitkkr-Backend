$(document).ready(function() {
    var video_tab = $(".video-tabs");
    var speaker_tab = $(".speaker-tabs");
    var team_tab = $(".team-tabs");
    var video_tab_open = $(".video-tab-open");
    var speakers_tab_open = $(".speakers-tab-open");
    var team_tab_open = $(".team-tab-open");
    var user = $("#email");
    var pass = $("#password");
    var error = $(".error");
    var speakers_list = $(".speakers-list");
    var video_list = $(".video-list");
    var team_list = $(".team-list");

    var checkSpeaker = false;
    var checkTeam = false;
    var checkVideo = false;


    speakers_tab_open.addClass("bottom-border");
    video_tab_open.click(function () {
        showVideo();
    });
    team_tab_open.click(function () {
        showTeam();
    });
    speakers_tab_open.click(function () {
        showSpeakers();
    });

    var showVideo = function showVideo() {
             $('.button-collapse').sideNav('hide');
            video_tab_open.addClass("bottom-border");
            video_tab.removeClass("tab-gone");
            video_tab.addClass("tab-on");
            speaker_tab.addClass("tab-gone");
            speakers_tab_open.removeClass("bottom-border");
            team_tab.addClass("tab-gone");
            team_tab_open.removeClass("bottom-border");
            if(!checkVideo) {
                checkVideo = true;
                $.get("/videos", {}, function (response) {
                    for (var i = 0; i < response.length; i++) {
                        video_list.html(video_list.html() + '<div class="col s13 m3">' +
                            '            <div class="card">' +
                            '                <div class="card-image">' +
                            '                    <iframe  src="' + response[i].video_url + '" frameborder="0" allowfullscreen></iframe>' +
                            // '                    <span class="card-title">' + response[i].title + '</span>' +
                            '                </div>' +
                            '                <div class="card-action">' +
                            '                    <button class="waves-effect waves-light btn delete-video" name="' + response[i].title + '" >Delete</button>' +
                            '                     <button class="waves-effect waves-light btn edit-video" name="' + response[i].id + '" >Edit</button>' +
                            '                </div>' +
                            '            </div>' +
                            '        </div>');
                        $(".delete-video").click(function () {
                            var data = {
                                "videoTitle": this.name
                            };
                            $.post("/delete-video", data, function (response) {
                                window.location.href = '/admin?tab=video';
                            });
                        });
                        $(".edit-video").click(function () {
                            window.location.href = '/edit?tab=video&id=' + this.name;
                        });
                    }
                });
            }
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
            if(!checkTeam) {
                checkTeam = true;
                $.get("/getteam", {}, function (response) {
                    for (var i = 0; i < response.length; i++) {
                        team_list.html(team_list.html() + '<div class="col s13 m3">' +
                            '            <div class="card">' +
                            '                <div class="card-image">' +
                            '                     <img   class="images-team" style="height: 300px" src="' + response[i].pic_url + '">' +
                            '                    <span class="card-title blue-grey">' + response[i].name + '</span>' +
                            '                </div>' +
                            '                   <div class="card-content">' +
                            '                         <p>'+response[i].position+'</p>' +
                            '                   </div>' +
                            '                <div class="card-action">' +
                            '                    <button class="waves-effect waves-light btn delete-team" name="' + response[i].name + '" >Delete</button>' +
                            '                    <button class="waves-effect waves-light btn edit-team" name="' + response[i].id + '" >Edit</button>' +
                            '                </div>' +
                            '            </div>' +
                            '        </div>');
                        $(".delete-team").click(function () {
                            var data = {
                                "memberName": this.name
                            };
                            $.post("/delete-team", data, function (response) {
                                window.location.href = '/admin?tab=team';
                            });
                        });
                        $(".edit-team").click(function () {
                            window.location.href = '/edit?tab=team&id=' + this.name;
                        });
                    }
                });
            }
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
           if(!checkSpeaker) {
               checkSpeaker = true;
               $.get("/speakers", {}, function (response) {
                   for (var i = 0; i < response.length; i++) {
                       speakers_list.html(speakers_list.html() + ' ' +
                           '' +
                           '         <div class="col s13 m3 ">' +
                           '            <div class="card">' +
                           '                <div class="card-image">' +
                           '                    <img class="responsive-img" style="height: 300px" class="images-speakers" src="' + response[i].pic_url + '">' +
                           '                    <span class="card-title namespeaker blue-grey " style="color: #fff; padding: -10px"><b>' + response[i].name + '</b></span>' +
                           '                </div>' +
                           '                <div class="card-content">' +
                           '                    <p>' + response[i].description.substr(0, 40) + '</p>' +
                           '                </div>' +
                           '                <div class="card-action">' +
                           '                    <button class="waves-effect waves-light btn  delete-speakers" name="' + response[i].name + '" >Delete</button>' +
                           '                  <button class="waves-effect waves-light btn  edit-speakers" name="' + response[i].id + '" >Edit</button>' +
                           '                </div>' +
                           '            </div>' +
                           '        </div>' +
                           '   ');
                       $(".delete-speakers").click(function () {
                           var data = {
                               "speakerName": this.name
                           };
                           $.post("/delete-speaker", data, function (response) {
                               window.location.href = '/admin?tab=speakers';
                           });
                       });
                       $(".edit-speakers").click(function () {
                           window.location.href = '/edit?tab=speakers&id=' + this.name;
                       });
                   }
               });
           }
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
    if(tab === "speakers") {
        showSpeakers();
    }else if(tab === "team") {
        showTeam()
    }else if(tab === "video") {
        showVideo();
    }else {
        showSpeakers();
    }



    $(".login-btn").click(function(){
        console.log(pass.val());
        var data = {
            "user": user.val(),
            "password": pass.val()
        };
        $.post("/login",data, function(status){
            if(status.result === "NotFound") {
                error.html("Username or password not match");
            }else {
                window.location.href = '/admin';
            }
        });
    });
    $('.button-collapse').sideNav();

});
