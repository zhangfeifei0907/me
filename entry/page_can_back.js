/**
 * Created by feifei on 16/8/14.
 */
//var React=require("react");

var ReactMarkdown=require("react-markdown");
var Loading=require("./loading");
let OperateNav=require("./operate_nav");


var PageCanBack=React.createClass({
    getInitialState(){
        //console.log(this.props.params.id);
        //console.log(this.getQuery("id"));
        //console.log(this.getQuery("filter"));
        let date=this.getQuery("id");
        let dateStr=date.substring(0,4)+'年'+parseInt(date.substring(4,6))+'月'+parseInt(date.substring(6,8))+'日';
        return({
            id:date,
            title:"",
            filter:this.getQuery("filter"),
            date:dateStr,
            detail:"",
            loading:true
        });
    },
    getQuery(type,defaultValue,props){
        var mProps = props || this.props;
        return mProps.location.query.hasOwnProperty(type)?eval('mProps.location.query.'+type):defaultValue;
    },
    componentDidMount(){
        //console.log(" Page componentDidMountdff");
        let url;
        $.ajax({
            url:"bloglist.txt",
            async:false
        }).done(function(data) {
            //console.log(data);
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


            //console.log(tempStr);
            //console.log(tempTitle);
            this.setState({
                title:tempTitle,
                detail:data,
                loading:false
            });
        }.bind(this));

    },
    selectFilterHandle(filter){
        //console.log(filter);
        window.location.href='./index.html#/?filter='+filter;
    },
    render(){
        console.log(this.state.filter);
        if(this.state.loading){
            return<div>
                    <div className="blog_loading">
                        <Loading> </Loading>
                    </div>

                </div>;
        }


        return<div className="content page">
            <OperateNav filter={this.state.filter} selectFilterHandle={this.selectFilterHandle} filter={this.state.filter} back={true}/>
            <div className="blog_title page">{this.state.title}</div>
            <div className="blog_sub_title page">{this.state.date}</div>
            <div className="article"  >
                <ReactMarkdown source={this.state.detail} softBreak="  "/>
            </div>
        </div>
    }
});



module.exports=PageCanBack;