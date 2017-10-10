$(document).ready(function(){
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
    video_tab_open.click(function () {
        video_tab.removeClass("tab-gone");
        video_tab.addClass("tab-on");
        speaker_tab.addClass("tab-gone");
        team_tab.addClass("tab-gone");
    });
    team_tab_open.click(function () {
        team_tab.removeClass("tab-gone");
        team_tab.addClass("tab-on");
        speaker_tab.addClass("tab-gone");
        video_tab.addClass("tab-gone");
    });
    speakers_tab_open.click(function () {
        speaker_tab.removeClass("tab-gone");
        speakers_tab_open.addClass("tab-on");
        team_tab.addClass("tab-gone");
        video_tab.addClass("tab-gone");
    });
    $.get("/speakers",{}, function(response){
        for(var i = 0 ; i < response.length ; i++) {
            speakers_list.append(' <div class="col l3">\n' +
                '            <div class="card">\n' +
                '                <div class="card-image">\n' +
                '                    <img width="400" height="400"  class="images-speakers" src="'+response[i].pic_url+'">' +
                '                    <span class="card-title namespeaker blue-grey " style="color: #fff; padding: -10px"><b>'+response[i].name+'</b></span>' +
                '                </div>' +
                '                <div class="card-content">' +
                '                    <p>'+response[i].description.substr(0 , 40)+'</p>'+
                '                </div>' +
                '                <div class="card-action">' +
                '                    <button class="waves-effect waves-light btn  delete-speakers" name="'+response[i].name+'" >Delete</button>' +
                '                </div>' +
                '            </div>' +
                '        </div>');
            $(".delete-speakers" ).click(function() {
                var data =  {
                    "speakerName" : this.name
                };
                $.post("/delete-speaker" , data ,function(response){
                    location.reload();
                });
            });
        }
    });
    $.get("/videos",{}, function(response){
        for(var i = 0 ; i < response.length ; i++) {
            video_list.append('<div class="col l3">' +
                '            <div class="card">' +
                '                <div class="card-image">' +
                '                    <iframe  src="'+response[i].video_url +'" frameborder="0" allowfullscreen></iframe>' +
                '                    <span class="card-title">'+response[i].title+'</span>' +
                '                </div>' +
                '                <div class="card-action">' +
                '                    <button class="waves-effect waves-light btn delete-video" name="'+response[i].title+'" >Delete</button>' +
                '                </div>' +
                '            </div>' +
                '        </div>');
            $(".delete-video" ).click(function() {
                var data =  {
                    "videoTitle" : this.name
                };
                $.post("/delete-video" , data ,function(response){
                    location.reload();
                });
            });
        }
    });
    $.get("/getteam",{}, function(response){
        for(var i = 0 ; i < response.length ; i++) {
            team_list.append('<div class="col l3">' +
                '            <div class="card">' +
                '                <div class="card-image">' +
                '                     <img width="400" height="400"  class="images-team" src="'+response[i].pic_url+'">' +
                '                    <span class="card-title">'+response[i].name+'</span>' +
                '                </div>' +
                '                <div class="card-action">' +
                '                    <button class="waves-effect waves-light btn  delete-team" name="'+response[i].name+'" >Delete</button>' +
                '                </div>' +
                '            </div>' +
                '        </div>');
            $(".delete-team" ).click(function() {
                var data =  {
                    "memberName" : this.name
                };
                $.post("/delete-team" , data ,function(response){
                    location.reload();
                });
            });
        }
    });
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
