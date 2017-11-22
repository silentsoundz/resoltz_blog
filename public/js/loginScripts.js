console.log('login script is loaded');
$('.loginForm').find('input, textarea').on('keyup blur focus', function (event) {
  let $this = $(this),
    label = $this.prev('label');

  if (event.type === 'keyup') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.addClass('active highlight');
    }
  } else if (event.type === 'blur') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.removeClass('highlight');
    }
  } else if (event.type === 'focus') {
    if ($this.val() === '') {
      label.removeClass('highlight');
    } else if ($this.val() !== '') {
      label.addClass('highlight');
    }
  }
});

$('.tab a').on('click', function (event) {
  event.preventDefault();
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  target = $(this).attr('href');
  $('.tab-content > div').not(target).hide();
  $(target).fadeIn(600);
});
