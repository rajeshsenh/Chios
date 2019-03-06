## Chios - A simple todo like application for efficiency.

#### View your tasks , sort them

![View your tasks , sort them](https://i.imgur.com/prgdB5i.jpg)

#### Add new task

![Add new task](https://i.imgur.com/sY6bR47.jpg)

#### Edit task

![Edit task](https://i.imgur.com/BW6FWcE.jpg)

#### Delete task

![Delete task](https://i.imgur.com/eIL4kVa.jpg)


## Software required to run Chios

- Express
- MySql
- nodejs/npm ( installed globally )

## Installing and running Chios locally

You need to create the following tables in MySql

##### TABLE - mytags

![Table mytags](https://i.imgur.com/sDGp91t.jpg)

##### TABLE - mytasks

![Table mytasks](https://i.imgur.com/F4jan78.jpg)

##### TABLE - mytasks_mytags

![Table mytags](https://i.imgur.com/tIqmGXh.jpg)

*Note :: in the above table mytags_id and mytasks_id are foreign keys of mytags.tag_id and mytasks.id respectively.*

**Once you've created the above tables , you can now open the teminal in chios and run `npm start` and then you should beable to see the app running on `localhost:3000` in your browser.**

## TODO's

#### IMPORTANT
- success and failure messages.
- Color should be added , when creating task itself
- Work on code reflecting live update.

#### IMPORTANT ON HOLD
 - [Implement sort](https://jsfiddle.net/8zgsrb5k/)

#### ENCANCEMENTS
 - Validation
 - [Add outline buttons instead](https://getbootstrap.com/docs/4.0/components/buttons/)
    
#### NOT IMPORTANT
- login to database code is being duplicated , how to avoid this ?
- How to store login credentials in a .evn as when i upload to github the login details are visible.


