import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CustomizerProps, ThemeProps } from '../../shared/prop-types/ReducerProps';

class MainWrapper extends PureComponent {
  static propTypes = {
    customizer: CustomizerProps.isRequired,
    theme: ThemeProps.isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { theme, customizer, children } = this.props;

    const wrapperClass = classNames({
      wrapper: true,
      'squared-corner-theme': customizer.squaredCorners,
      'blocks-with-shadow-theme': customizer.withBoxShadow,
      'top-navigation': customizer.topNavigation,
    });

    return (
      <div className={theme.className}>
        <div className={wrapperClass}>
          {children}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  theme: state.theme,
  customizer: state.customizer,
}))(MainWrapper);
