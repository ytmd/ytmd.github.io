# Youtube Markdown

This projects provides and easy way to **create** and **share** annotations in Youtube videos. It also provides an timeline of the video time tags so you can visualize it and jump around by clicking on where you wanna go.

It also aim to provide advanced playback functionality like looping specific parts of the video, volume fades and etc (Still to be implemented).

## How to Use

Start by enter a Youtube video link in the text input in the bottom of the page. The video will load in the YouTube Embedded Player.
In the main text area you can type your video annotations. You will see appear clickable playback controls that will let you easily and precisely jump around.

When you ready just copy and paste the URL and share! The video ID and your input data will be "embedded" in the URL (precisely, it will be in a URL query)

### Syntax

```
All lines that do not contain time tags are considered sections (line this one)

00:00 Part A - Introduction
  00:00 What is this all about?
  00:35 Motivations
01:23 Part B - Argumentation
  01:23 First argument
  02:35 Second argument
    02:35 theory
    02:49 experiments
  03:12 Third argument
05:03.357 Part C - conclusion
```
The default format for the time tags is `mm:ss`. You can have a finer control of the video's playback using the format `hh:mm:ss.fr` where `fr` means _fraction_. So a fraction `.5` would mean 500ms, `.3` would mean 300ms, etc.

```
05:03.357 five minutes, three seconds and 357 ms
07:10.5 seven minutes, ten seconds and 500 ms (!!)

03:11:45 three hours, eleven minutes and 45 seconds
01:10:03.55 one hour, ten minutes, three seconds and 550 milliseconds.
```

The indentation of each line with a timetag will be used to create sections, subsections, subsubsections and etc and those will be reflected in the timeline.

### Examples

Here are two examples where YTMD is used to easily navigate complex symphonic pieces by Beethoven and Stravinsky:

[Beethoven's 1st Symphony](https://ytmd.github.io/?v=xcaUGsL2EpI&txt=00%3A00%20I%20Mov%0A%0A%0900%3A00%20Intro%0A%0901%3A12%20Exposition%0A%0905%3A00%20Development%0A%0906%3A16%20Reexposition%0A%0907%3A50%20Coda%0A%0A08%3A38%20II%20Mov%0A%0A%0908%3A38%20Exposition%0A%0910%3A25%20Development%0A%0911%3A24%20Reexposition%0A%0913%3A08%20Coda%0A%0A14%3A15%20III%20Mov%0A%0A%0914%3A15%20Menuetto%0A%0915%3A47%20Trio%0A%0916%3A54%20Menuetto%20(Da%20Capo)%0A%0A18%3A27.350%20IV%20Mov%0A%0A%0918%3A27.350%20Exposition%0A%0921%3A04.7%20Development%0A%0921%3A53.4%20Reexposition%0A%0922%3A54%20Coda)

[Stravinsky's Rite of Spring](https://ytmd.github.io/?v=EkwqPJZe8ms&txt=Part%20I%3A%20A%20Kiss%20of%20the%20Earth%0A%0A0%3A46%20A%20Kiss%20of%20the%20Earth%0A%090%3A46%20Introduction%0A%094%3A05%20The%20Augurs%20of%20Spring%0A%097%3A14%20Ritual%20of%20Abduction%0A%098%3A30%20Spring%20Rounds%0A%0912%3A03%20Ritual%20of%20the%20Two%20Rival%20Tribes%0A%0913%3A57%20Procession%20of%20the%20Oldest%20and%20Wisest%20One%0A%0914%3A39%20A%20Kiss%20of%20the%20Earth%0A%0915%3A03%20The%20Dance%20of%20the%20Earth%0A%0APart%20II%3A%20The%20Exalted%20Sacrifice%0A%0A16%3A37%20The%20Exalted%20Sacrifice%0A%0916%3A37%20Introduction%0A%0921%3A11%20Mystic%20Circle%20of%20the%20Young%20Girls%0A%0924%3A02%20The%20Naming%20and%20Honoring%20of%20%20the%20Chosen%20One%20%0A%0925%3A46%20Evocation%20of%20the%20Ancestors%0A%0926%3A28%20Ritual%20Action%20of%20the%20Ancestors%0A%0930%3A05%20Sacrificial%20Dance)