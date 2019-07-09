import React, { PureComponent } from 'react';
import MaterialIcon from 'material-icons-react';
import styles from '../../styles/index.js';

class Button extends PureComponent {
    style = {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        marginLeft: 8,
        fontSize: '1.2em',
        backgroundColor: 'steelblue',
        color: '#eee',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        ...styles.boxWithShadow,
    }

    render() {
        const { icon, onClick } = this.props;
        return (
            <button style={this.style} onClick={onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;