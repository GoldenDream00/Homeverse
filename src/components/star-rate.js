import Rate from 'rc-rate';

export default function StarRate ({value}) {
    return(
        <Rate allowHalf={true} value={value} disable={true}  />
    )
}
