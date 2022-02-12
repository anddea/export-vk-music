# Export VK music to Text
## Usage
Open any playlist you want to export. Run [this script](https://raw.githubusercontent.com/anddea/export-vk-music/main/vk.js) or [copy code below](#copy-code) and paste it in browser console.  
> *To open console press F12 or Ctrl + Shift + J (Windows, Linux), Cmd + Shift + J (Mac).*

## How it works
It will scroll to bottom of page and create buttons to copy, download and open list of tracks in new tab.

## Copy code
```js
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.display = "none";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'успешно' : 'с ошибкой';
        console.log('F: Скопировано ' + msg);
        copyBtn.innerText = "Скопировано";
    } catch (err) {
        console.error('F: Ошибка: ', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        copyBtn.innerText = "Скопировано";
        console.log('A: Скопировано');
    }, function (err) {
        console.error('A: Ошибка: ', err);
    });
}

var scrollDirection = 200;

function pageScroll() {
    setTimeout(function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(function () {
                let length = document.getElementsByClassName("audio_row__performers").length;
                if (length > 0) {
                    var artist = document.getElementsByClassName("audio_row__performers")
                    var song = document.getElementsByClassName("audio_row__title_inner")
                    list = new Array()

                    for (var i = 0; i < artist.length; i++) {
                        list[i] = artist[i].firstElementChild.innerText + ' - ' + song[i].innerText
                    }

                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        var performersParent = document.getElementsByClassName("audio_row__performers")[length - 1].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

                        if (!document.querySelector("#copyBtn")) {
                            // Info
                            var info = document.createElement('div');
                            info.id = "info";
                            info.style.width = "70%";
                            info.innerHTML = "Количество треков на странице: " + artist.length + "<br><span style='font-size: 8pt; opacity: 0.7;'>Если на странице есть несколько секций, то в список могут попасть не только те треки, которые нужны.</span>";
                            info.style.margin = "1rem 0 .2rem";
                            performersParent.append(info);

                            // Copy
                            var copyBtn = document.createElement('a');
                            copyBtn.id = "copyBtn";
                            copyBtn.innerText = "Скопировать";
                            copyBtn.style.margin = ".2rem 0";
                            copyBtn.style.marginRight = "1rem";
                            copyBtn.style.display = "inline-block";
                            performersParent.append(copyBtn);

                            copyBtn.addEventListener('click', function (event) {
                                copyTextToClipboard(list.join('\n'));

                                setTimeout(function () {
                                    copyBtn.innerText = "Скопировать";
                                }, 2000);
                            });

                            // Download
                            var downloadBtn = document.createElement('a');
                            downloadBtn.id = "downloadBtn";
                            downloadBtn.innerText = "Скачать ";
                            downloadBtn.style.margin = ".2rem 0";
                            downloadBtn.style.marginRight = "1rem";
                            downloadBtn.style.display = "inline-block";
                            downloadBtn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(list.join('\n')));
                            downloadBtn.setAttribute('download', "VK music.txt");
                            performersParent.append(downloadBtn);

                            // Open in new tab
                            var openBtn = document.createElement('a');
                            openBtn.id = "openBtn";
                            openBtn.innerText = "Открыть";
                            openBtn.style.margin = ".2rem 0";
                            openBtn.style.marginRight = "1rem";
                            openBtn.style.display = "inline-block";
                            performersParent.append(openBtn);

                            openBtn.addEventListener('click', function (event) {
                                window.open().document.write(list.join('<br/>'))
                            });

                            document.getElementById("copyBtn").scrollIntoView({ block: "center", behavior: "smooth" });
                            
                            document.getElementById("info").onmouseover = function () {
                                showTooltip(this, { text: 'Если на странице есть несколько секций, то в список могут попасть не только те треки, которые нужны', black: 1, noZIndex: true, needLeft: false });
                            };

                            document.getElementById("copyBtn").onmouseover = function () {
                                showTooltip(this, { text: 'Скопировать список треков в буфер обмена', black: 1, noZIndex: true, needLeft: false });
                            };

                            document.getElementById("downloadBtn").onmouseover = function () {
                                showTooltip(this, { text: 'Скачать список треков в текстовом файле', black: 1, noZIndex: true, needLeft: false });
                            };

                            document.getElementById("openBtn").onmouseover = function () {
                                showTooltip(this, { text: 'Открыть список треков в новой вкладке', black: 1, noZIndex: true, needLeft: false });
                            };
                            // window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                        }
                    }
                } else { alert("На этой странице не найдено песен") }

            }, 500);

            return false;
        }

        window.scrollBy(0, scrollDirection);
        scrolldelay = setTimeout('pageScroll()', 1);
    }, 150)
}

pageScroll();
```

