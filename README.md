# Geometry Dash Webport

<img width="960" height="540" alt="In-game screenshot" src="https://github.com/user-attachments/assets/081fad5c-7e96-46fe-981a-7f54fb62e6df" />

</p>

> A browser version of Geometry Dash that lets you play without installing anything.

## Play Online

**[Play Geometry Dash](https://gd-webport.pages.dev/)**

Open the link, wait for the game to load, and start playing.

**Offline support:**
- **Downloaded version:** The first load requires an Internet connection. Download `index.html`, open it in your browser while online, and let the game finish loading. After that, you can reopen the same file without an Internet connection.
- **Hosted version:** After the first complete online load, a Service Worker caches the necessary game files, allowing you to play offline. This requires the browser to retain the cached files.

Online features, such as searching for and accessing online levels, still require an Internet connection.

### Official URL

My official URL is always **https://gd-webport.pages.dev/** and it will never change. If you find a similar URL that only changes one character or has a minimal difference, it is not mine. Any `.pages.dev` address is a subdomain that anyone can create with Cloudflare Pages, so those domains don't belong to me. If you want to play my version, only trust this link.

## Updating

The online version is updated whenever changes are published.

### Using a downloaded copy?

Keep in mind that a downloaded copy can also become outdated. I sometimes change the game's assets to make improvements, optimizations, and other tweaks, and an older copy may become incompatible with the new assets or with the current online version. When that happens, the game can look different or stop working as expected. If you run into that, try the online version first or download the latest [index.html](index.html).

Downloaded files and forks don't update automatically. To get the latest version, you can:

* **Play online:** Open the [webport](https://gd-webport.pages.dev/).
* **Download the latest file:** Open [index.html](index.html) in this repository, click the download icon, and open the file in your browser.

You can delete older downloaded copies once you've switched to the new version.

## Requirements

* An up-to-date web browser.
* JavaScript enabled.
* A compatible computer, tablet, or smartphone.
* An Internet connection for the initial load and online features.

## Browser Compatibility

The webport is intended for modern browsers on both desktop and mobile devices.

| Browser                       | Compatibility    |
| ----------------------------- | ---------------- |
| Google Chrome                 | Supported        |
| Microsoft Edge                | Supported        |
| Mozilla Firefox               | Supported        |
| Brave                         | Supported        |
| Other Chromium-based browsers | Likely supported |

The browser must, without fail, be compatible with the JSPI feature.

The game can also be played on mobile phones. Performance, controls, and compatibility may vary depending on your device and browser.

## Mobile Support

The port runs on phones and tablets with touch controls, plus these
mobile-specific behaviours:

* **Safe areas and dynamic viewport:** the frame accounts for notches, rounded
  corners and gesture bars, and no longer jumps when the mobile URL bar
  collapses. Pull-to-refresh and iOS rubber-banding are disabled so they cannot
  interrupt a run.
* **Pinch-zoom:** suppressed on iOS, where `user-scalable=no` is ignored.
* **Keyboard button (⌨):** the search bar, level names and account login are
  drawn inside the canvas, so mobile browsers never show a keyboard. Tap ⌨ to
  open the system keyboard and type; Backspace, Enter and Escape work as usual.
* **Pause button (⏸):** on mobile, it sends Escape to open the pause menu while
  a level is running.
* **Saving:** progress is also flushed on `pagehide`, which is the only reliable
  hook on iOS Safari.
* **Performance:** MSAA is disabled (the largest avoidable GPU cost at 1080p)
  and the render buffer can be scaled down before boot.

  Thanks @CloudCompile for contributing and making mobile support possible.

## Game Information

| Feature               | Details               |
| --------------------- | --------------------- |
| Name                  | Geometry Dash Webport |
| Type                  | Webport / HTML        |
| Geometry Dash version | 2.2091                |
| Platform              | Web browser           |
| Technologies          | HTML5, JavaScript     |

## Troubleshooting

**Blank screen:** Reload the page using `Ctrl + F5`.

**The game gets stuck loading on the first visit:** Check your Internet connection and try again.

**The game won't load offline:** Make sure you have previously opened the game while connected to the Internet and allowed it to finish loading completely. If you're using the downloaded version, open `index.html`. If you're using the hosted version, open the game through the official URL using the same browser you used for the initial load.

**Low performance:** Close other applications or try another browser. If the game still lags, add `?res=low` to the end of the address you normally use to open it. For example, if you play online, it would look like `https://gd-webport.pages.dev/?res=low`. If you use a downloaded copy, add it to the end of that file's address instead. If you don't add `?res=`, the game always runs at high quality by default.

**Changes aren't showing up:** Force a reload with `Ctrl + F5`.

**An old downloaded copy isn't working:** Try the online version or download the latest `index.html` file.

If the problem continues, it could be related to your browser or the service hosting the game.

## URL parameters

Parameters are small options you add to the end of the game's web address to change how it runs. You don't need to install anything. Just add them to the link and press Enter.

The first one starts with `?`. If you want to use more than one, join them with `&`. Example: `https://gd-webport.pages.dev/?res=low&noauto`

### For players

| Parameter | What it does |
|---|---|
| `?res=low` | Lowers the game's resolution to about two thirds of normal. The image looks a bit less sharp, but the game runs faster. Use this first if the game lags. |
| `?res=med` | Same idea, but a lighter reduction (three quarters of normal). |
| `?res=high` | Full resolution. |
| `?res=0.5` | Sets the resolution yourself. Use any number from 0.25 to 1, where 1 is full resolution and lower numbers are faster but blurrier. |
| `?res=auto` | Lets the game choose by itself (this is what happens if you don't add `?res`). |
| `?noauto` | Turns off the automatic saving that happens every so often. Use it only if you notice small freezes caused by autosave. Be careful: you may lose progress if the page closes. |
| `?perf` | Shows performance numbers (FPS, frame time, input delay, memory use and more) in a bar at the top of the screen. Useful to check how well the game runs on your device. |
| `?aa=1` | By default the game turns off edge smoothing (antialiasing) and asks your browser to use your high-performance graphics card, to run faster. This brings back your browser's normal behavior, which can look a bit smoother but may run slower. |

### Advanced and debugging

| Parameter | What it does |
|---|---|
| `?debug` | Turns on debug mode: shows a console on screen and records detailed technical messages. Useful when you report a bug in the Issues section. |
| `?debug&hostlog` | Only works together with `?debug`. Also sends some of the debug messages to the page's debug log. Meant for developers. |
| `?proxy=<address>` | Chooses which of the project's proxy servers (the intermediate servers the game uses to reach Geometry Dash's servers) you want to use. Only addresses from the project's built-in list are accepted, and your choice is saved in your browser. |
| `?jobs=4` | Sets how many tasks the game runs at the same time, from 1 to 8 (default is 2). For advanced users. |
| `?noscramjet` | Turns off Scramjet, an extra tool the page can use to route its connections. Only try it if something fails to load. |
| `?sw=0` | Stops the page from registering its service worker (a background helper that browsers use, for example, to keep files saved for offline use). |
| `?noescfix` | Turns off a workaround for a crash that can happen when you press Esc on the Level Complete screen of official and online levels. Only try this if Esc behaves strangely. |

If you don't add `?res`, the game picks a resolution by itself depending on your device (devices with 4 GB of RAM or less get a lower one). If the game lags, try `?res=low`.

## Offline Mode and Limitations

Offline mode works for the downloaded `index.html` file and, since the mobile update, for the hosted version too: after one complete online load the page installs a small service worker (skip it with `?sw=0`) that keeps the game shell available, so the cached chapters can be opened with no connection.

Keep these limitations in mind:

* **Online levels:** Searching for and accessing online levels requires an Internet connection.
* **New songs:** Downloading new songs requires an Internet connection.
* **Browser cache:** Offline play depends on the cached game files remaining available.
* **Cleared site data:** If you clear your browser's cache or site data, you may need to load the game online again.
* **Browser changes:** The cached files are not automatically shared between browsers. Open the game in the same browser you used for the initial load.

Offline availability depends on your browser retaining the necessary files. It is not guaranteed if the cache is cleared or the browser removes stored resources.

## Reporting Bugs

Found a bug while playing? You can report it in the repository's Issues section to help improve the game.

**[Report a Bug](https://github.com/Ale7208/Geometry-Dash-webport/issues)**

When reporting a bug, please explain what happened and, if possible, how to reproduce it. **If the bug is visual, please include a screenshot** to help identify the issue.

### Contributing

I cannot guarantee that I will be able to fix every reported issue, as some problems may be beyond my programming knowledge or available resources.

If you have programming experience, you are welcome to contribute by submitting a Pull Request with fixes or improvements.

If you have a subscription to an AI coding tool such as **Claude Code**, you can also help me fix issues and develop improvements for the project.

If you don't have access to a paid tool, you can use a capable AI specialized in coding. Not all AI tools have the same programming abilities, so I recommend using reliable tools that can properly work with existing codebases.

All contributions are appreciated and will be reviewed before being merged into the project.

### Response times

I usually take about 1 day to reply to issues. If you posted one and it's been more than a day without an answer, it could be for a few reasons: I might be inactive for a while, or I may have already read it and added it to my list of issues to fix later.

Fixing an issue can take me up to 2 weeks at most. I love seeing people enjoy my modded version of Bog's port, so every report matters, even if I don't reply right away.

**Note:** I speak Spanish, so if your issue is written in another language, I will use a translator to understand and review it. However, reports in Spanish are preferred.
### Response times

I usually take about 1 day to reply to issues. If you posted one and it's been more than a day without an answer, it could be for a few reasons: I might be inactive for a while, or I may have already read it and added it to my list of issues to fix later.

Fixing an issue can take me up to 2 weeks at most. I love seeing people enjoy my modded version of Bog's port, so every report matters, even if I don't reply right away.

**Note:** I speak Spanish, so if your issue is written in another language, I will use a translator to understand and review it. However, reports in Spanish are preferred.

## Credits

* **RobTop Games:** Creator of the original Geometry Dash.
* **Bog:** Creator of the web port.
* **Ale7208:** Improvements and bug fixes.

Geometry Dash belongs to its respective creator. This is an unofficial fan port and is not affiliated with or endorsed by RobTop Games.
