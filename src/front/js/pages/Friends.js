import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const Friends = () => {
  const { store, actions } = useContext(Context);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    actions.verifyIfUserLoggedIn();
  }, [])


  useEffect(() => {
    actions.getFriendsList().then((data) => {
      setFriendsList(data);
    });

  }, [store.user])

  const handleUnfollowFriend = (friend) => {
    actions.deleteFriend(friend.friendship_id).then((data) => {
      if (data) {
        actions.getFriendsList().then((data) => {
          setFriendsList(data);
        });
      }
    });
  }

  return (
    <div className="friends_box container mt-5" style={{ width: "50rem" }}>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="title">
              <h1>My Friends</h1>
            </div>
          </div>
          <div className="col-6">
            <div className="search_bar">
              <form className="d-flex justify-content-end">
                <div class="input-group" style={{ width: "230px" }}>
                  <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input" />
                  <span class="input-group-append">
                    <button class="btn btn-outline-secondary border-start-0 border-bottom-0 border ms-n5" type="button">
                      <i class="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className="my-4 bold-hr" />
        {friendsList && friendsList.length > 0 ? (
          friendsList.map((friend) => {
            let user = friend.user2;
            if (store.user.user_id == friend.user2_id)
              user = friend.user1;
            return (
              <div className="friends_list" key={friend.friendship_id} >
                <div className="card mb-3" style={{ border: "none" }}>
                  <div className="row g-0">
                    <div className="col-md-2 mx-auto">
                      <img src={user.profileimg} className="card-img-top rounded-circle" alt="..." />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{user.name} {user.lastname}</h5>
                        <div className="row">
                          <div className="col">
                            <button className="btn" onClick={() => handleUnfollowFriend(friend)} style={{ color: "blue", textDecoration: "underline", border: "none" }}>Remove Friend</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div>No friends to display.</div>
        )}
      </div>
    </div>
  )
}