<div id="top"></div>

## Turn Down for Huat?
Checking results for TOTO (Singapore lottery) is made simple with the help of **Turn Down for Huat**. Upload an image of your ticket and see the results immediately!

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#usage--features">Usage / Features</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <img src="https://user-images.githubusercontent.com/40411953/158035182-351c84ce-fd37-4120-a77e-857cf6c8f201.png" />
  
  Huat (發): prosperity, to prosper
</div>

Gambling is a huge part of Chinese culture, particularly in Singapore where the term "huat" is commonly used in a gambling context to hope for good luck. TOTO is Singapore's legalised lottery, operated by Singapore Pools.

TOTO rules / payouts:

https://online.singaporepools.com/en/lottery/how-play-toto

https://online.singaporepools.com/en/lottery/toto-bet-types

https://online.singaporepools.com/en/lottery/toto-prize-structure

Currently, when one buys TOTO, there is no easy way to check the winnings. One way is to check manually, but that becomes very time consuming and labourious. Singapore Pools offers a prize calculator on their website <a href="https://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx">here</a> but that is also not that much better and still fairly manual. There is a need to select the draw date and tick the numbers one by one, and only one bet can be checked at a time. 

Furthermore, there is no way to keep track of one's winnings across so many physical tickets that will likely be discarded. 

Enter _**Turn Down for Huat**_. This app simplifies results checking through the use of optical character recognition, where users can upload images of their tickets, see the results immediately, and store their tickets for easy future reference.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage / Features

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035858-782bd724-4abb-4458-892e-d9b78ca57667.png" /></div>

<br />1. On the main page, upload an image of your TOTO ticket. The results of the draw and your win/loss from every bet on this ticket will be shown.<br /><br />

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035913-071aa70f-b4a7-4b51-9b43-aaba9aa6cb2b.png" /></div>

<br />2. Although this application can be used without any sign up needed, signing up for an account will unlock the other features - mainly to save your tickets and keep track of your win/loss. Click on Log In on the nav bar to log in or sign up.<br /><br />

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158035981-89829d69-e8db-43a6-903a-c9855962714d.png" /></div>

<br />3. Upon log in, you will be brought back to the main page again. This time, you should see a win/loss tracker.<br /><br />

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158036032-78fd3a16-3461-4937-81a2-e432f4de9e55.png" /></div>

<br />4. Now, when any ticket is uploaded and the results shown, there is an option to save this ticket. Saving the ticket will update the win/loss tracker<br /><br />

<div align="center"><img src="https://user-images.githubusercontent.com/40411953/158036333-dfe02ea2-7aae-4b55-8720-4fd163a0ffdc.png" /></div>

<br />5. Go to the profile page to view all your past saved tickets.<br /><br />

<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

<strong>Frontend</strong>
* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)

<strong>Backend</strong>
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/v7/)
* [PostgreSQL](https://www.postgresql.org/)

<strong>Optical character recognition</strong>
* [Google Cloud Vision](https://cloud.google.com/vision)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* PostgreSQL
* Follow steps [here](https://cloud.google.com/vision/docs/setup) to set up Google Cloud Vision, up to the point where the JSON key file is downloaded to your computer.

### To run

Backend

1. Clone the repo
2. Copy the JSON file from the Google Cloud Vision setup into the root directory of `turn-down-for-huat-backend` as `google-credentials.json`
3. Create .env file
  ```
  SALT=<your own salt here for hashing passwords>
  FRONTEND_URL='http://localhost:3000'
  PORT=3004
  GOOGLE_APPLICATION_CREDENTIALS='./google-credentials.json'
  USERNAME=<your postgresql username>
  DATABASE=<your db name>
  HOST=<your host>
  ```
4. Install NPM packages
   ```sh
   npm i
   ```
5. Init db with sequelize
   ```sh
   npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all
   ```
6. Run backend
   ```
   nodemon index.mjs
   ```

Frontend

1. Clone the repo
2. Create .env file
  ```sh
  REACT_APP_BACKEND_URL='http://localhost:3004'
  ```
3. Install NPM packages
   ```sh
   npm i
   ```
4. Run backend
   ```sh
   npm start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Jia Hao: [GitHub](https://github.com/lim-jiahao/) - lim.jiahaoo@gmail.com

Bryan: [GitHub](https://github.com/Nuuggs) - bryluke000@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
