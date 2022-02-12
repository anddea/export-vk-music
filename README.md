# Export VK music to Text
## Usage
Open any playlist you want to export. Run [this script](https://raw.githubusercontent.com/anddea/export-vk-music/main/vk.js) in browser console.  
> *To open console press F12 or Ctrl + Shift + J (Windows, Linux), Cmd + Shift + J (Mac).*

## How it works
It will scroll to bottom of page and create buttons to copy, download and open list of tracks in new tab.

## Copy code
```js
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
        copyBtn.innerText = "Скопировано";
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
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
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

var scrollDirection = 200;

function pageScroll() {
    setTimeout(function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(function () {
                var artist = document.getElementsByClassName("audio_row__performers")
                var song = document.getElementsByClassName("audio_row__title_inner")
                list = new Array()

                for (var i = 0; i < artist.length; i++) {
                    list[i] = artist[i].firstElementChild.innerText + ' - ' + song[i].innerText
                }

                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    console.log("Кол-во песен:", artist.length)

                    var performersParent = document.getElementsByClassName("audio_row__performers")[document.getElementsByClassName("audio_row__performers").length - 1].parentElement.parentElement.parentElement.parentElement.parentElement;

                    if (!document.querySelector("#copyBtn")) {
                        // Info
                        var info = document.createElement('div');
                        info.innerText = "Количество треков на странице: " + artist.length;
                        info.style.paddingTop = "1rem";
                        performersParent.append(info);

                        // Copy
                        var copyBtn = document.createElement('a');
                        copyBtn.id = "copyBtn";
                        copyBtn.innerText = "Скопировать все треки";
                        copyBtn.style.paddingRight = "1rem";
                        copyBtn.style.display = "inline-block";
                        performersParent.append(copyBtn);

                        copyBtn.addEventListener('click', function (event) {
                            copyTextToClipboard(list.join('\n'));

                            setTimeout(function () {
                                copyBtn.innerText = "Скопировать все треки";
                            }, 2000);
                        });

                        // Download
                        var downloadBtn = document.createElement('a');
                        downloadBtn.innerText = "Скачать текстовый файл";
                        downloadBtn.style.paddingRight = "1rem";
                        downloadBtn.style.display = "inline-block";
                        downloadBtn.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(list.join('\n')));
                        downloadBtn.setAttribute('download', "VK music.txt");
                        performersParent.append(downloadBtn);

                        // Open in new tab
                        var openBtn = document.createElement('a');
                        openBtn.innerText = "Открыть в новой вкладке";
                        openBtn.style.paddingRight = "1rem";
                        openBtn.style.display = "inline-block";
                        performersParent.append(openBtn);

                        openBtn.addEventListener('click', function (event) {
                            window.open().document.write(list.join('<br/>'))
                        });
                    }
                }

            }, 500);

            return false;
        }

        window.scrollBy(0, scrollDirection);
        scrolldelay = setTimeout('pageScroll()', 1);
    }, 150)
}

pageScroll();
```

