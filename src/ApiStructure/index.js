import instance from "./instance";
import * as RequestApi from "./RequestApi";
import { history } from "../history";
import { toast } from "react-toastify";
// Start Challenge

// fetch all data for challenge
export const fetchAllChallenge = async () => {
  try {
    const response = await instance.get(
      RequestApi.ChallengeRequest.fetchAllChallenge
    );
    return response;
  } catch (err) {
    return err;
  }
};

// fetch Particular challenge api
export const fetchParticularChallenge = async (id) => {
  try {
    const response = await instance.get(
      `${RequestApi.ChallengeRequest.fetchAllChallenge}/${id}`
    );
    return response;
  } catch (err) {
    history.push("/challenge/dashboard");
    if (err && err.response && err.response.data && err.response.data.data) {
      console.log(err.response.data.data);
      toast.error(err.response.data.data);
    } else {
      // toast.error("Something went wrong!");
    }
    return err;
  }
};

// Delete Particular challenge api
export const deleteParticularChallenge = async (id) => {
  try {
    const response = await instance.delete(
      `${RequestApi.ChallengeRequest.deleteChallenge}/${id}`
    );
    return response;
  } catch (err) {
    if (err && err.response && err.response.data && err.response.data.data) {
      console.log(err.response.data.data);
      toast.error(err.response.data.data);
    } else {
      toast.error("Something went wrong!");
    }
    return err;
  }
};

// update Particular challenge api
export const updateParticularChallenge = async (id, data) => {
  try {
    const response = await instance.patch(
      `${RequestApi.ChallengeRequest.updateChallenge}/${id}`,
      data
    );
    return response;
  } catch (err) {
    return err;
  }
};

// update Particular challenge api
export const createParticularChallenge = async (data) => {
  try {
    const response = await instance.post(
      `${RequestApi.ChallengeRequest.createChallenge}`,
      data
    );
    return response;
  } catch (err) {
    return err;
  }
};

// fetch all recent activity
export const fetchAllRecentActivity = async (id) => {
  try {
    const response = await instance.get(
      `${RequestApi.ChallengeRequest.recentActivity}/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};
// fetch all recent activity
export const countUserInChallenge = async (id) => {
  try {
    const response = await instance.get(
      `${RequestApi.ChallengeRequest.countUserInChallenge}/${id}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

//count of total challenge, remaining challenge and today's challenge
export const challengeDashboardCount = async () => {
  try {
    const response = await instance.get(
      `${RequestApi.ChallengeRequest.challengeDashboardCount}`
    );
    return response;
  } catch (err) {
    return err;
  }
};

// End Challenge

// start Image Upload

export const uploadImage = async (data) => {
  try {
    const response = await instance.post(
      `${RequestApi.ImageRequest.uploadImage}`,
      data
    );
    return response;
  } catch (err) {
    return err;
  }
};

// End Image Upload
