import React from 'react';
import ReactDom from 'react-dom';
import Daily from './Daily'


let user_id=document.getElementById('theUserId')?document.getElementById('theUserId').innerText:1;

const  formatDate=(date)=> {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}
let moneyStyle={color:'red',fontSize:'18px'};
let checked=true;
export default class Create extends React.Component {
    constructor(){
        super();
        this.state={
            date:formatDate(new Date()),
            category:"Cost",
            money:"",
            notes:"",
            data:[],
            user_id:user_id,
            user_amount: 0,
            moneyAlert:"",
            notesAlert:"",
            enter:"Submit"
        };

        this.handleDelete=this.handleDelete.bind(this);
    }


    getApi(){
        axios.get('/api/dailies/'+this.state.user_id).then(response=>{
            this.setState({
                data:response.data
            });
        }).catch(error=>{console.log(error)})

        axios.get('/api/users/'+this.state.user_id).then(response=>{
            this.setState({
                user_amount:response.data
            });
        }).catch(error=>{console.log(error)})
    }

    componentWillMount(){
       this.getApi();
    }

    handleDelete(detail){
         axios.delete('/api/dailies/'+detail.id);
         this.getApi();
    }


    handleDateChange(e){
        this.setState(
            {date:e.target.value}
        )
    }
    handleCategoryChange(e){
        this.setState(
            {category:e.target.value}
        );

       if(e.target.value==="Income"){
           moneyStyle={color:"green",fontSize:'18px'};
           checked=false;
       }
       else {
           moneyStyle={color:"red",fontSize:'18px'};
           checked=true;
       }

    }
    handleMoneyChange(e){
        if(Number(e.target.value)<1000000){
        this.setState(
            {money:e.target.value,moneyAlert:"",  enter:"Submit"}
        );
        }
        else {
            this.setState(
                { moneyAlert:"The number of Money is wrong",  enter:"Submit"}
            );
        }
    }
    handleNotesChange(e){
        if(e.target.value.length<60){
        this.setState(
            {notes:e.target.value,notesAlert:"",  enter:"Submit"}
        )}
        else {
            this.setState(
                {notesAlert:"The Notes is to long",  enter:"Submit"}
            )
        }
    }
    handleSubmit(e){
        e.preventDefault();
        if(Number.isNaN(Number(this.state.money))||Number(this.state.money)===0){
            this.setState(
                { moneyAlert:"The number of Money is wrong",  enter:"Submit"}
            );
            return;
        }
        axios.post('/api/dailies',this.state);
        this.getApi();
        this.setState({
            money:"",notes:"", moneyAlert:"", notesAlert:"",enter:"The Detail Has Recorded",
        });
    }
    render(){
        let {data,date,money,notes,user_amount,moneyAlert,notesAlert,enter}=this.state;
        return(
            <div>
                <h2>Your Account  <span style={user_amount<0?{color:"red"}:{color:"green"}}>${user_amount}</span></h2>
                <div className="row">
                    <div className="thumbnail col-md-12" id="accordion">
                                <form className="form-text"  onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label style={{fontSize:'20px'}}>Date</label>
                                        <input  style={{fontSize:'18px'}} className="form-control" type="date" value={date} onChange={this.handleDateChange.bind(this)}/>
                                    </div>
                                    <div className="form-group" >
                                                <label style={{fontSize:'20px'}}> Category: </label>
                                        <label style={{marginLeft:'20px',fontSize:'20px'}} >     <input   name="Category" type="radio" value="Cost" checked={checked}  onChange={this.handleCategoryChange.bind(this)}/>Cost</label>
                                        <label style={{marginLeft:'20px',fontSize:'20px'}}>   <input    name="Category" type="radio" value="Income" checked={!checked} onChange={this.handleCategoryChange.bind(this)} />Income</label>
                                    </div>
                                    <div className="form-group">
                                        <label style={{fontSize:'20px'}} id="theLabelOfMoney" className="control-label" >Money <span style={{color:'red'}}>{moneyAlert}</span></label>
                                        <input  style={moneyStyle} id="numberOfMoney" name="Money" value={money}
                                               onChange={this.handleMoneyChange.bind(this)}     className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label style={{fontSize:'20px'}} className="control-label">Notes <span style={{color:'red'}}>{notesAlert}</span></label>
                                        <input style={{fontSize:'18px'}} name="Notes" className="form-control" value={notes} onChange={this.handleNotesChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <input  value={enter} type="submit" className="btn btn-primary" />
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