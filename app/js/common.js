$(function() {
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    $(function() {

        $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });

    });
    var src = $('.yt-video').children('iframe').attr('src');

    // when object with class open-popup is clicked...
    $('.reviews-slider .owl-item:not(.active)+.active .image').click(function(e) {
        e.preventDefault();
        // change the src value of the video
        $('.yt-video').children('iframe').attr('src', src);
    });

    // when object with class close-popup is clicked...
    $('.videos-popup .close').click(function(e) {
        e.preventDefault();
        $('.yt-video').children('iframe').attr('src', '');
    });

    (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};

            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from:            $(this).data('from'),
                    to:              $(this).data('to'),
                    speed:           $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals:        $(this).data('decimals')
                }, options);

                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;

                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};

                $self.data('countTo', data);

                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);

                // initialize the element with the starting value
                render(value);

                function updateTimer() {
                    value += increment;
                    loopCount++;

                    render(value);

                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }

                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;

                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }

                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };

        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };

        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));

    jQuery(function ($) {
        // custom formatting example
        $('.count-number').data('countToOptions', {
            formatter: function (value, options) {
                return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
            }
        });

        // start all the timers
        $('.timer').each(count);

        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        }
    });
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('Youtube', {
            events: {'onReady': onPlayerReady}
        });
    }

    $('.select').each(function() {
        const _this = $(this),
            selectOption = _this.find('option'),
            selectOptionLength = selectOption.length,
            selectedOption = selectOption.filter(':selected'),
            duration = 450; // длительность анимации

        _this.hide();
        _this.wrap('<div class="select"></div>');
        $('<div>', {
            class: 'new-select',
            text: _this.children('option:disabled').text()
        }).insertAfter(_this);

        const selectHead = _this.next('.new-select');
        $('<div>', {
            class: 'new-select__list'
        }).insertAfter(selectHead);

        const selectList = selectHead.next('.new-select__list');
        for (let i = 1; i < selectOptionLength; i++) {
            $('<div>', {
                class: 'new-select__item',
                html: $('<span>', {
                    text: selectOption.eq(i).text()
                })
            })
                .attr('data-value', selectOption.eq(i).val())
                .appendTo(selectList);
        }

        const selectItem = selectList.find('.new-select__item');
        selectList.slideUp(0);
        selectHead.on('click', function() {
            if ( !$(this).hasClass('on') ) {
                $(this).addClass('on');
                selectList.slideDown(300);

                selectItem.on('click', function() {
                    let chooseItem = $(this).data('value');

                    $('select').val(chooseItem).attr('selected', 'selected');
                    selectHead.text( $(this).find('span').text() );

                    selectList.slideUp(duration);
                    selectHead.removeClass('on');
                });

            } else {
                $(this).removeClass('on');
                selectList.slideUp(300);
            }
        });
    });

    $('.burger').on('click', function (){
        $(this).toggleClass('open');
        $('body').toggleClass('fixed')
        $('.mob-menu').toggleClass('open');
    });
    $('.menu-item > a').on('click', function (event){
        event.preventDefault();
        $(this).toggleClass('open')
        $(this).siblings('.submenu').toggleClass('open');
    })
    function windowSize(){
        if ($(window).width() <= '992'){
            if ($('.blog').length > 0) {
                $('.blog').addClass('owl-carousel');
                $(".blog").owlCarousel({
                    items: 1,
                    loop: true,
                    nav: true,
                    dots: false,
                });
            }
            if ($('.work-in').length > 0) {

                $('.work-in').addClass('owl-carousel');
                $(".work-in").owlCarousel({
                    items: 1,
                    loop: true,
                    nav: true,
                    dots: false,
                });
            }

        } else {
            if ($('.blog').length > 0) {
                $('.blog').removeClass('owl-carousel');
                $('.blog').owlCarousel('destroy');
            }
            if ($('.work-in').length > 0) {
                $('.work-in').removeClass('owl-carousel');
                $('.work-in').owlCarousel('destroy');
            }
        }
    }
    $(window).on('load resize',windowSize);

    $('.acordion-btn').on('click', function (){
        $(this).toggleClass('open').siblings('.row').toggleClass('active')
    });

    $(window).scroll(function(){
        var sticky = $('.header'),
            scroll = $(window).scrollTop();

        if (scroll >= 1) sticky.addClass('fixed-header');
        else sticky.removeClass('fixed-header');
    });
    $('.cb-value').click(function() {
        var mainParent = $(this).parent('.toggle-btn');
        if($(mainParent).find('input.cb-value').is(':checked')) {
            $(mainParent).addClass('active');
        } else {
            $(mainParent).removeClass('active');
        }

    })
    $('.map-toggler').on('click', function() {
        $('.clinics-maps').toggleClass('hide');
        $('.bars').toggleClass('hide');
        if ($('.bars').hasClass('hide')) {
            $('.toggle-label').text('Map');
        } else {
            $('.toggle-label').text('List View');
        }

    })

    if ($('.reviews-slider').length > 0) {
        $(".reviews-slider").owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            animationDuration: 0.8,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            responsive: {
                0: {
                    items: 1
                },
                762:{
                    items:2
                },
                992: {
                    item:3
                }
            }
        });
    }
    if ($('.procedures-inn').length > 0) {
        $(".procedures-inn").owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                762:{
                    items:2
                },
                992: {
                    item:3
                }
            }
        });
    }
    if ($('.videos-slider').length > 0) {
        $(".videos-slider").owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            items: 1
        });
    }

    $('.reviews-slider .owl-item:not(.active)+.active .image').on('click', function(){
        $('.videos-popup').addClass('open');
        $('.videos-popup').addClass('fixed');
    })

    $('.videos-popup .close').on('click', function(){
        $('.videos-popup').removeClass('open');
        $('body').removeClass('fixed');
    })
    var owl = $(".reviews-slider");
    $(".owl-next-new").click(function(){
        owl.trigger('owl.next');
    })
    $(".owl-prev-new").click(function(){
        owl.trigger('owl.prev');
    })
    $('.faq-ask').on('click', function (){
        $(this).toggleClass('active');
        $(this).siblings('.answer').slideToggle(300);
    });
    $('.service-tab').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.service-btn').on('click', function (){
        $(this).toggleClass('active');
        $(this).siblings('.row').slideToggle(300);
    });
    $('.service-btn2').on('click', function (){
        $(this).toggleClass('active');
        $(this).siblings('.row').slideToggle({
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        });
    });

    var wrap = $('#wrapper'),
        btn = $('.open-modal-btn');

    btn.on('click', function() {
        var modalId = $(this).data('modal');
        var modal = $('#' + modalId);
        modal.fadeIn();
    });

// close modal
    $('.modal').click(function(e) {
        wrap.on('click', function(event) {
            $('body').toggleClass('fixed')
            var select = $('.modal_content');
            if ($(event.target).closest(select).length) return;
            var modal = $('.modal:visible');
            modal.fadeOut();
            wrap.unbind('click');
        });
    });
    $('.modal .close').on('click', function (e){

        $(this).closest('.modal').hide()
        $('body').removeClass('fixed')
    })
    $('.modal .bg-close').on('click', function (){
        $(this).closest('.modal').hide()
        $('body').removeClass('fixed')
    })
    $('.open-modal-btn').on('click', function (e){
        e.preventDefault()
        $('body').addClass('fixed')
    })


});

