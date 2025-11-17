// import library
const readline = require("node:readline");

//intialize
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// constructor
class App {
  constructor(appName) {
    this.appName = appName; //stores parameter variable here
    this.userProfile = []; // stores Profile info here

    this.userMovies = []; // stores user rented movies info here
    this.movieList = [
      // list of movies available
      { Category: "Fantasy", name: "Lord Of The Rings" },

      { Category: "Fantasy", name: "Harry Potter" },
      { Category: "Fantasy", name: "The Hunger Games" },
      { Category: "Action", name: "Blade" },
      { Category: "Action", name: "Rambo" },
      { Category: "Action", name: "Marvel's Avengers" },
      { Category: "Comedy", name: "Superbad" },
      { Category: "Comedy", name: "Borat" },
      { Category: "Comedy", name: "School of Rock" },
    ];
  }

  mainPage() {
    // main page function

    // main page intro and options

    const page = ` Welcome to ${this.appName}\n
    created by: Robert Byron Hao 
                Uplift Batch 28: Momentum
    
    MAIN  PAGE
    
    [1] - Register   [2] - Movie List  [3] - Rent Movies   [4] -  View Profile  [5] - Return Movie   [6] - Exit `;

    console.log(page);

    rl.question(`Choose what you want to do: `, (answer) => {
      // main page options input
      switch (Number(answer)) {
        case 1: // go to Register page
          console.clear();
          console.log("Going to Registration page\n");
          this.registerPage();
          break;
        case 2: // go to Movie list page
          console.clear();
          console.log("Going to Movie list page\n");
          this.movieListPage();
          break;

        case 3: // go to Rent movies page
          console.clear();
          console.log("Going to Rent Movies page\n");
          this.rentalPage();
          break;

        case 4: // go to Profile page
          console.clear();
          console.log("Going to Profile page\n");
          this.viewProfile();
          break;

        case 5: // go to Return movie page
          console.clear();
          console.log("Going to Return Movie page\n");
          this.returnMovie();
          break;

        case 6: // Exit app
          console.log("Thank you and hope to see you again!\n");
          rl.close();
          break;

        default: // if invalid input
          console.log("Invalid input, please select a valid option\n");
          return this.mainPage();
      }
    });
  }

  registerPage() {
    // Register page function
    const page = ` ${this.appName}  \n
       REGISTRATION PAGE`;

    console.log(page);
    // Registration inputs
    rl.question(`Please enter your name:`, (name) => {
      // name input
      rl.question(`How old are you?: `, (age) => {
        // age input
        rl.question(`Please enter  the date today:`, (date) => {
          // registration date input
          console.log("");
          console.log("[1] - Save Info    [2] - Cancel"); // options after registration display
          console.log("");

          rl.question("What do you want to do?: ", (answer) => {
            // options after  registration input
            switch (Number(answer)) {
              case 1: // save registration
                let newData = {
                  //  registration data storage variable
                  name: name,
                  age: Number(age),
                  registeredDate: date,
                };

                if (this.userProfile.length === 0) {
                  // if first-time registration, push new data to userProfile
                  this.userProfile.push(newData); //
                } else {
                  this.userProfile[0] = newData; // if subsequent registration, replace old data in userProfile
                }
                console.clear();
                console.log("Record saved successfully"); // display after successful saving of info
                return this.mainPage();

              case 2: // cancels registration and goes back to main page
                console.clear();

                return this.mainPage();

              default: // if input is  invalid
                console.log("Invalid Input");
                return this.registerPage();
            }
          });
        });
      });
    });
  }
  movieListPage() {
    // Movie list function

    const page = ` ${this.appName} \n             
   MOVIE LIST  PAGE\n

   Here's our list of available movies:`;

    console.log(page);

    console.table(this.movieList); // displays this.movieList in a table format
    let askOption = () => {
      // function to loop question incase of invalid input
      console.log("Press [1] to go back to the main page: "); // display option to go back to main page
      rl.question("Choose an option: ", (answer) => {
        // rl.question that takes input that allows for switch statement
        switch (Number(answer)) {
          case 1: // returns this.mainPage if [1] is pressed.
            console.clear();
            return this.mainPage();

          default: // if input is invalid option
            console.log(
              "Invalid input, please press [1] to go back to the main page"
            );
        }
        rl.question("Press [1] to go back to the main page: ", (answer) => {
          // allows for to retry pressing [1] and loops if another invalid input is  detected
          switch (Number(answer)) {
            case 1:
              return this.mainPage();

            default:
              console.log(
                // if invalid input again, allows for looping of input.
                "Invalid input, please press [1] to go back to main page" // display before re-running the function.
              );
              askOption(); // re runs the function to loop the input if anything other than [1] is pressed.
              break;
          }
        });
      });
    };
    askOption(); // initializes the function so input can be taken in.
  }

