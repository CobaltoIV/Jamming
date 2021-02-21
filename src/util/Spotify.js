let accessToken;
let expiresIn;
const clientId = "913d5d36816149ebb5e38833acee3fdc";
const redirectURI = "http://quarrelsome-quartz.surge.sh/";

export const Spotify = {
  getAccessToken() {
    let url = window.location.href;

    if (!accessToken) {
      accessToken = url.match(/access_token=([^&]*)/);
      expiresIn = url.match(/expires_in=([^&]*)/);
      if (accessToken && expiresIn) {
        accessToken = accessToken[1];
        expiresIn = expiresIn[1];
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
    }
  },

  async search(term) {
    this.getAccessToken();
    console.log(accessToken);
    console.log(expiresIn);
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    if (response.ok) {
      const jsonResponse = await response.json();
      const tracks = jsonResponse.tracks.items;
      const list = tracks.map((t) => {
        return {
          id: t.id,
          name: t.name,
          album: t.album.name,
          artist: t.artists[0].name,
          uri: t.uri,
        };
      });
      return list;
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    this.getAccessToken();
    let token = accessToken;
    let head = { Authorization: "Bearer " + token };
    let playlistID;
    let userId;
    try {
      const user = await fetch(`https://api.spotify.com/v1/me`, {
        headers: head,
      });
      if (user.ok) {
        const jsonUser = await user.json();
        userId = jsonUser.id;
      }

      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: head,
          body: JSON.stringify({ name: playlistName }),
        }
      );
      console.log(response);
      if (response.ok) {
        const jsonResponse = await response.json();
        playlistID = jsonResponse.id;
      }
      const addResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
        {
          method: "POST",
          headers: head,
          body: JSON.stringify({ uris: trackURIs }),
        }
      );

      if (addResponse.ok) {
        const jsonResponse = await addResponse.json();
        playlistID = jsonResponse.id;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
