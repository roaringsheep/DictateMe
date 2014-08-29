#Dictate Me#
Make the computer dictate music for you, not the other way around.

###Overview###
Have you ever had an earworm, that catchy phrase of music that would never disappear from your head? What is worse is that many people have a hard time accuratly recreating what's in their head by singing or writing it down, especially without the support of a reference pitch to give them the right starting place. Dictate Me is built to lessen the pain of dealing with such earworm by bringing them out into the existence by musically dictating your earworms. It assumes that the music that gets stuck in most people's brain uses western music notation, but it also attempts to supply some useful information for music that is not by plotting the frequency of the live input. 

###Basic Usage###
It is currently alive [here](https://dictateme.herokuapp.com).
After granting it your microphone access, simply find a quiet place, click the Start button, and start singing. If you are not comfortable singing, it will work well with humming as well, but it does not work well with whistling.
After you are done singing a phrase (it's best to keep it short), click stop, and what it thought you sang will appear in the staff above. By clicking the PlayBack button, it will play back what is in the staff.

###Editing the Result###
By nature, it is not always going to be 100% accurate, especially if you recorded in a noisy area. If that is the case and the accuracy of the dictation is lower than what you desired, you can either record again, or choose to Edit.
Each note must have two parts: the note name and the octave number. Moreover, they need to be separated with a comma. For example, middle C would be notated as C4, and the A 440 would be A4. Accidentals can be added by adding '#' or 'b' right after the note name. If there is none, it assumes that the note is natural. If you wrote C#4 (C sharp above the middle C) and want to write the middle C again (C4), don't worry about writing out the natural sign! It will automatically add one for you.

###Advanced Options###
You are a bass and sang way too low for the treble clef? No worries! There is clef option below the basic control options so you can change clefs before or after dictation. 
Dictate Me also provides reference pitches for people who like to sing in between pitches (like me). Simply select the note you want and click play.

### How To Have Your Own Copy ###
If you want your own copy of it to mess with it, here's how to do it.
First, clone the repository
```
git clone https://github.com/roaringsheep/dictateMe/
```
Then run
```
npm install && bower install
```
Then running
```
grunt serve
```
will run the instance of Dictate Me on localhost:9000

### Issues and Contribution ###
You found bugs that you'd like to let me know? Please submit it on issue section.
You are more than welcome to contribute if you would like to. However, it is not in the very front of my coding queue, so it probably won't receive too much TLC at this moment.