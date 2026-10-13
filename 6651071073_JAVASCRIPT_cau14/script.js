$(function () {
  const $switch = $("#myonoffswitch");
  const $body = $("body");

  function updateTheme() {
    $body.toggleClass("dark-background", $switch.prop("checked"));
  }

  $switch.on("change", updateTheme);
  updateTheme();
});
