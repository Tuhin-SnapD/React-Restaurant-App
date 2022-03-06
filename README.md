
# React-Restaurant-App with Local Backend

This is a React application which is succesfully able to communicate between server and client.

This is a Restaurant Application.

Features:

    1. Data loads from the local server initiallised using JSON server
    2. Can Fetch login details, Contact details after the user input.
    3. Uses:
        "react"- Front-end JavaScript library
        
        "react-dom"-  Provides DOM-specific methods
        "react-redux"- Allows React components to read data
        "react-route"- Standard library for routing in React.

        "react-transition-group"- Front-end Transitions
        "react-animation-components"- Front-end Animations
        "reactstrap"- React component library for Bootstrap

        "web-vitals"-Set of useful metrics that aim to capture the user experience of a web page

## Starting your JSON server

In the 'json-server' directory type:
```
json-server --watch db.json -d 2000 -p 3001
```

`--watch` Initialises the JSON server, Creates demo REST JSON webservice

`-d`  Provides a delay of 2000ms

`-p` Port used will be 3001
## Running your React App

Go to your Project Directory and type:

```
npm start
```
or 
```
yarn start
```

For the Appplication to work properly at port 3000.

The Appplication will work properly and will fetch data from the 'json-server'
we just initialised

# Guided by: 
### Prof. Jogesh Muppala 
> Associate Professor at Hong Kong University of Science and Technology
    
