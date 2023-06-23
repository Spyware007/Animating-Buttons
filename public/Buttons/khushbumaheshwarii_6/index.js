$("input[type='checkbox']").change(function () {
    if ($(this).is(":checked")) {
      $(this).parent().addClass("turnOn");
    } else {
      $(this).parent().removeClass("turnOn");
    }
  });
  