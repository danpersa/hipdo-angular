$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active');
    $('.row-offcanvas').toggleClass('col-xs-1');
    $('.row-offcanvas').toggleClass('col-xs-6');
  });
});