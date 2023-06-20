import purify from './purify';

//previous function that set user, neighbors, token, and logged in
// function setReturnedUsers(email, data, neighbors, login, token, user) {
//    //set user and neighbor states, set token, set logged in
//    const loggedInUser = data.find((user) => purify(user.email) === purify(email));
//    const onlyNeighbors = data.filter(
//       (neighbor) => neighbor.email !== loggedInUser.email
//    );
//    //set neighbors state
//    // setNeighbors(onlyNeighbors);
//    neighbors(onlyNeighbors);
//    //set logged in
//    // setLoggedIn(true)
//    login(true);
//    //place a token for logged in user
//    // setToken(loggedInUser.email);
//    token(purify(loggedInUser.email));
//    //set user state
//    // setUser(loggedInUser);
//    user(loggedInUser);
// }

// new function that sets only neighbors
function setReturnedUsers(email, data, neighbors, login) {
   //set neighbor state, set logged in
   const loggedInUser = data.find((user) => purify(user.email) === purify(email));
   const onlyNeighbors = data.filter(
      (neighbor) => neighbor.email !== loggedInUser.email
   );
   //set neighbors state
   neighbors(onlyNeighbors);
   //set logged in
   login(true);
};

export default setReturnedUsers;