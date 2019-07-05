import React, { PureComponent } from 'react';
import { FoodTable } from './FoodTable.jsx';
import styles from '../../styles/index.js';
import IconButton from '../common/IconButton.jsx';

export class SelectedItem extends PureComponent {

    style = {
        wrapper: {
            alignSelf: 'flex-end',
            flex: 1,
            padding: 15,
            ...styles.boxWithShadow,
        },
        header: {
            wrapper: {
                display: 'flex',
                justifyContent: 'space-between',
            }
        },
        name: {
            fontSize: '1.5em',
            marginBottom: 8,
        },
    }

    render() {
        const { data } = this.props;
        return (
            <div style={{...this.style.wrapper, ...this.props.style}}>
                <div style={this.style.header.wrapper}>
                    <div>
                        <div style={this.style.name}>{data.name}</div>
                        <div><em>Vikt: {data.weight}g</em></div>
                        <div><em>Grupp: {data.group}</em></div>
                    </div>
                    <IconButton
                        onClick={() => this.props.clearSelectedItem()}
                        icon="close"
                        color="tomato"
                        size="small"
                        style={{ alignSelf: 'flex-start' }}
                    />
                </div>
                <FoodTable data={data} />
            </div>
        );
    }
}
