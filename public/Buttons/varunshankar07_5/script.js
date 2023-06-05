$('.activate').on('click touch', function(e) {
    var self = $(this);
    if(!self.hasClass('loading')) {
        self.addClass('loading');
        setTimeout(function() {
            self.addClass('done');
            setTimeout(function() {
                self.removeClass('loading done');
            }, 1600);
        }, 3200);
    }
});