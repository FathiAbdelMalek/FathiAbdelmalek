import {
  PROJECTS_GET_FAIL,
  PROJECTS_GET_SUCCESS,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
} from "../types";
import instance from "../axios";

export const getProjects = () => async (dispatch) => {
  let res;
  try {
    res = await instance.get(`projects`);
    if (res.status === 200)
      dispatch({
        type: PROJECTS_GET_SUCCESS,
        payload: res.data,
      });
    else
      dispatch({
        type: PROJECTS_GET_FAIL,
      });
  } catch (e) {
    dispatch({
      type: PROJECTS_GET_FAIL,
    });
  }
  return res;
};

export const createProject = (data) => async (dispatch) => {
  const name = data.get("name");
  const description = data.get("description");
  const image = data.get("image");
  let res;
  try {
    if (image && image !== "null") {
      res = await instance.post(`projects/`, data);
    } else {
      const body = JSON.stringify({ name, description });
      res = await instance.post(`projects/`, body);
    }
    if (res.data.success) {
      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: PROJECT_CREATE_FAIL,
      });
    }
  } catch (err) {
    console.log("error in action");
    console.log(err);
    dispatch({
      type: PROJECT_CREATE_FAIL,
    });
  }
  return res;
};
