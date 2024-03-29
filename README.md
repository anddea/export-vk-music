# Export VK music
## Usage
1. Install one of the Userscript browser extensions such as Greasemonkey, Violentmonkey, Tampermonkey, etc. 
2. Install [this userscript](https://github.com/anddea/export-vk-music/raw/main/src/vk.user.js).
3. Open any music section: your music, your playlsts, user playlists, autogenerated playlists, etc.
4. Double tap Alt key. <br><br>

## Инструкция
> [!NOTE]  
> Данное ПО автоматически прокручивает страницу и собирает все треки на странице. После чего показывает кнопки скопировать все песни, скачать текстовый файл и открыть список треков в новой вкладке. 

> [!WARNING]  
> - Если страница не прокрутилась до конца и/или не показала кнопки для экспорта, то повторите запуск (может даже несколько раз), не перезагружая страницу.
> - Если на странице несколько секций с музыкой, то скрипт может собрать не только те треки, которые нужны.
> - Плейлисты, альбомы нужно открывать в новой вкладке, а не поверх основной страницы, т е. не модальное окно.

1. **Установитe одно из расширений пользовательских скриптов в браузер**: Tampermonkey, Greasemonkey, Violentmonkey и др.
2. **Установитe [скрипт](https://github.com/anddea/export-vk-music/raw/main/src/vk.user.js)**.
3. **Откройте список треков**, которые хотите перенести 
    - своя музыка, 
    - музыка друзей, 
    - альбомы исполнителей, 
    - музыка из плейлистов, 
    - плейлисты, которые сгенерированы самим ВК, например Daily Playlist, Weekly Playlist и др.
4. Нажать дважды клавишу `Alt` непрерывно (в течение 200 мс).

<details>
  <summary>Дополнительная информация</summary>
  
  Для изменения клавиши, замените значение KEY в скрипте на любую удобную клавишу
  ```js
  const KEY = "Alt"; // control, meta, shift, a, b, c
  ```
  Чтобы импортировать в другие сервисы, воспользуйтесь любыми сервисами переноса музыки: [TuneMyMusic](https://www.tunemymusic.com/ru/), [Soundiiz](https://soundiiz.com/ru/) и др.

  Предыдущие версии скрипта находятся в папке [legacy](https://github.com/anddea/export-vk-music/tree/main/src/legacy).
</details>
