import React, { PureComponent } from 'react';
import MaterialIcon from 'material-icons-react';

class IconButton extends PureComponent {
    style = {
        border: 0,
        color: 'transparant',
        cursor: 'pointer',
        padding: 0,
        position: 'relative',
        top: 1,
    }
    render() {
        const { onClick, ...rest } = this.props;
        return (
            <button onClick={(e) => { e.stopPropagation(); onClick(); }} style={this.style}>
                <MaterialIcon {...rest} />
            </button>
        );
    }
}

export default IconButton;