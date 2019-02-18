import React from 'react';
import ReactDom from 'react-dom';
import Daily from './Daily'

const  formatDate=(date)=> {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}
export default class Create extends React.Component {
    constructor(){
        super();
        this.state={
            date:formatDate(new Date()),
            category:"",
            money:"",
            notes:"",
            data:[]
        };
        this.handleDelete=this.handleDelete.bind(this);
    }



    componentWillMount(){
        axios.get('/api/dailies').then(response=>{
            this.setState({
                data:response.data
            });
        }).catch(error=>{console.log(error)})

    }
    handleDelete(detail){
         axios.delete('/api/dailies/'+detail.id);

        axios.get('/api/dailies').then(response=>{
            this.setState({
                data:response.data
            });
            console.log(response.data);
        }).catch(error=>{console.log(error)})
    }


    handleDateChange(e){
        this.setState(
            {date:e.target.value}
        )
    }
    handleContentChange(e){
        this.setState(
            {content:e.target.value}
        )
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('/api/dailies',this.state);
        axios.get('/api/dailies').then(response=>{
            this.setState({
                data:response.data
            })

        }).catch(error=>{console.log(error)})
        this.setState(
            {content:'',title:''}
        )
    }
    render(){
        let {data,date,money,category,notes}=this.state;
        return(
            <div>
                <h2>Account </h2>
                <div className="row">
                    <div className="thumbnail col-md-12" id="accordion">
                                <form className="form-text" method="post">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input  className="form-control" type="date" value={date} onChange={this.handleDateChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                                <label>Category:</label>
                                           <label><input  name="Category" type="radio"  value="Cost"/>Cost</label>
                                                    <label><input name="Category" type="radio"
                                                                  value="Income"/>Income</label>

                                    </div>
                                    <div className="form-group">
                                        <label id="theLabelOfMoney" className="control-label">Money</label>
                                        <input style={{color:'red'}} id="numberOfMoney" name="Money"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Notes</label>
                                        <input name="Notes" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-default"/>
                                    </div>
                                </form>

                    </div>
                </div>
                <Daily data={data} handleDelete={this.handleDelete} />
            </div>
            // <div>
            // <h2>Create Post</h2>
            //     <form className="form-text" onSubmit={this.handleSubmit.bind(this)}>
            //
            //         <div className="form-group" >
            //             <label className="col-form-label col-md-2">Title</label>
            //             <div className="col-md-10"><input type="text"
            //                 className="form-control" id="title" placeholder="Enter title" name="title" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/></div>
            //         </div>
            //         <div className="form-group">
            //             <label className="col-form-label col-md-2">Content</label>
            //             <div className="col-md-10"><input type="text"
            //                                               className="form-control" id="content" placeholder="Enter title" name="content" value={this.state.content} onChange={this.handleContentChange.bind(this)}/></div>
            //         </div>
            //         <div className="form-group">
            //             <div className="col-md-offset-2 col-md-10"><button type="submit" className="btn btn-primary">Save</button></div>
            //
            //         </div>
            //     </form>
            //     <Daily data={data} handleDelete={this.handleDelete} />
            // </div>
        )
    }


}
if(document.getElementById('app'))
    ReactDom.render(<Create/>,document.getElementById('app'));