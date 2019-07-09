import React, { PureComponent } from 'react';
import MaterialIcon from 'material-icons-react';

class IconButton extends PureComponent {
    style = {
        border: 0,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: 0,
        position: 'relative',
        top: 1,
    }
    render() {
        const { onClick, style, ...rest } = this.props;
        return (
            <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={{ ...this.style, ...style }}>
                <MaterialIcon {...rest} />
            </button>
        );
    }
}

export default IconButton;