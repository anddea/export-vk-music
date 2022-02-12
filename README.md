# Export VK music
From any playlist, with autoscrolling and ability to save multiple ways.

## Usage
Open any playlist that you want to export in new tab (not modal window). Run [this script](https://raw.githubusercontent.com/anddea/export-vk-music/main/vk.js) or [copy code below](#copy-code) and paste it in browser console. The code creates buttons to copy, download, open in new tab and shows information how many tracks in playlist. Additionally there are snippets to [open in new tab](#open-in-new-tab) and [download text file](#download-text-file) automatically.
> *To open console press `F12` or `Ctrl + Shift + J` (Windows, Linux), `Cmd + Shift + J` (Mac) for Chromium-based browsers, `Ctrl + Shift + K` (Windows, Linux), `Cmd + Shift + K` (Mac) for Firefox.*

To change speed of scrolling edit these values
```js
var delay = 50 // milliseconds to scroll
var scrollDirection = 200 // pixels to go in given time (currently delay = 50 milliseconds) <- distance
```
*If delay value is small or scrollDirection value is big, the page may not scroll to the end and not save the entire track list but there is a way to run the same script multiple times*

## Инструкция
1. **Открыть на компе список треков**, которые хотите перенести (своя музыка, музыка друзей, альбомы исполнителей, музыка из плейлистов (нужно открывать плейлист в новой вкладке, а не поверх основной страницы (модальное окно)), даже из плейлистов, которые сгенерированы самим ВК (например Daily Playlist, Weekly Playlist и др.)).
2. **Открыть консоль**, в хромиум-подобных браузерах `F12` или `Ctrl+Shift+J` (Windows/Linux), `Cmd+Option+J`/`Cmd+Alt+J` (Mac), для Firefox `Ctrl + Shift + K` (Windows, Linux), `Cmd + Shift + K` (Mac).
3. **Вставить [скрипт](#copy-code) (Ctrl+V/Cmd+V) и запустить (Enter).** Простой скрипт: просто откроет треки в новой вкладке, улучшенный: прокрутит страницу до конца и добавит в конце треков кнопки: скопировать все песни, скачать текстовый файл и открыть список треков в новой вкладке. Дополнительно есть скрипты для автоматического [открытия треков в новой вкладке](#open-in-new-tab) и [скачивания](#download-text-file) без взаимодействия полььзователя.

Чтобы изменить скорость прокрутки, замените значения
```js
var delay = 50 // миллисекунд
var scrollDirection = 200 // пикселей для прохождения за заданное время (в данный момент delay = 50 миллисекунд)
```
*Если время маленькое или расстояние большое, страница может не прокрутиться до конца и сохранить не весь список треков, но можно запустить скрипт несколько раз*

## Copy code
#### Advanced code (creates buttons to copy, download, open in new tab and shows information how many tracks in playlist)
```js
var delay = 50;
var scrollDirection = 200;

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

function scrapeTracks() {
    var artist = document.getElementsByClassName("audio_row__performers");
    var song = document.getElementsByClassName("audio_row__title_inner");
    list = [];

    for (var i = 0; i < artist.length; i++) {
        list[i] = artist[i].firstElementChild.innerText + ' - ' + song[i].innerText;
    }

    if (document.getElementsByClassName("AudioPlaylistSnippet__body").length > 0) {
        var performersParent = [...document.querySelectorAll(".audio_row__performers")].at(-1).parentNode.parentNode.parentNode.parentNode.parentNode;
    } else {
        var performersParent = [...document.querySelectorAll(".audio_row__performers")].at(-1).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    }

    if (!document.querySelector("#copyBtn")) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {// Info
            createButtons(artist, performersParent);
        }
    } else {
        document.querySelector("#copyBtn").nextSibling.nextSibling.remove();
        document.querySelector("#copyBtn").nextSibling.remove();
        document.querySelector("#copyBtn").previousSibling.remove();
        document.querySelector("#copyBtn").remove();
        pageScroll();
    }
}

function createButtons(artist, performersParent) {
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
    downloadBtn.setAttribute('download', 'VK Music ' + Date() + '.txt');
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
}

function pageScroll() {
    setTimeout(function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setTimeout(function () {
                let length = document.getElementsByClassName("audio_row__performers").length;
                if (length > 0) {
                    scrapeTracks();
                } else { alert("На этой странице не найдено песен") }
            }, 500);

            return false;
        }

        window.scrollBy(0, scrollDirection);
        scrolldelay = setTimeout(pageScroll(), 1);
    }, delay)
}

pageScroll();
```

#### Open in new tab
```js
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
```

#### Download text file
```js
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
```
