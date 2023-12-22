// ==UserScript==
// @name            Export VK Music
// @version         3.1
// @description     Userscript for exporting VK music to text
// @author          Aaron Veil
// @match           *://vk.com/*
// @icon            https://vk.com/favicon.ico
// @homepageURL     https://github.com/anddea/export-vk-music
// @supportURL      https://github.com/anddea/export-vk-music/issues
// @updateURL       https://raw.githubusercontent.com/anddea/export-vk-music/main/src/vk.user.js
// @downloadURL     https://raw.githubusercontent.com/anddea/export-vk-music/main/src/vk.user.js
// @grant           none
// ==/UserScript==

(() => {
  "use strict";

  // VARIABLES
  // Constants
  const KEY = "Alt";
  const DELAY = 50;
  const SCROLL_DIRECTION = 200;

  // State variables
  let last, list = [];

  const tooltips = {
    copyBtn: "Скопировать список треков в буфер обмена",
    downloadBtn: "Скачать список треков в текстовом файле",
    openBtn: "Открыть список треков в новой вкладке",
  };

  // FUNCTIONS
  const fallbackCopyTextToClipboard = text => {
    const textArea = document.body.appendChild(document.createElement("textarea"));
    textArea.value = text;
    textArea.style = "display:none";
    textArea.select();

    try {
      document.execCommand("copy") && (copyBtn.innerText = "Скопировано");
    } catch (err) {
      console.error("F: Ошибка: ", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const copyTextToClipboard = text =>
    navigator.clipboard
      ? navigator.clipboard
          .writeText(text)
          .then(() => (copyBtn.innerText = "Скопировано"))
          .catch((err) => console.error("A: Ошибка: ", err))
      : fallbackCopyTextToClipboard(text);

  const createButton = (id, text, onClick) => {
    const button = document.createElement("a");
    button.id = id;
    button.innerText = text;
    button.style.cssText = "margin:.2rem 0;margin-right:1rem;display:inline-block";
    button.addEventListener("click", onClick);
    // performersParent.appendChild(button);
    return button;
  };

  const getLastParent = (element, levels) => levels >= 0 ? Array.from({ length: levels + 1 }).reduce((parent, _) => parent?.parentNode, element) : null;

  const appendButtons = artist => {
    const performersParent = document.getElementsByClassName("AudioPlaylistSnippet__body").length > 0
      ? getLastParent([...document.querySelectorAll(".audio_row__performers")].at(-1), 4)
      : getLastParent([...document.querySelectorAll(".audio_row__performers")].at(-1), 8);

    ["info", "copyBtn", "downloadBtn", "openBtn"].forEach(id => document.getElementById(id)?.remove());

    const info = document.createElement("div");
    info.id = "info";
    info.style.cssText = "width:70%;margin:1rem 0 .2rem";
    info.innerHTML = `Количество треков на странице: ${artist.length}<br><span style='font-size: 8pt; opacity: 0.7;'>Если на странице есть несколько секций, то в список могут попасть не только те треки, которые нужны.</span>`;
    performersParent.appendChild(info);

    performersParent.appendChild(createButton("copyBtn", "Скопировать", () => {
      copyTextToClipboard(list.join("\n"));
      setTimeout(() => copyBtn.innerText = "Скопировать", 2000);
    }));

    performersParent.appendChild(createButton("downloadBtn", "Скачать", () => {
      downloadBtn.href = `data:text/plain;charset=utf-8,${encodeURIComponent(list.join("\n"))}`;
      downloadBtn.download = `VK Music ${new Date()}.txt`;
    }));

    performersParent.appendChild(createButton("openBtn", "Открыть", () => window.open().document.write(list.join("<br/>"))));

    document.getElementById("info").scrollIntoView({ block: "center", behavior: "smooth" });

    ["copyBtn", "downloadBtn", "openBtn"].forEach(id => document.getElementById(id)?.addEventListener("mouseover", () =>
      showTooltip(document.getElementById(id), { text: tooltips[id], black: 1, noZIndex: true, needLeft: false })
    ));
  };

  const scrapeTracks = () => {
    const artist = document.getElementsByClassName("audio_row__performers");
    const song = document.getElementsByClassName("audio_row__title_inner");
    list = Array.from(artist).map(
      (el, i) => `${el.firstElementChild.innerText} - ${song[i].innerText}`
    );

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight)
      appendButtons(artist);
  };

  const pageScroll = () => setTimeout(() => {
    Array.from(document.getElementsByClassName("ui_tab")).forEach(el => el.setAttribute("target", "_blank"));

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setTimeout(() => document.getElementsByClassName("audio_row__performers").length > 0 ? scrapeTracks() : alert("На этой странице не найдено песен"), 500);
    } else {
      window.scrollBy(0, SCROLL_DIRECTION);
      setTimeout(() => pageScroll(), 1);
    }
  }, DELAY);

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === KEY.toLowerCase()) {
      last = e.key === last ? confirm('Данная страница прокрутится в самый низ и создаст кнопки для экспорта треков. \n\nЕсли страница не прокрутилась до конца, запустите ещё раз. \n\nПродолжить?') && pageScroll() : e.key;
      setTimeout(() => (last = 'none'), 200);
    }
  });
})();