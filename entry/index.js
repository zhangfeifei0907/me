/**
 * Created by Administrator on 2016/8/3.
 */
var React=require("react");
var ReactMarkdown=require("react-markdown");
var ReactRouter = require('react-router');
var hashHistory = ReactRouter.hashHistory;

var Nav=require("./config").Nav;

var Order=require("./sort");
var Loading=require("./loading");

require("./../less/index.less");



var Blog=React.createClass({
    getInitialState(){

        return({
            list:"",//总的文件列表
            // sourceArticles:null,
            articleOrderByFilter:null,
            filter:Nav[0].id,

            pageNum:1,
            pageSize:2,
            pageloading:true,
            allLoading:true
        })
    },
    componentDidMount(){
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
            let sourceArticles=[];

            for(let i=0;i<tempArr.length;i++){
                let temp=tempArr[i].split("/");
                let tempObj={
                    id:tempArr[i],
                    tag:temp[2],
                    date:temp[3].slice(0,8),
                    title:temp[3].slice(8,-3),
                    detail:""
                };
                sourceArticles.push(tempObj);
            }
            this.setState({list:sourceArticles});
            this.loadingArticles(sourceArticles,this.state.filter);

        }.bind(this));

        $(document.body).scroll(function(){
            this.scrollLoading();
        }.bind(this));
    },
    loadingArticles(list,filter,pageNum=1){
        let articleOrderByFilter=[];

        for(let i=0;i<list.length;i++){
            if(filter=="all"){
                articleOrderByFilter.push(list[i]);
            }else {
                if(list[i].tag==filter){
                    articleOrderByFilter.push(list[i]);
                }
            }
        }
        //console.log(list);
        //console.log(articleOrderByFilter);

        let orderedArticleOrderByFilter=articleOrderByFilter.sort(Order.by("date"));

        this.setState({articleOrderByFilter:articleOrderByFilter});
        this.reload(orderedArticleOrderByFilter,pageNum);
    },
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.location.query.filter!=this.state.filter){
            this.loadingArticles(this.state.list,nextProps.location.query.filter);
            this.setState({
                filter:nextProps.location.query.filter,
                allLoading:true
            });
        }
    },
    historyPush(json){
        var query = this.props.location.query;
        for(var i in json)
        {
            eval("query."+i+"=json[i]");
        }
        hashHistory.push({pathname:this.props.location.pathname,query:query});
    },
    selectFilterHandle(filter){
        this.historyPush({filter:filter});
    },
    reload(arrObj,pageNum){
        let pageSize=this.state.pageSize;
        if(arrObj.length<=(pageNum-1)*pageSize){
            this.setState({pageloading:false});
            return;
        }

        let start,end;
        if(pageNum==1){
            start=0
        }else {
            start=(pageNum-1)*pageSize;
        }

        if(arrObj.length<pageNum*pageSize){
            end=arrObj.length-1;
        }else {
            end=pageNum*pageSize-1;
        }
        for(let i=start;i<=end;i++){
            $.ajax({
                url:arrObj[i].id
            }).done(function(data){
                arrObj[i].detail=data;
                if(this.checkLoaded(arrObj,start,end,"detail")){
                    this.state.allLoading=false;
                    this.state.pageloading=false;
                    this.state.pageNum=pageNum;
                    this.forceUpdate();
                }
            }.bind(this));
        }

    },
    checkLoaded(arrObj,start,end,tagName){
        let loaded=true;
        for(let i=start;i<end;i++){
            if(arrObj[i][tagName]==""){
                loaded=false;
                break;
            }
        }
        return loaded;

    },
    scrollLoading(){
        let containerHeight=$(document.body).height();
        let sHeight = document.body.scrollHeight,
            sTop = document.body.scrollTop;

        //if( sTop >= sHeight-containerHeight ){
        if( sHeight-containerHeight==0 ){
            this.setState({pageloading:true});

            this.reload(
                this.state.articleOrderByFilter,
                this.state.pageNum+1
            );

            console.log("滚动条到底部了");
        }
    },

    render(){
        let tagNodes=Nav.map(function(i){
            let active="";
            if(i.id==this.state.filter){
                active="active"
            }
            // return<span className={active} key={i.id} onClick={this.setFilter.bind(null,i.id)}>{i.name}</span>
            return<span className={active} key={i.id} onClick={this.selectFilterHandle.bind(null,i.id)}>{i.name}</span>
        },this);
        if(this.state.allLoading){
            return<div className="content">
                <div className="blog_title">菲的博客</div>
                <div className="blog_sub_title">一个好奇宝宝,甜甜地欣赏着世界纷繁多样的美</div>
                <div className="tags">
                    {tagNodes}
                </div>
                <hr/>
                <Loading> </Loading>
            </div>
        }

        //console.log(this.state);

        let blogListNode,scrollLoading;
        blogListNode=this.state.articleOrderByFilter.map(function(i){
            if(i.detail!=""){
                // console.log(i);
                let datestr= i.date.substring(0,4)+"年"+parseInt(i.date.substring(4,6))+"月"+parseInt(i.date.substring(6,8))+"日"

                return<div key={i.id} >
                    <div className="article_title">{i.title}</div>
                    <div className="article_date">{datestr}</div>
                    <ReactMarkdown className="article_content" source={i.detail} />
                </div>
            }
        },this);
        if(this.state.pageloading){
            scrollLoading=<Loading> </Loading>;
        }

        return<div className="content" onScroll={this.scrollLoading}>
            <div className="blog_title">菲的博客</div>
            <div className="blog_sub_title">一个好奇宝宝,甜甜地欣赏着世界纷繁多样的美</div>
            <div className="tags">
                {tagNodes}
            </div>

            <hr/>
            <div className="articles" ref="articles"  >
                {blogListNode}
                {scrollLoading}
            </div>
        </div>
    }
});




module.exports=Blog;