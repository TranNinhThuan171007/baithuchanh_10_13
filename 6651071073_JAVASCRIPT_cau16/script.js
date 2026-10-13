$(function () {
  $("#user-form").on("submit", function (event) {
    event.preventDefault();

    const values = ["#name", "#email", "#datepicker"].map(function (selector) {
      return $(selector).val().trim();
    });
    if (values.some(function (value) { return !value; })) return;

    const $row = $("<tr>");
    $("<td>").append($('<input type="checkbox" class="row-select" aria-label="Select row">')).appendTo($row);
    values.forEach(function (value) { $("<td>").text(value).appendTo($row); });
    $("tbody").append($row);
    this.reset();
  });

  $(".delete-row").on("click", function () {
    $("tbody .row-select:checked").closest("tr").remove();
  });
});
