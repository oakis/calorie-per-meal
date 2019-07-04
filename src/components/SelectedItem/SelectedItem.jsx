import React, { PureComponent } from 'react';
import { FoodTable } from './FoodTable.jsx';
import Button from '../common/Button.jsx';
import styles from '../../styles/index.js';

export class SelectedItem extends PureComponent {

    style = {
        wrapper: {
            alignSelf: 'flex-end',
            flex: 1,
            marginLeft: 4,
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
        const { addItem, data } = this.props;
        return (
            <div style={this.style.wrapper}>
                <div style={this.style.header.wrapper}>
                    <div style={this.style.header.left}>
                        <div style={this.style.name}>{data.name}</div>
                        <div><em>Vikt: {data.weight}g</em></div>
                        <div><em>Grupp: {data.group}</em></div>
                    </div>
                    <div>
                        <Button
                            icon="add"
                            onClick={() => addItem({
                                name: data.name,
                                kcal: data.nutrition.find(item => item.name === 'Energi (kcal)').value,
                                number: data.number,
                            })}
                        />
                    </div>
                </div>
                <FoodTable data={data} />
            </div>
        );
    }
}