  rentalPage() {
    // rental page function

    const page = ` ${this.appName} \n 
     RENTAL PAGE

    Pick the Category of movies you want to rent:
    
    [1] - Fantasy Movies    [2] - Action Movies      [3] - Comedy Movies     [4] - Back to Main Page `;

    console.log(page);

    rl.question(`Pick a category to see the list: `, (answer) => {
      // category selection inputs
      switch (
        Number(answer) // goes to Fantasy movie list
      ) {
        case 1:
          console.clear();
          console.log("Going to the Fantasy Movies list:");
          this.fantasyRental();
          break;

        case 2: // goes to Action movie list
          console.clear();
          console.log("Going to the Action Movies list:");
          this.actionRental();
          break;

        case 3: // go to Comedy movie list
          console.clear();
          console.log("Going to the Comedy Movies list:");
          this.comedyRental();
          break;

        case 4: // goes  back to Main page
          console.clear();
          console.log("Going back to main page");
          return this.mainPage();

        default: // if input is invalid
          console.log("Invalid input ");
          return this.rentalPage();
      }
    });
  }

  fantasyRental() {
    // Fantasy movie rental page
    const page = `  
    FANTASY MOVIE LIST:

       [1] - Lord Of The Rings  [2] - Harry Potter     [3] - The Hunger Games    [4] - Pick Other Movies`;

    console.log(page);

    rl.question(`Please pick a movie to rent: `, (answer) => {
      // Fantasy movie rental options
      let chosenMovie; // stores chosen movie here.
      switch (Number(answer)) {
        case 1: // rents Lord of the Rings
          chosenMovie = "Lord Of The Rings";
          break;

        case 2: // rents Harry Potter
          chosenMovie = "Harry Potter";
          break;

        case 3: // rents The Hunger Games
          chosenMovie = "The Hunger Games";
          break;

        case 4: // goes back to rental page selection
          console.log("Going back to rental page:");
          return this.rentalPage(); // goes back to rental page

        default: // if input is invalid
          console.log("Invalid input, please pick another movie.");
          return this.fantasyRental(); // returns to  fantasyRental page
      }
      if (this.userMovies.includes(chosenMovie)) {
        // if-else statement to check for double rentals
        console.log(`You have already rented "${chosenMovie}".`);
        console.log("Please choose another movie.\n");
        return this.rentalPage(); // go back to rental selection
      } else {
        this.userMovies.push(chosenMovie); // after selection, stores rented movie to the userMovies  array
        console.clear();
        console.log(`You have successfully rented: ${chosenMovie}`); // notifies the user and prints rented movie
        return this.rentalPage(); // goes back to rental page
      }
    });
  }

  actionRental() {
    // action movie Rental page
    const page = ` 
    ACTION MOVIE LIST:

       [1] - Blade     [2] - Rambo      [3] - Marvel's Avengers     [4] - Pick Other Movies`;

    console.log(page);

    rl.question(`Please pick a movie to rent: `, (answer) => {
      // action movie rental inputs
      let chosenMovie; // stores chosen movie here
      switch (Number(answer)) {
        case 1: // rents  Blade
          chosenMovie = "Blade";
          break;

        case 2: // rents Rambo
          chosenMovie = "Rambo";
          break;

        case 3: // rents Marvel's Avengers
          chosenMovie = "Marvel's Avengers";
          break;

        case 4: // goes back to Rental page
          console.log("Going back to rental page:");
          return this.rentalPage(); // goes back to rental page

        default: // if invalid input
          console.log("Invalid input, please pick another movie.");
          return this.actionRental(); // returns to actionRental page
      }

      if (this.userMovies.includes(chosenMovie)) {
        // if-else statement to check for double rentals
        console.log(`You have already rented "${chosenMovie}".`);
        console.log("Please choose another movie.\n");
        return this.rentalPage(); // go back to rental selection
      } else {
        this.userMovies.push(chosenMovie); // after selection, stores rented movie to the userMovies  array
        console.clear();
        console.log(`You have successfully rented: ${chosenMovie}`); // notifies the user and prints rented movie
        return this.rentalPage(); // goes back to rental page
      }
    });
  }

  comedyRental() {
    // Comedy rental page
    const page = `
    COMEDY MOVIE LIST:

       [1] - SuperBad    [2] - Borat      [3] - School of Rock      [4] - Pick Other Movies`;

    console.log(page);

    rl.question(`Please pick a movie to rent: `, (answer) => {
      // comedy rental inputs
      let chosenMovie; // stores chosen movie to this variable
      switch (Number(answer)) {
        case 1: // rents SuperBad
          chosenMovie = "SuperBad";
          break;

        case 2: // rents Borat
          chosenMovie = "Borat";
          break;

        case 3: // rents School of Rock
          chosenMovie = "School of Rock";
          break;

        case 4: // goes back to rental page
          console.log("Going back to rental page:");
          return this.rentalPage(); // goes back to rental page

        default: // if invalid input
          console.log("Invalid input, please pick another movie.");
          return this.comedyRental(); //returns to comedyRental page
      }

      if (this.userMovies.includes(chosenMovie)) {
        // if-else statement to check for double rentals
        console.log(`You have already rented "${chosenMovie}".`);
        console.log("Please choose another movie.\n");
        return this.rentalPage(); // go back to rental selection
      } else {
        this.userMovies.push(chosenMovie); // after selection, stores rented movie to the userMovies  array
        console.clear();
        console.log(`You have successfully rented: ${chosenMovie}`); // notifies the user and prints rented movie
        return this.rentalPage(); // goes back to rental page
      }
    });
  }

