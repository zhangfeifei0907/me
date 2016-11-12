/**
 * Created by feifei on 16/11/12.
 */

var Nav=require("./config").Nav;
var OperateNav=React.createClass({
    getDefaultProps:function(){
        return {
            filter:"string",//this.props.filter,
            back:false,//boolean,
            selectFilterHandle:function(filter){},//this.props.selectFilterHandle
        };
    },
    getInitialState(){
        let back=false;
        console.log(this.props.back);
        if(this.props.back==true){
            back=true
        }
        return({
            selected:false,
            filter:this.props.filter,
            back:back
        });
    },
    setVisible(){
        this.setState({selected:!this.state.selected});
    },
    selectFilterHandle(id,event){
        //console.log(id);
        this.setState({
            filter:id,
            selected:false
        });
        this.props.selectFilterHandle(id);
        event.stopPropagation();

    },
    render(){
        let tagNodes=Nav.map(function(i){
            let active="";
            if(i.id==this.state.filter){
                active="active"
            }
            return<span className={active} key={i.id} onClick={this.selectFilterHandle.bind(null,i.id)}>{i.name}</span>
        },this);

        let visible="",mobile_select="";
        if(this.state.selected){
            visible="visible";
            mobile_select="selected";
        }

        let backNode="";
        if(this.state.back){
            backNode=<span className="back_button" onClick={this.selectFilterHandle.bind(null,this.state.filter)}> </span>;
        }

        return<div className={"operate_nav "+mobile_select} >
            {backNode}
            <div className={"nav_item "+visible}>
                {tagNodes}
            </div>
            <i className={"operate_nav_mobile_icon "+mobile_select} onClick={this.setVisible}>
                <span className="line up">
                    <span className="up"></span>
                </span>
                <span className="line down">
                    <span  className="down"></span>
                </span>
            </i>
        </div>
    }
});

module.exports=OperateNav;