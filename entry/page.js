/**
 * Created by feifei on 16/8/14.
 */
//var React=require("react");

var ReactMarkdown=require("react-markdown");
var Loading=require("./loading");

//var tt=require("./201609020袁剑《大拐点》.md");

var Page=React.createClass({
    getInitialState(){
        //console.log(this.props.location.query.url);
        let temp=this.props.location.query.data.split("/");
        let filename=temp[3];
        //console.log(filename);
        let tempTitle=filename.substring(8).split(".");
        let title=tempTitle[0];
        let date=filename.substring(0,8);
        let dateStr=date.substring(0,4)+'年'+parseInt(date.substring(4,6))+'月'+parseInt(date.substring(6,8))+'日';
        return({
            url:this.props.location.query.data,
            title:title,
            date:dateStr,
            detail:"",
            loading:true
        });
    },
    componentDidMount(){
        //console.log(" Page componentDidMountdff");


        let url=this.state.url;
        //console.log(this.state);
        $.ajax({
            url:url
        }).done(function(data) {
            //console.log(data);
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
            <a className="backToIndex" href="index.html">返回博客主页 </a>
                <div className="blog_title page">{this.state.title}</div>
                <div className="blog_sub_title page">{this.state.date}</div>
                <div className="article"  >
                    <ReactMarkdown source={this.state.detail} softBreak="  "/>
                </div>
            </div>
    }
});

module.exports=Page;