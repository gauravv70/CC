import timeTable from "../Interfaces/timeTable";
import { endpoints } from "../utils/endpoints";
const base = "http://192.168.0.133:8080/api";

export const getCurrentTemplate = async (tableId: String, dispatch) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    await fetch(base + endpoints.getCurrent + `${tableId}`, request).then(
      (response) => {
        response.json().then((res) => {
          dispatch(res);
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
};
