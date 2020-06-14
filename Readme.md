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

## Tool Requirements
* Python 3
* Node/npm
* venv (comes with python 3)

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

* Python packaging
  * `requirements.txt` holds all python dependecies and such
  * make sure you're in venv with `env\Scripts\activatre.bat`
  * `pip install -r requirements.txt`

* set FLASK_APP env var to set flask application file
* `python <FLASK_APP>.py` starts ***backend server***

* Using create-react-app (./frontroom)
  * `npm start` to load up dev ***frontend server***
  * `npm run build` to compile production code