var delay = 50;
var scrollDirection = 200;

function download(filename, list) {
    var downloadBtn = document.createElement('a');
    downloadBtn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(list.join("\n")));
    downloadBtn.setAttribute('download', filename);
    downloadBtn.style.display = 'none';
    document.body.appendChild(downloadBtn);
    downloadBtn.click();
    document.body.removeChild(downloadBtn);
}

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

                    download('VK Music ' + Date() + '.txt', list);
                } else { alert("На этой странице не найдено песен") }
            }, 500);

            return false;
        }

        window.scrollBy(0, scrollDirection);
        scrolldelay = setTimeout(pageScroll(), 1);
    }, delay)
}

pageScroll();