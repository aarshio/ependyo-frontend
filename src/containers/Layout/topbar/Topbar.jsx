import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarProfile from './TopbarProfile';


class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            {/* <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            /> */}
            {/* <Link className="topbar__logo" to="/" /> */}
            <Link style={{"paddingLeft":"30px", "paddingTop":"15px", "font-weight":"bolder", "fontSize":"170%"}} to="/">EPENDYO</Link>
          </div>
          <div className="topbar__right">
            {/* TODO MAKE SEARCH WORK! <TopbarSearch /> */}
            {/* <TopbarNotification />
            <TopbarMail new /> */}
            <TopbarProfile />
            {/* <TopbarLanguage /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
