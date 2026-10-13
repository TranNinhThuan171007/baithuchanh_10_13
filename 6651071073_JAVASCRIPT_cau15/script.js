$(function () {
  const $tabs = $(".tab a");
  const $panels = $(".tab-item");

  function activateTab(target) {
    $tabs.each(function () {
      const active = $(this).attr("href") === target;
      $(this).parent().toggleClass("active", active);
      $(this).attr("aria-selected", active);
    });
    $panels.hide().filter(target).show();
  }

  $tabs.on("click", function (event) {
    event.preventDefault();
    activateTab($(this).attr("href"));
  });

  activateTab($tabs.first().attr("href"));
});
