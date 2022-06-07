import { weekday } from "../constants/constants";
import { TeacherRequest } from "../Interfaces/timeTable";
import { endpoints } from "../utils/endpoints";
import { compare } from "../utils/helperFun";
const base = "https://gaurav-cc-backend.herokuapp.com/api";

export const getCurrentTemplate = async (tableId: String, dispatch) => {
  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    await fetch(base + endpoints.getCurrent + `${tableId}`, request).then(
      (response) => {
        response.json().then((res) => {
          weekday.map((day) => {
            res.data[day] && res.data[day].length > 1
              ? res.data[day].sort(compare)
              : null;
          });
          dispatch(res);
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherSchedule = async (reqData: TeacherRequest, dispatch) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(reqData),
  };
  try {
    await fetch(base + endpoints.getTeacherSchedule, request).then(
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

export const cancelClass = async (
  tableId: string,
  classId: string,
  day: string,
  dispatch
) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    await fetch(
      base + endpoints.cancelClass + `${tableId}&${day}&${classId}`,
      request
    ).then((response) => {
      response.json().then((res) => {
        dispatch(res);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const rescheduleClass = async (
  tableId: string,
  classId: string,
  day: string,
  dispatch
) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  try {
    await fetch(
      base + endpoints.rescheduleClass + `${tableId}&${day}&${classId}`,
      request
    ).then((response) => {
      response.json().then((res) => {
        dispatch(res);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
