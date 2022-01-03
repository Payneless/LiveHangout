# LiveHangout

LiveHangout exists to connect people online to events and hangouts of various kinds in order to help meet others with similar interests, or just provide yourself with an entertaining time!
The project was inspired by Eventbrite and built using Javascript,
React.js and Redux for the front end and Python with Flask for the backend.

## LiveHangout features:


![ezgif-5-caa3b27566](https://user-images.githubusercontent.com/26901356/147898229-377e1ff6-7729-405c-adeb-8d617435dd41.gif)

* When entering LiveHangout for the first time, you are met with a splash page featuring a short description of the site, as well as some featured hangouts!
* Once you sign in, or select the search button, you will be redirected to the home page, featuring some of the mnost popular upcoming hangouts, as well as the newest posted hangouts.

![ezgif-5-fc1a7410f2](https://user-images.githubusercontent.com/26901356/147898247-3a52d6d0-83fc-4c54-aac9-a16af98c3f19.gif)


* You can submit a new hangout by clicking the "add" button in the top left of the navbar. This gives you a form to fill out the required info about the hangout you are creating.
* Once you submit a valid hangout, a small check will appear on the right side verifying it submitted correctly, and you will shortly be redirected back to the main page


![ezgif-5-e45073c15b](https://user-images.githubusercontent.com/26901356/147898244-3df983ac-7a1c-4599-bd99-71ea4fae3c47.gif)

* You can select your profile image in the top right of the nav bar as well to be taken to your profile, which features some basic info about you, as well as hangouts you've made, what you've rsvp'd, and what you've bookmarked.


## FrontEnd Technologies Used

![image](https://user-images.githubusercontent.com/26901356/147898477-ef3325df-60f3-49e6-b2cd-2af10183ad55.png)


## Backend Technologies Used

![image](https://user-images.githubusercontent.com/26901356/147898617-39db227d-4bab-4a56-9a76-d5450d7fc766.png)


# Project Installation

1. Clone the project repository from https://github.com/Payneless/LiveHangout

2. Rename the folder to whatever you want.

3. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

4. Create a **.env** file based on the example with proper settings for your
   development environment
5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory OR `cd` into the `react-app` folder and run `npm install` to install node package manager dependencies.

---

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

_ALSO IMPORTANT!_
psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---

# Running Locally

> To start the server, run `flask run` from the root directory, then run `npm start` from the `react-app` directory. This will allow you to make requests to http://localhost:3000 using any client (browser and Postman).
> To stop the server from listening to requests, press CTRL + c for Windows/Linux or CMD + c for MacOS in the terminal that you started the server (wherever you >ran npm start).

# Running Live

> The live link for this project is located here: live-hangouts.herokuapp.com
