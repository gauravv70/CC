import { user } from "../Interfaces/user";
import { endpoints } from "../utils/endpoints";
const base = "http://192.168.1.14:8080/api";

export const SignUp = async (data: user, dispatch) => {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json",  'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(data),
  };
  try {
    await fetch(base + endpoints.signup, request).then((response) => {
      response.text().then((res) => {
        console.log(res);
        // if (res.code == 200) {
        //   dispatch("Success");
        // }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (username: String, password: String, dispatch) => {
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify({ username, password }),
  };
  try {
    await fetch(base + endpoints.signin, request).then((response) => {
      response.text().then((res) => {
        console.log(res);
        dispatch(res);
      });
    })
    .catch ((error)=>{
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
};
