import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';

class StatsHeader extends React.Component {
  render() {
    const {styles} = this.props;
    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
      <Link to="/">
        <div>
          <AppBar
            style={{...styles, ...style.appBar}}
            iconElementLeft={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg"/>}
            title="Materialize"
          />
        </div>
      </Link>
    );
  }
}

StatsHeader.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func
};

export default StatsHeader;
