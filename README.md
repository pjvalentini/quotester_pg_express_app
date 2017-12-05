# quotester_pg_express_app

Bulletin Board Application

* Goal:

  Develop a website which can efficiently store and retrieve user submitted quotes from a PostgreSQL database.



  For this app, let's recreate this past time activity by developing a website that allows people to post quotes to a page. A quote should consist of an Author and a quote body.

     - The site will use form data to set up an Author(Name) of the quote and a field to enter a quote of your choice.

     - The site will display a modal to display the quote that was inputted and will prompt you to update it if you  choose to modify the quote.

     - You can also delete a quote by clicking on the "X" button in the upper right corner of the well that the quote is contained in. This will delete the record from the data base.

     - Messages are stored in a postgres database called Quotester and in a table called bulletinboard.

     - Column Name	Column Data Type - Information -

         - bulletinboard table schema

                CREATE TABLE bulletinboard (
                   id SERIAL PRIMARY KEY,
                   name VARCHAR(255) DEFAULT 'Guest',
                   quote VARCHAR(3000) NOT NULL
                 );

  To run the program type - npm start
