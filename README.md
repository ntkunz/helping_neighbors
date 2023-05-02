
# Helping Neighbors

-Short version - Make a profile with your skills you'd like to barter for your listed desires and connect with your neighbors on that basis. 

Made with React, Express, MySQL, Node, Here Geocode Api, Knex, Sass, Multer

Welcome to the Helping Neighbors App. This is the past (ehem future) way of life for communities for as long as the written word can remember. Bartering with your fellow humans, lifting each other up, and making your existentialism fill with gratitude and happiness.

I am currently working on sanitizing all user input to prevent SQL injection, on both the frontend and backend. 

------------------------------------------------------

-How to run a local version of the app
You will need 
- NPM (https://www.npmjs.com/) 
- A MySQL database named hn_db
- A free api key from Here.com (https://developer.here.com/) - To get the required key, sign up for the free tier on developer.here.com with just your email, create a project named anything, click the hamburger menu in top right, select "services", on page 2 selece "forward geocoding" and request an api key. 


To install and run locally, create a new folder called 'hnclient' and clone the front end repository from https://github.com/ntkunz/helping_neighbors into it. Use your command line to cd into the folder the project was cloned to and run '$ npm install ' to download all of the node packages required. Open the project in a code editor and modify the .envSample file to have your Here api key (mentioned above). Then rename the .envSample file to '.env' .

Next, create a MySQL database named hn_db where you store your local MySQL databases. Whew... that's done, now on to the server.

Create a new folder named 'hnserver' and clone into it the back end of Helping Neighbors from https://github.com/ntkunz/hn_db . Again, in terminal/command line cd into that folder and run '$ npm install ' to download the npm requirements for the back end. Open the folder in a code editor and modify the .envSample file to have your MySQL username and password, as well as modify any other variables if you will run in another port or localhost. Rename .envSample to '.env' . Back at the command line, in the server folder, run the commands '$ npm run db:migrate ' then '$ npm run db:seed '. This will create your necessary tables and seed them with a few mock neighbors to explore. Still in command line of server folder, run '$ npm run dev ' to start your server.

Lastly, return to the hnclient folder in command line and run '$ npm start ' to start your front end. 

Your browser should now launch with the login page (and if it doesn't, navigate in your browser to http://localhost:3000/). Viola! 

To login as a user who already exists – login with the emails 
bart@gmail.com , or
lisa@gmail.com , or
ned@gmail.com , or
homemovies@gmail.com
and any or no password.

Alternatively, if you’d like to create a new user and still have other neighbors, create a new user and set your address within 1/2 kilometer of
455 granville St
Vancouver
British Columbia

or 
3200 E 23rd
Spokane
Washington

or, if you're a keener, create more than 1 user within 1/2 kilometer of each other and exponentially extrapolate fun from there on out.

---------------------------------------------------

I've learned a lot about developing a full stack application during the process of building this app and am appreciative to all of the joy and struggle that this project has brought me. I've also gained much confidence while simultaneously being nearly thwarted by seemingly straightforward tasks (nearly I said...)

In a short time I plan to finalize validation, both for a secure user experience and to prevent any malware from being introduced. I will also improve mobile layout as well as get up to speed with accessability best practices. Lastly, I will allow users to both block neighbors/exchanges and add a sort of user vouch/ranking system to add to the safety and trust of each of the users. Then deploy. Check back regularly for updates. 

Penned by mrnicholaskunz@gmail.com aka https://www.linkedin.com/in/nich-kunz/





