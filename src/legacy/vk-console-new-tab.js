var delay = 50;
var scrollDirection = 200;

function pageScroll() {
    setTimeout(function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(function () {
                let length = document.getElementsByClassName("audio_row__performers").length;
                if (length > 0) {
                    var artist = document.getElementsByClassName("audio_row__performers");
                    var song = document.getElementsByClassName("audio_row__title_inner");
                    list = [];

                    for (var i = 0; i < artist.length; i++) {
                        list[i] = artist[i].firstElementChild.innerText + ' - ' + song[i].innerText;
                    }

                    window.open().document.write(list.join('<br>'));
                } else { alert("На этой странице не найдено песен") }
            }, 500);

            return false;
        }

        window.scrollBy(0, scrollDirection);
        scrolldelay = setTimeout(pageScroll(), 1);
    }, delay)
}

pageScroll();