$(function () {
  $(".checkme").on("change", function () {
    const $checkbox = $(this);
    const $details = $checkbox.closest(".checkbox-card").find(".details");
    $details.prop("hidden", !this.checked);
  });
});
