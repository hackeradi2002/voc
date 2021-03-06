## 1.8.5 (Dec 31, 2016)

- using HTTPS for online dictionary webster, yahoo, and collins.
- build in `dlc` command line for windows platform, so that users don't have to install command line by themselves.

## 1.8.4 (Dec 8, 2016)

- add the rule for playing hole vocabulary speech group.

	If the vocabulary has different voice in different speech, such as 'mediate'.

    First, download all the audio of 'mediate'.

    Second, rename them to the format 'mediate.xxx.mp3' manually, such as 'mediate.v.mp3' and 'mediate.adj.mp3'.

    Next time when you execute command 'voc mediate', program will play hole speech group in order.

    For example:

```bash
$ voc mediate
play 'mediate.v.mp3' ...
play 'mediate.adj.mp3' ...
```

## 1.8.3 (July 30, 2016)

- fix issue throwing wrong exception when word is not found ([#8](https://github.com/zlargon/voc/issues/8))

## 1.8.2 (July 30, 2016)

- change the download priority (webster > yahoo > freedic > collins)
- improve to download correct audios more efficiently

### Yahoo
- show tip when user likely have a spelling mistakes

## 1.8.1 (July 28, 2016)

- handle error case without audio in Webster and Yahoo ([#6](https://github.com/zlargon/voc/issues/6))
- it doesn't play sentence audio when the same audio has been downloaded ([#7](https://github.com/zlargon/voc/issues/7))

## 1.8.0 (July 28, 2016)

- support [The Free Dictionary](http://www.thefreedictionary.com/) with option `-f, --freedic`.
- download and play audio one by one.
- update package dependencies and add new package [`co`](https://github.com/tj/co).
- fully migrate to ES2015, and remove Stage-0 syntax `async/await`.

### Yahoo
- search and check the words before download the audio

## 1.7.1 (June 10, 2016)

### Webster
- fix the issue resloving incorrect URL link ([#5](https://github.com/zlargon/voc/issues/5))

## 1.7.0 (June 2, 2016)

- remove option `-c, --collins-education`
- change option from `-C, --collins` to `-c, --collins`

### Webster
- search and check the words before download the audio
- fix issue generating incorrect url in particular case

### Collins
- Collins and Collins-Education server API have been changed and have been merged into one
- remove option `-c, --collins-education`
- change option from `-C, --collins` to `-c, --collins`
