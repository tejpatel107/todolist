# todolist

Hello Everybody!

This is a project on todolist that I have created while taking online course of 'The Complete 2021 Web Development Bootcamp' by Dr. Angela Yu on Udemy. 
This project helped me a lot understaing how to work with EJS templates, connecting our app.js server file with MongoDB Atlas cloud, server creating, setting up correct routes for GET/POST requests; setting up dynamic routes by using reoute parameters a great feature provided by Express framework.

It has all features you can think of a todo list app can have, adding and deleting items. Creating new custom list.
To create a custom list in URL address bar just type '/ListName' instead of ListName type whatever list name you wanna keep.

https://todo-list-3745.herokuapp.com , this is the link to the app. The data is collected and stored in DB setup online on MongoDB Atlas Cloud.

Important Clarifications:

In app.js I have removed the connection to MongoDB Atlas and instead of that I have just made the connection to the localhost db, as it was revealing the username and password. So when you try to run the app on your local computer just run command 'node app.js' in CLI, and in browser you can visit localhost:3000. You can watch data getting updated in local DB in another CLI window after starting up MongoDB in another window.

