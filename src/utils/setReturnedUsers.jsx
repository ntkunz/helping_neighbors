function setReturnedUsers(email, data, neighbors, login, token, user) {
   //set user and neighbor states, set token, set logged in
   //if user found, separate user and neighbors
   const loggedInUser = data.find((user) => user.email === email);
   const onlyNeighbors = data.filter(
      (neighbor) => neighbor.email !== loggedInUser.email
   );
   //set neighbors state
   // setNeighbors(onlyNeighbors);
   neighbors(onlyNeighbors);
   //set logged in
   // setLoggedIn(true)
   login(true);
   //place a token for logged in user
   // setToken(loggedInUser.email);
   token(loggedInUser.email);
   //set user state
   // setUser(loggedInUser);
   user(loggedInUser);
}

export default setReturnedUsers;