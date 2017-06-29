jQuery(function ($) {
    'use strict';

    var selectBox = $(".wpdqs-search-box"),
        searchToggle = $('#wpdqs-search-box-btn'),
        searchBoxWrap = $('.wpdqs-search-box-wrap'),
        resultItems = '';

    // create list of menu item for selet2 options
    $('#adminmenu li').each(function () {

        var $this = $(this);
        var outChild = '';

        if ($this.hasClass('menu-top')) {

            if (($this.find('ul').length) == 1) {

                var curChild = $this.find('ul.wp-submenu');

                outChild += '<optgroup label="' + $this.children('a').text() + '">';
                curChild.find('a').each(function () {
                    outChild += '<option data-ref="' + $(this).attr('href') + '" value="' + $(this).text() + '">' + $(this).text() + '</option>';
                });
                outChild += '</optgroup>';

            } else {
                outChild += '<optgroup label="' + $this.text() + '">';
                outChild += '<option data-ref="' + $this.find('a').attr('href') + '" value="' + $this.text() + '">' + $this.text() + '</option>';
                outChild += '</optgroup>';
            }

        }
        // remove numbers from items
        resultItems = outChild.replace(/[0-9]/g, '');

        // final items
        selectBox.append(resultItems);

    });


    // select2 initiate
    selectBox.select2();

    // select2 open with key press
    $(document).on('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && ( e.keyCode === 32 )) {

            if (!searchToggle.hasClass('open')) {
                searchToggle.addClass('open');
                searchBoxWrap.slideDown();
                $.cookie('search__Box__toggle__cookie', 'open', { expires: 30 });
            }

            selectBox.select2('open');
        }
    });

    // search box - create menu item links
    selectBox.select2().on("change", function (e) {
        var obj = selectBox.select2("data");
        var objData = obj[0].element.outerHTML;
        window.location.href = wp_dqs_Data.admin_url + $(objData).data('ref');
    });

    // search toggle
    searchToggle.on('click', function () {
        var $this = $(this);

        if ($this.hasClass('open')) {
            $this.removeClass('open');
            searchBoxWrap.slideUp();
            $.cookie('search__Box__toggle__cookie', 'close', { expires: 30 });
        } else {
            $this.addClass('open');
            searchBoxWrap.slideDown();
            $.cookie('search__Box__toggle__cookie', 'open', { expires: 30 });
        }
    });

    // search box in first time
    if ($.cookie('search__Box__toggle__cookie') === undefined || $.cookie('search__Box__toggle__cookie') === 'open') {
        searchToggle.addClass('open');
        searchBoxWrap.slideDown('fast');
    } else {
        searchToggle.removeClass('open');
        searchBoxWrap.hide();
    }


});