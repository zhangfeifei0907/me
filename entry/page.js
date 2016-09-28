/**
 * Created by feifei on 16/8/14.
 */
//var React=require("react");

var ReactMarkdown=require("react-markdown");
var Loading=require("./loading");

//var tt=require("./201609020袁剑《大拐点》.md");

var Page=React.createClass({
    getInitialState(){
        console.log(this.props.params.id);
        let date=this.props.params.id;
        let dateStr=date.substring(0,4)+'年'+parseInt(date.substring(4,6))+'月'+parseInt(date.substring(6,8))+'日';
        return({
            id:date,
            title:"",
            date:dateStr,
            detail:"",
            loading:true
        });
    },
    componentDidMount(){
        console.log(" Page componentDidMountdff");
        let url;
        $.ajax({
            url:"bloglist.txt",
            async:false
        }).done(function(data) {
            console.log(data);
            let tempArr=data.toString().split('\n');
            if(tempArr[tempArr.length-1]==""){
                tempArr.pop();
            }
            //console.log(tempArr);

            for(let i=0;i<tempArr.length;i++){

                if(tempArr[i].indexOf(this.state.id)!=-1){
                    //console.log("yes");
                    //console.log(tempArr[i]);
                    url=tempArr[i];
                    break;
                }
            }

        }.bind(this));

        $.ajax({
            url:url
        }).done(function(data) {
            let tempStr=url.split("/");
            let tempTitle=tempStr[tempStr.length-1];
            tempTitle=tempTitle.substring(8,tempTitle.length-3);


            console.log(tempStr);
            console.log(tempTitle);
            this.setState({
                title:tempTitle,
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