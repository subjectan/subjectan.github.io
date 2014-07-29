(function() {
  var load;

  load = function() {
    return $.ajax({
      url: "http://sub-tan.appspot.com/sub_bot/allinfo/",
      type: "GET",
      cache: false,
      datatype: "HTML",
      success: function(res) {
        $("tbody").replaceWith($(res.responseText).find("tbody"));
        $(".loading").remove();
        return $('#table_id').DataTable({
          "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
        });
      }
    });
  };

  $(document).ready(load);

}).call(this);
