import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from "react-loading"

const Loading = props => {
    const {width, height} = props
    return (
        <div>
            <ReactLoading type="spin" color="#60ac5d" height={height} width={width} />
        </div>
    );
};

Loading.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
};

export default Loading;