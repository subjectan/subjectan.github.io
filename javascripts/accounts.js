(function() {
  var load;

  load = function() {
    return $.getJSON("http://sub-tan.appspot.com/sub_bot/allinfo.json",
      function(json){
        console.log($(json["sub_tan"]["friends"]).toArray());
        $.each(json, function(k, val) {
          friendList = $(val['friends']).toArray().map(function(u){
            return '<a href="http://twitter.com/' + u + '">@' + u + '</a>';
          }).join(", ");
          console.log(friendList);
          $("tbody").append('<tr>' +
            '<td style="width: 350px;">' + val['display_name'] + '</td>' +
            '<td style="width: 200px;"><a href="https://twitter.com/' + val['screen_name'] + '">@' + val['screen_name'] + '</a></td>' +
            '<td>' + val['followings'] + '</td>' +
            '<td>' + val['followers'] + '</td>' +
            '<td style="width: 100px;">' + val['ff_ratio'] + '</td>' +
            '<td style="width: 100px;">' + val['created_at'] + '</td>' +
            '<td>' + val['active_rate'] + '</td>' +
            '<td style="width: 350px;">' + friendList + '</td>' +
            '</tr>');
          $(".loading").remove();
        });

        return $('#table_id').DataTable({
          "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
        });
      });
  };

  $(document).ready(load);

}).call(this);
