'use strict';
var refresh = function() {
    //window hight
    var wh = $(window).height() - 130;
    //set content's margin-top equal to window minus offset =130
    $('.content').css('margin-top', wh);

    $('.header').headroom({
        // vertical offset in px before element is first unpinned
        offset: wh,
        // scroll tolerance in px before state changes
        tolerance: 2
    });

    //first waypoint to show the cristal clear background
    $('.content').waypoint({
        handler: function(direction) {
            $('#bg-img').css('opacity', 1);
        },
        offset: wh * 0.9
    });

    //second waypoint to slowly blur the clear background, so user see blured bg underbeneth
    $('.content').waypoint({
        handler: function(direction) {
            $('#bg-img').css('opacity', 0.5);
        },
        offset: wh * 0.4
    });

    //third waypoint hide the clear background completely
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
};
var initData = function(){
    var date = new Date();
    $('#date').text([date.getFullYear(), date.getMonth(), date.getDay()].join('-'));
};
$(function() {
    FastClick.attach(document.body);
    initData();
    refresh();
});

$(window).on('orientationchange resize', function() {
    refresh();
});