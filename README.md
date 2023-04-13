
# Helping Neighbors

-Short version - Make a profile with your skills you'd like to barter for your listed desires and connect with your neighbors on that basis. 

Made with React, Express, MySQL, Node, Here Geocode Api, Knex, Sass, Multer

-Long version -- 
Welcome to the Helping Neighbors App. This is the past (ehem future) way of life for communities for as long as the written word can remember. Bartering with your fellow humans, lifting each other up, and making your existentialism fill with gratitude and happiness. Really selling it eh? We believe in this idea...

If you want to skip straight to installing the app locally, jump down to near horizontal line. If you want to hear the fun stuff, stick around. (aside: app will be deployed shortly... hang tight) --lack of password protection may be a reason to not quite deploy it just yet... for now, on your local environment, just remember your email address.

React front end (create react app, I know, it's heavy, it works, it's okay). Thanks to the Here.com geocoding app (and its free tier) we can gather up and display to you all of your neighbors within a 1/2km from your house. 

**I forgot, why see your neighbors in an app? I'm glad you remembered... when you create your profile (including your appropriately sized profile image thanks to the multer middleware) you will include what skills you would like to share with your neighbors and what things you'd like to barter for said skills. Don't let these suggestions limit you, the neighborhood is your oyster, and we're all more talented than we realize when we happen to make a profile on an app. Some ideas might be Music Lessons, Mowing the Lawn, Home Cooked Meals, Help with something Mechanical, or many others. Message your neighbors through the app and break the ice with a barter request and reap the infinite rewards of living in a well-connected, caring, sharing neighborhood. 

Add to that the sense of purpose that comes with being a part of a whole larger than ourselves, and the added security for everyone when we personally know the people around us, and it's all ice cream and cupcakes. 

What else... the server is express and a mysql database being created and fed with the assistance of Knex. I made the styling to suit the cause of the website, mainly to look nice enough and stay out of the way of connecting. Should we add more wallpapers? Let us know at (mrnicholaskunz@gmail.com). What more... k mas.... you'll need to create a few .env files based off of the sample env files.


------------------------------------------------------

-Ingredients (aka requirements) : NPM (https://www.npmjs.com/) , a MySQL database named hn_db , and a free api key from Here.com (https://developer.here.com/) - To get the required key, sign up for the free tier on developer.here.com with just your email, create a project named anything, click the hamburger menu in top right, select "services", on page 2 selece "forward geocoding" and request an api key. 


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

Next, logout and create your own profile(s), either in your neighborhood and make a few, or within 1/2km of 455 Granville St, Vancouver, BC (BrainStation Vancouver address, where this app was devised), or within 1/2 mile of the 3200 block of 23rd in Spokane Wa (something like 3313 E 23rd, Spokane, Wa) to see the fourth user and be the first neighbor to join his network. 


or, if you're a keener, create more than 1 user within 1/2 kilometer of each other and exponentially extrapolate fun from there on out.

---------------------------------------------------

I've learned a lot about developing a full stack application during the process of building this app and am appreciative to all of the joy and struggle that this project has brought me. I've learned that my brain is sharper than my fingers (meaning that, for me, taking regular breaks solves more problems more easily than hunching closer to the keyboard). I've also gained much confidence while simultaneously being nearly thwarted by seemingly straightforward tasks (nearly I said). 

With time, this app will likely save the world errr hopefully, but at the very least it will have real time messaging and alerts (likely utilizing socket.io), secure login (OAuth?), a style upgrade (responsiveness), better accessability, and be hosted externally and broadcast to all of humanity with an internet connection. 

Penned by mrnicholaskunz@gmail.com aka github.com/ntkunz aka https://www.linkedin.com/in/nich-kunz/

 - screenshots - 
https://live.staticflickr.com/65535/52813956775_94cb834f08_b.jpg

https://live.staticflickr.com/65535/52813740184_e08f0ee9a6_h.jpg

https://live.staticflickr.com/65535/52813563736_108c78988e_z.jpg




