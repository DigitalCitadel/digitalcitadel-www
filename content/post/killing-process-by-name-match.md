+++
author = "Brandon Romano"
date = "2015-07-20T21:39:24-04:00"
tags = ["bash", "unix"]
title = "Killing a Process by Partial Name"
description = "An introduction to the superkill command"
+++

As an Android Developer, I've had my share of having to manually kill processes.  Before Android Studio became the standard, I couldn't tell you the amount of times per day I had to kill Eclipse.  Nowadays my kill command appears in my history a lot less, but I still find myself having to kill a few processes every now and again.

I used to run `px aux | grep $partial_process_name`, manually copy the PID, and then run `kill $pid`.

This might not seem like too much work, but if you're doing this a few times a day you might want to do better.

Sure, you could run this command (as I initially found to be quicker):

```
pkill -f $partial_process_name
```

But as anyone who has read into the man pages of pkill will tell you this is a very dangerous command to run.  That will kill all commands that match your pattern.  Using this with a pattern that's too greedy could force you into a complete restart of your computer.

I've actually done this before:

```sh
pkill -f a #[accidental-enter]
```

Immediately after a hard restart, I vowed to never use pkill again and decided to automate my old process.

## Superkill

I dubbed the automation of my old process as superkill.  Superkill offers the safeness of a manual approach, all while providing the same ease of use pkill can offer for killing processes.

#### The Code

Check out [the Github repo](https://github.com/DigitalCitadel/superkill) to see the code and for instructions to install the command on your computer.

#### An Example

If I would like to kill Android Studio, whose process name comes up as `/Applications/Android Studio.app/Contents/MacOS/studio` on my computer, I could run something like this:

```
superkill "Android Studio"
```

Which then superkill will prompt:

```
kill /Applications/Android Studio.app/Contents/MacOS/studio ? (y/n):
```

Answering `y` (case insensitive) will kill the process while logging:

```
>> killing /Applications/Android Studio.app/Contents/MacOS/studio
```

Any other response will exit silently and not kill anything.
