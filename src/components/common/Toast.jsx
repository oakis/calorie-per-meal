import React, { PureComponent } from 'react';
import MaterialIcon from 'material-icons-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from '../../styles/index.js';
import './Toast.css';

class Toast extends PureComponent {
    style = {
        position: 'fixed',
        bottom: 15,
        left: '50%',
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        fontSize: '1.2em',
        backgroundColor: 'steelblue',
        color: '#eee',
        cursor: 'pointer',
        ...styles.boxWithShadow,
    }

    componentWillReceiveProps(props) {
        if (props.open) {
            setTimeout(() => {
                this.props.close();
            }, 5000);
        }
    }

    render() {
        const { icon, open, text, close } = this.props;
        return (
            <TransitionGroup>
                {open && 
                <CSSTransition className='animate-toast' timeout={{ enter: 500, exit: 500 }}>
                    <div style={this.style} onClick={close}>
                        <MaterialIcon color={this.style.color} size="small" icon={icon} />
                        <span style={{ marginLeft: 8 }}>{text}</span>
                    </div>
                </CSSTransition>
                }
            </TransitionGroup>
        );
    }
}

export default Toast;