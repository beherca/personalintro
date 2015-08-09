'use strict';
var refresh = function() {
    var wh = $(window).height() - 130;

    $('.content').css('margin-top', wh);

    $('.header').headroom({
        // vertical offset in px before element is first unpinned
        offset: wh,
        // scroll tolerance in px before state changes
        tolerance: 2
    });
    $('.content').waypoint({
        handler: function(direction) {
            $('#bg-img').css('opacity', 1);
        },
        offset: wh * 0.9
    });
    $('.content').waypoint({
        handler: function(direction) {
            $('#bg-img').css('opacity', 0.5);
        },
        offset: wh * 0.4
    });
    $('.content').waypoint({
        handler: function(direction) {
            $('#bg-img').css('opacity', 0);
        },
        offset: wh * 0.3
    });
    $('.more-menu-btn').click(function(e) {
        $('.left-menu').toggleClass('open');
        // $('.main').toggleClass('pushed');
        $('body').css('overflow-y', 'hidden');
        $('.backdrop').toggleClass('show');
    });
    $('#backdrop').click(function(e) {
        $('.left-menu').toggleClass('open');
        // $('.main').toggleClass('pushed');
        $('body').removeAttr('style');
        $('.backdrop').toggleClass('show');
    }).on('touchmove', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    $('.comment-text').dotdotdot({
        height: 90,
        watch: false,
        callback: function(isTruncated, orgContent) {
            if (!$(this).parent().hasClass('dotted')) {
                $(this).parent().addClass('isTruncated dotted');
                $(this).click(function(e) {
                    var $t = $(e.currentTarget);
                    if ($t.parent().hasClass('isTruncated')) {
                        $t[0].innerHTML = orgContent.text();
                        $(this).parent().removeClass('isTruncated')
                    } else {
                        $t.parent().addClass('isTruncated')
                        $t.trigger('update');
                    }
                });
            }
        }
    });
    $('.board').waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                var $ele = $(this.element);
                $ele.addClass('show');
                if ($ele.hasClass('trend')) {
                    $.extend(Chart.defaults.global, {
                        responsive: true,
                        showTooltips: false
                    });
                    var opts = {
                        scaleShowVerticalLines: false,
                        scaleShowGridLines: false
                    };
                    var labels = [], data = [];
                    var currYear = (new Date()).getFullYear();
                    var count = 0;
                    while(count < 10){
                        var yr = currYear + count;
                        data.push(2050 - yr);
                        labels.push(yr + '年');
                        count++;
                    }
                    // Get context with jQuery - using jQuery's .get() method.
                    var ctx = $('#trend-chart').get(0).getContext('2d');
                    var data = {
                        labels: labels,
                        datasets: [{
                            label: 'My First dataset',
                            fillColor: 'rgba(220,220,220,0.2)',
                            strokeColor: 'rgba(220,220,220,1)',
                            pointColor: 'rgba(220,220,220,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(220,220,220,1)',
                            data: data
                        }]
                    };
                    // This will get the first returned node in the jQuery collection.
                    var myLineChart = new Chart(ctx).Line(data, opts);
                }
            }

        },
        offset: wh + 120
    });
    $('#course-list').on('click', function(e) {
        e.preventDefault();
        var $t = $(e.currentTarget);
        // if($t.hasClass('active')){

        // }else{
        //     $t.addClass('active');
        //     $('#ws-center').addClass('v-hide-left');
        // }
    });
};
$(function() {
    FastClick.attach(document.body);
    refresh();
    $.ajax({
        url : 'http://www.storminthecastle.com/wp-content/uploads/2011/10/guitar-icons-07.png'
    });
});

$(window).on('orientationchange resize', function() {
    //refresh();
});