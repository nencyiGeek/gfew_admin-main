const ChallengeRequest = {
  fetchAllChallenge: "/challenges",
  deleteChallenge: "/deletechallenge",
  updateChallenge: "/updateChallenge",
  createChallenge: "/createchallenge",
  recentActivity: "/userChallenge/recent",
  countUserInChallenge: "userchallenge/count",
  challengeDashboardCount: "/challenges/dashboard"
};

const ImageRequest = {
  uploadImage: "/aws-image-upload",
}

export { ChallengeRequest, ImageRequest };
