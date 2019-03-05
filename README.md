## Software required to run Chios

- Express
- MySql
- nodejs/npm ( installed globally )

## Installing and running Chios locally

You need to create the following tables in MySql

##### TABLE - mytags

![Table mytags](https://i.imgur.com/sDGp91t.jpg)

##### TABLE - mytasks

![Table mytags](https://i.imgur.com/VkD4uIN.jpg)

##### TABLE - mytasks_mytags

![Table mytags](https://i.imgur.com/tIqmGXh.jpg)

*Note :: in the above table mytags_id and mytasks_id are foreign keys of mytags.tag_id and mytasks.id respectively.*

**Once you've created the above tables , you can now open the teminal in chios and run `npm start` and then you should beable to see the app running on `localhost:3000` in your browser.**

