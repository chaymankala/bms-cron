# BookMyShow Advance Booking Cron

Started this for Avengers:Endgame tickets, even after all this effort, the tickets were vanished like ash! :P

Hope this is useful for someone.


## Intro
This is a small node app, which runs a cron to open BookMyShow webpage and checks for Book Tickets Button, if available, notifies you and dies.

Used Request Promise for HTTP, Cheerio to scrape the webpage, node-cron to run cron and node-mailer to send mails

<br>

## Setup

Before you start set your ENV with these variables

|`process.env.` | Description              
| ------------- | ----------------------- 
| URL1          | BMS Movie URL (example: https://in.bookmyshow.com/movies/avengers-endgame/ET00090482) 
| EMAIL         | Your email address to notify
| SMS_AUTH_KEY  | API KEY for SMS         
| PHONE         | Your Phone number to notify          
| INTERVAL      | Cronjob Interval (in seconds)
| EMAIL_HOST    | Your email host for node-mailer
| EMAIL_PORT    | Your email port for node-mailer

## Usage

run the start script in terminal, thats it!

`npm start`


