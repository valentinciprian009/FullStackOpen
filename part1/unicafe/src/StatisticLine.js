import React from 'react';

const StatisticLine = ({text, value}) => {
    if (text==='Positive') {
        return(
            <React.Fragment>
                <td>{text}</td>
                <td>{value}%</td>
            </React.Fragment>
        )
    } else {
        return(
            <React.Fragment>
                <td>{text}</td>
                <td>{value}</td>
            </React.Fragment>
        )
    }
}

export default StatisticLine