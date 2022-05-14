import { AsyncStorage } from 'react-native';

    fetch('https://example.dk/rest/Login/Authenticate/?businessId=1&solutionId=1', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username : this.state.username,
              password : this.state.password,
            })
          }) 

        .then((response) => AsyncStorage.setItem(LOGIN_TOKEN, response))

      .then((responseDocs) => {

        console.log("YOU HAVE SUCCSFULLY LOGGED IN:", responseDocs) 

     });}