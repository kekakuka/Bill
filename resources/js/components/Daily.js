import React from 'react';
import ReactDom from 'react-dom';

export default class Daily extends React.Component {
    constructor(props){
        super(props);
    }

    deleteDetail(detail){
       this.props.handleDelete(detail)
    }
    render(){
        let myStyle={'Notes':{width:'40%'},'redMoney':{width:'40%',color:'red'},'greenMoney':{width:'40%',color:'green'},'Button':{width:'20%'}};

        return(
        <div>
            <h2>List</h2>

                {this.props.data.map((daily)=>(
                    <table key={daily.id} className="table table-bordered">
                        <thead>
                        <tr ><th style={myStyle.Notes}>Date: {daily.id}</th><th style={daily.DailyTotal<0?myStyle.redMoney:myStyle.greenMoney}>{daily.DailyTotal}</th><th style={myStyle.Button}>Delete The Detail</th></tr>
                        </thead>
                        <tbody>
                        {daily.details.map((detail)=>(

                            <tr key={detail.id}>
                                <td>{detail.Notes}</td>
                                <td style={detail.Cost==0?{color:'green'}:{color:'red'}}>{detail.Cost==0?detail.Income:(-detail.Cost).toFixed(2) }</td>

                                <td>
                                    <button className="btn btn-danger" onClick={this.deleteDetail.bind(this,detail)}>Delete</button>
                                </td></tr>
                            )

                        )}


                        </tbody>
                    </table>


                    )
                )}

        </div>
        )
    }
}
