import React from "react";
import Posts from "../../../Home/components/Posts";

const ProfileActivities = props => {
  return (
    <div>
      {/* <ProfileActivity img={Ava1} date="1 min ago" name="Lora Kolly">
      <p>Dependent certainty off discovery him his tolerably offending. Ham for attention remainder sometimes
            additions recommend fat our.
      </p>
    </ProfileActivity> */}
      {props.posts !== undefined ? (
        props.posts.map((post, key) => {
          return <div><Posts props={post} /></div>;
        })
      ) : (
        <div />
      )}
    </div>
  );
};

export default ProfileActivities;
