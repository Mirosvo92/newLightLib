// _('.header__element, .header__element-item');
// _('.header').addMyClass('test');
// _('.header__element-item').addEvent('click', function() {
//     this.style.color = 'red'
// });

_(document).onAddEvent('click', '.header__element-item' ,function(){
    _(this).addMyClass('test');
    this.style.color = 'red'
});
