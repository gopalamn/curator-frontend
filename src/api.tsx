import apisauce from "apisauce";
import Cookies from "js-cookie";

const LOCAL = false;

export default function API() {
  // Key stored in environment variable using 'export'
  let google_api_key = process.env.GOOGLE_API_KEY;

  let tmdb_api_key = process.env.TMDB_API_KEY;

  const api = apisauce.create({
    baseURL: LOCAL
      ? "http://127.0.0.1:5000/api/"
      : "https://curator-app-backend.herokuapp.com/api/",
    headers: {
      Authorization: `JWT ${Cookies.get("accessToken")}`,
    },
  });

  const google_books_api = apisauce.create({
    baseURL: "https://www.googleapis.com/books/v1/",
  });

  const tmdb_api = apisauce.create({
    baseURL: "https://api.themoviedb.org/3/",
  });

  const searchMovies = (q: any) =>
    tmdb_api.get("search/movie", {
      api_key: tmdb_api_key,
      query: q,
    });

  const tmdb_config = () =>
    tmdb_api.get("configuration", {
      api_key: tmdb_api_key,
    });

  const searchTVShows = (q: any) =>
    tmdb_api.get("search/tv", {
      api_key: tmdb_api_key,
      query: q,
    });

  const searchVolumes = (query: any) =>
    google_books_api.get("volumes", {
      q: query,
      key: google_api_key,
      maxResults: "6",
    });

  const setAccessToken = (token: any) =>
    api.setHeader("Authorization", `JWT ${token}`);

  const authenticate = (email: any, password: any) =>
    api.post("auth/", { email, password });

  const getUser = (username: any) =>
    api.get("get_user/", {
      username,
    });

  const addUser = (
    email: any,
    username: any,
    password: any,
    firstname: any,
    lastname: any
  ) =>
    api.post("add_user/", {
      email,
      username,
      password,
      firstname,
      lastname,
    });

  const setProfilePic = (profilePic: any) => {
    const form = new FormData();
    form.append("profile_pic", profilePic);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    return api.post("set_profile_pic/", form, { headers });
  };

  const setPassword = (oldPassword: any, newPassword: any) =>
    api.put("set_password/", {
      old_password: oldPassword,
      new_password: newPassword,
    });

  const addIndividualBooks = (books_list: any) =>
    api.post("new_individual_book/", {
      books: books_list,
    });

  const getUserBooks = (userID: any) =>
    api.get("get_user_books/", {
      user_id: userID,
    });

  const deleteUserBook = (book_api_id: any) =>
    api.delete("delete_user_book/", {
      book_api_id,
    });

  const linkPreview = (url: any) =>
    api.get("link_preview/", {
      url,
    });

  const addLinkPost = (linkObj: any) =>
    api.post("new_link_post/", {
      linkObj,
    });

  const getUserLinks = (userID: any) =>
    api.get("get_user_links/", {
      user_id: userID,
    });

  const deleteUserLink = (link_post_id: any) =>
    api.delete("delete_user_link/", {
      link_post_id,
    });

  return {
    setAccessToken,
    authenticate,
    getUser,
    addUser,
    setProfilePic,
    setPassword,
    addIndividualBooks,
    getUserBooks,
    deleteUserBook,
    searchVolumes,
    searchMovies,
    searchTVShows,
    tmdb_config,
    addLinkPost,
    linkPreview,
    getUserLinks,
    deleteUserLink,
  };
}
