/**
 * Created by feifei on 16/8/14.
 */
//var React=require("react");

var ReactMarkdown=require("react-markdown");
var Loading=require("./loading");

//var tt=require("./201609020袁剑《大拐点》.md");

var Page=React.createClass({
    getInitialState(){
        return({
            url:this.props.location.query.url,
            title:this.props.location.query.title,
            date:this.props.location.query.date,
            detail:"",
            loading:true
        });
    },
    componentDidMount(){
        console.log(" Page componentDidMount");


        let url=this.state.url;
        console.log(this.state);
        $.ajax({
            url:url
        }).done(function(data) {
            console.log(data);
            this.setState({
                detail:data,
                loading:false
            });
        }.bind(this));

    },
    render(){
        if(this.state.loading){
            return<Loading> </Loading>;
        }

        return<div className="content">
                <div className="blog_title page">{this.state.title}</div>
                <div className="blog_sub_title page">{this.state.date}</div>
                <div className="article"  >
                    <ReactMarkdown source={this.state.detail} softBreak="  "/>
                </div>
            </div>
    }
});

module.exports=Page;