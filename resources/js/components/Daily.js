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
        return(
        <div>
            <h2>List</h2>

                {this.props.data.map((daily)=>(

                    <table key={daily.id} className="table table-bordered">
                        <thead>
                        <tr ><th>{daily.id}</th><th>{daily.DailyTotal}</th><th>Delete</th></tr>
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
