import React, {Component} from "react";
import LottoNumber from "./LottoNumber";

const LOTTO_NUMBER_COUNT = 6;

class Lotto extends Component {

    invalid(list) {
        if (!list || list == 0) return true;
        if (list.length != LOTTO_NUMBER_COUNT) return true;
        if (this.hasSameNumber(list)) return true;
        return false;
    }

    hasSameNumber(list) {
        while(list.length) {
            if (this.contains(list, list.splice(0,1))) return true;
        }
        return false;
    }

    contains(list, number) {
        var i = list.length;
        while (i--) {
            if (list[i] == number) {
                return true;
            }
        }
        return false;
    }

    render () {
        if (this.invalid([...this.props.numberList])) return <span></span>;
        return (
            <span>
                {this.props.numberList.map((_number,index)=>
                    <LottoNumber
                        key={_number.toString()+index}
                        number={_number}/>
                )}
            </span>
        )
    }

}

export default Lotto