  viewProfile() {
    //view Profile function
    const page = ` ${this.appName} \n
   PROFILE PAGE`;

    console.log(page);
    // view  Profile display
    if (this.userProfile.length === 0) {
      // if user profile has no info stored, print the follwing.
      console.log("No Profile Info yet, please register");
    } else {
      console.table(this.userProfile); // if user profile has info, display info
    }
    // user rented movies list display
    if (this.userMovies.length > 0) {
      // if user has rented movies, display them here
      console.log(`Your rented movies:`);
      console.table(this.userMovies); // print rented movies here
    } else {
      console.log("No movies rented yet."); // prints this if user has no rented movies
    }

    let askOption = () => {
      // function to loop options to go back to page incase of invalid input
      console.log("Press [1] to go back to the main page");
      rl.question("Do you want to go back to the main page?: ", (answer) => {
        switch (Number(answer)) {
          case 1: // back to main page input
            console.clear();
            this.mainPage(); // goes back to main page
            break;

          default: // if input is invalid, ask for input again.
            console.log(
              "Invalid Input, please press [1] to go back to the main page"
            );
        }
        rl.question(
          // option to go back to main page
          "Do you want to go back to the main page?: ",
          (answer) => {
            switch (
              Number(answer) //
            ) {
              case 1: //
                console.clear();
                this.mainPage(); // goes back to main page
                break;

              default: // loops the first option.
                console.log(
                  "Invalid Input, please press [1] to go back to the main page" // displays if user  has invalid input
                );
                askOption();
            }
          }
        );
      });
    };
    askOption();
  }

  returnMovie() {
    let trimRentedMovieError = () => {
      rl.question("What do you want to do?: ", (answer) => {
        // takes user input to go back to main page
        const choice = Number(answer);

        if (choice === 1) {
          // returns to mainpage on press of [1].
          return this.mainPage();
        } else {
          console.log(
            // displays incase of invalid input
            "Invalid input, please press [1] to go back to main page: "
          );
          trimRentedMovieError();
        }
      });
    };

    let noRentedMovieOption = () => {
      // like askOption function but only if user has no rented movies

      console.log(
        "You have no rented movies to return, press [1] to back to main page:\n "
      );
      rl.question("What do you want to do?: ", (answer) => {
        // takes user input to go back to main page
        const choice = Number(answer);

        if (choice === 1) {
          // returns to mainpage on press of [1].
          return this.mainPage();
        } else {
          console.log(
            // displays incase of invalid input
            "Invalid input, please press [1] to go back to main page: "
          );
          trimRentedMovieError(); //loops option in case of invalid input.
        }
      });
      trimRentedMovieError();
    };

    let askOption = () => {
      // function to loop options to go back to page incase of invalid input
      console.log("Invalid input, press [1] to back to main page: ");
      rl.question("What do you want to do?", (answer) => {
        const choice = Number(answer);

        if (choice === 1) {
          // returns to mainpage on press of [1].
          return this.mainPage();
        } else {
          // runs in case of invalid input
          askOption();
        }
      });
    };

    let askMovieOption = () => {
      // function that runs if user has at least 1 rented movie.
      if (this.userMovies.length === 0) {
        // if user has no rented movies, run this

        noRentedMovieOption(); // runs noRentedMovieOption function
      } else {
        console.log("\nYour rented movies:");
        this.userMovies.forEach((movie, index) => {
          // displays  all user movies with an index behind it.
          console.log(`[${index + 1}] - ${movie}`); // adds + 1 to the index so it doesn't start at 0
        });
        console.log("[0] - Back to Main Page\n");

        rl.question(
          // input for movie to return
          "Enter the number of the movie to return or press [0] to go back to the main page: ",
          (answer) => {
            const choice = Number(answer); // stores user choice input here

            // if user inputs [0]
            if (choice === 0) {
              // goes back to main page
              console.clear();
              console.log("Going back to main page");
              return this.mainPage(); // returns to mainPage
            }
            // if user inputs any choice other than [0] but not more than the number of rented movies.
            if (choice > 0 && choice <= this.userMovies.length) {
              const returnedMovie = this.userMovies.splice(choice - 1, 1); // matches user choice to a movie index
              console.clear();
              console.log(`\nYou have successfully returned: ${returnedMovie}`); // notifies  the user and prints returned movie
              askMovieOption();
            } else if (choice > this.userMovies.length) {
              console.log("Invalid input, please try again.\n");
              askMovieOption();
            }
          }
        );
      }
    };
    //return movie page display
    console.log(` ${this.appName} \n
        RETURN MOVIE PAGE

  `);

    if (this.userMovies.length === 0) {
      // if user has no rented movies, run notRentedMovieOption();
      noRentedMovieOption();
    } else {
      // if user has rented movies, run askMovieOption();
      askMovieOption();
    }
  }

  run() {
    // run function
    this.mainPage();
  }
}

const myApp = new App("Robert's Free Movie Rental Service"); // intializes  App name as "Robert's Rental Service"
myApp.run(); // runs app
