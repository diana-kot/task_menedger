import PropTypes from "prop-types";
import cn from 'classnames'


import Button from '@mui/material/Button';
import './Button.scss'

const Buttons = props => {
  return <Button variant="contained"
    {...props}
    className={cn('button', props.className, {
        "button-large": props.size === 'large'
    }
    )}/>
};


Buttons.propTypes = {
 className: PropTypes.string,
};

export default Buttons;
