load = () ->
  $.ajax({
    url: "http://sub-tan.appspot.com/sub_bot/allinfo/",
    type: "GET",
    cache: false,
    datatype: "HTML",
    success: (res) ->
      $("tbody").replaceWith($(res.responseText).find("tbody"))
      $(".loading").remove()
      $('#table_id').DataTable({
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
        })
    })

$(document).ready(load)
