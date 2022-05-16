import PropTypes from 'prop-types';
import cn from 'classnames'
import './Block.scss'

const Block = ({children, className}) => {
    return (
        <div className={cn('block', className)}>{children}</div>
    );
}

Block.propTypes = {
    className: PropTypes.string,
}

export default Block;