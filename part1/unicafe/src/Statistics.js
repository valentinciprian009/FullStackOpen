import StatisticLine from './StatisticLine'

const Statistics = (props) => {
    return(
        <tbody>
        <tr><StatisticLine text='Good' value={props.goodVote}/></tr>
        <tr><StatisticLine text='Neutral' value={props.neutralVote}/></tr>
        <tr><StatisticLine text='Bad' value={props.badVote}/></tr>
        <tr><StatisticLine text='Total' value={props.allVotes}/></tr>
        <tr><StatisticLine text='Average' value={props.averageOfAllVotes}/></tr>
        <tr><StatisticLine text='Positive' value={props.positiveOfAllVotes}/></tr>
        </tbody>
    )
}

export default Statistics