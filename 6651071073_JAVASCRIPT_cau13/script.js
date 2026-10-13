$(function () {
  $(".password-show").on("click", function () {
    const $password = $("#password");
    const showPassword = $password.attr("type") === "password";

    $password.attr("type", showPassword ? "text" : "password");
    $(this)
      .attr("aria-pressed", showPassword)
      .attr("aria-label", showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu");
  });
});
