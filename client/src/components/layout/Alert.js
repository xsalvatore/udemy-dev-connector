// imports the packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
};

// holds the types of props passed to the component
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// maps the state of the store to the props
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

// exports our components with connect from react-redux
export default connect(mapStateToProps)(Alert);
