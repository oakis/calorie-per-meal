import React, { PureComponent } from 'react';

export class FoodTable extends PureComponent {
    style = {
        table: {
            width: '100%',
            textAlign: 'left',
            marginTop: 15,
            borderCollapse: 'collapse',
        },
        th: {
            borderBottom: '1px solid #555',
            padding: '1px 0px',
        },
    }

    render() {
        const { data } = this.props;
        return (
            <table style={this.style.table}>
                <thead>
                    <tr>
                        <th style={this.style.th}>Namn</th>
                        <th style={this.style.th}>Värde</th>
                        <th style={this.style.th}>Enhet</th>
                    </tr>
                </thead>
                <tbody>
                {data.nutrition.map(item => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                        <td>{item.unit}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}
