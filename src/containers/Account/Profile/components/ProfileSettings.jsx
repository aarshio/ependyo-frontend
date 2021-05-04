import React from "react";
import {   Input } from "reactstrap";


const ProfileSettings = () => {
  return (
    <div>
      <Input
        name="username"
        placeholder="Say something about yourself..."
        type="textarea"
        style={{ "min-height": "120px" }}
        maxLength="300"
      />
      <br />
      <button className="btn btn-primary btn-sm">Update Bio</button>
    </div>
  );
};

export default ProfileSettings;
