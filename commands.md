# Commands Used On This Project

## Backend

### To install expressjs, dotenv and mongodb
```npm i express dotenv mongoose```

### To install nodemon and update development dependencies in package.json
```npm i nodemon --save-dev```

### User tools for password encryption and email validation
```npm i bcryptjs jsonwebtoken validator nodemailer```

### Cookie parser, body parser
```npm i cookie-parser body-parser```


### Miscellaneous

#### Disabling MongoDB Database server from running automatically on windows startup
Disabled the service: ```sc config MongoDB start=disabled```
Remove the service: ```sc.exe delete MongoDB```


## Frontend

### To install and setup basic front-end tools
```npm i axios react-alert react-alert-template-basic react-bootstrap react-helmet react-redux redux redux-thunk redux-devtools-extension react-router-dom```