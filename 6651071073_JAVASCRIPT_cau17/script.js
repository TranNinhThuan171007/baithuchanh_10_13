$(function () {
  function toggleSection($heading) {
    const $panel = $heading.next(".box");
    const isOpen = $heading.attr("aria-expanded") === "true";

    $("h3").attr("aria-expanded", "false").not($heading).next(".box").stop(true, true).slideUp();
    if (isOpen) {
      $heading.attr("aria-expanded", "false");
      $panel.stop(true, true).slideUp();
    } else {
      $heading.attr("aria-expanded", "true");
      $panel.stop(true, true).slideDown();
    }
  }

  $("h3").on("click", function () { toggleSection($(this)); });
  $("h3").on("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSection($(this));
    }
  });
});
