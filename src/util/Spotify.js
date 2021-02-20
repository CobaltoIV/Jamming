let accessToken;
let expiresIn;
const clientId = "913d5d36816149ebb5e38833acee3fdc";
const redirectURI = "http://localhost:3000/";
const Spotify = {
  getAccessToken() {
    const url = window.location.href;
    if (!accessToken) {
      accessToken = url.match(/access_token=([^&]*)/);
      expiresIn = url.match(/expires_in=([^&]*)/);
    }
    if (accessToken && expiresIn) {
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
};
export default Spotify;
