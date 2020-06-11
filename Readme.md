# Pick your Fighter
## A Online Quiz App that matches you with the politicians you should vote for in you local election

## Tools
* Built with React.js (React-Bootstrap) client side and python backend

## Objective
* Regional for Chicago Only right now
* 4 stages
  1. Determine location to get politician list
  2. Ask questions to detemine political preference
  3. Determine list of reccomended voting 
  4. (Hotep Bonus) prolematic or false beliefs can be countered with some educative resources

## Package requirements
* venv
* Flask
* MySQL (w/ peewee)

## Object Heirarchy
* Ballot - obj
  * Race - obj
    * Candidate - obj
      * *< Bunch of information >*
      * Question Banks - obj (same bank for every Candidate in Race)
        * Questions - string
        * Answers - string

* User
  * Ballot (Determined from location)
  * Question Banks (Aggregate of banks from Ballot, dynamic answered in quiz)

### dev notes

* would like nicer way to bring up python venv anywhere without committiong whole shebang.
* set FLASK_APP env var to set flask application file
* `python -m flask run`
* set up toolchain once frontend is at a good point

* Testing the app must be done from an http domain, use local
  * `python -m http.server`

### TODO

* Figure out where data is going to be collected
  * **Note**: Data shouldn't be too large for just chicago and won't save user data or need to be updated very often, so a lightwieght solution would be best.