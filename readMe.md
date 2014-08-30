#Dictate Me#

Have you ever had an earworm, that catchy phrase of music that would never disappear from your head? Dictate Me is built to lessen the pain of dealing with such earworms by bringing them out into the existence by musically dictating them.

###Basic Usage###
It is currently alive [here](https://dictateme.herokuapp.com).
After granting it your microphone access, simply find a quiet place, click the Start button, and start singing or humming. It does not work well with whistling.
After you are done singing a phrase (it's best to keep it short), click stop, and what it thought you sang will appear on the staff. By clicking the PlayBack button, it will play back what is on the staff.

###Editing###
Each note must have two parts: the note name and the octave number. Moreover, they need to be separated with a comma. For example, middle C would be notated as C4, and the A 440 would be A4. Accidentals can be added by adding '#' or 'b' right after the note name. If there is none, it assumes that the note is natural. If you wrote C#4 (C sharp above the middle C) and want to write the middle C again (C4), don't worry about writing out the natural sign! It will automatically add one for you.

###Technological Challenges###
This is a Frontend heavy app built with Angular, Web Audio API, and other libraries. Getting over the initial learning curve for Web Audio, part of WebRTC, was not trivial task. Moreover, working with less popular libraries meant less google support, which made me work off of mainly their live demo to fill the gaps in the documentation. 


### Issues and Contribution ###
You found bugs that you'd like to let me know? Please submit it on issue section.
You are more than welcome to contribute if you would like to. However, it is not in the very front of my coding queue, so it probably won't receive too much TLC at this moment.