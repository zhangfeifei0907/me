/**
 * Created by Administrator on 2016/8/3.
 */
//var React=require("react");
var ReactMarkdown=require("react-markdown");
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;

var Nav=require("./config").Nav;

var Order=require("./sort");
var Loading=require("./loading");

require("./../less/index.less");



var Blog=React.createClass({
    getInitialState(){

        let filter=Nav[0].id;
        if(this.props.location.query.filter){
            filter=this.props.location.query.filter;
        }
        return({
            list:"",//总的文件列表
            // sourceArticles:null,
            articleOrderByFilter:null,
            filter:filter,

            pageNum:1,
            pageSize:5,
            pageloading:true,
            allLoading:true
        })
    },
    componentDidMount(){
        //console.log("blog componentDidMount");
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
            if($("#content").length>0){
                this.scrollLoading();
            }

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

        let orderedArticleOrderByFilter=articleOrderByFilter.sort(Order.by("date"));


        if(orderedArticleOrderByFilter.length<=0){
            this.setState({
                articleOrderByFilter:orderedArticleOrderByFilter,
                allLoading:false
            });
            //console.log(this.state);

        }else {
            this.setState({
                articleOrderByFilter:orderedArticleOrderByFilter
            });
            this.reload(orderedArticleOrderByFilter,pageNum);
        }

    },
    componentWillReceiveProps(nextProps){
        //console.log(nextProps);
        if(nextProps.location.query.filter!=this.state.filter){
            this.setState({
                filter:nextProps.location.query.filter,
                allLoading:true
            });
            this.loadingArticles(this.state.list,nextProps.location.query.filter);

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
            if( 0>=sHeight-containerHeight ){
                this.setState({pageloading:true});

                this.reload(
                    this.state.articleOrderByFilter,
                    this.state.pageNum+1
                );

                //console.log("滚动条到底部了");
            }


    },
    render(){
        let tagNodes=Nav.map(function(i){
            let active="";
            if(i.id==this.state.filter){
                active="active"
            }
            return<span className={active} key={i.id} onClick={this.selectFilterHandle.bind(null,i.id)}>{i.name}</span>
        },this);
        //console.log(this.state);
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



        let blogListNode,scrollLoading;
        if(this.state.articleOrderByFilter.length<=0){
            blogListNode=<div className="none_article">暂无文章</div>
        }else {
            blogListNode=this.state.articleOrderByFilter.map(function(i){
                if(i.detail!=""){
                     //console.log(i);
                    let datestr= i.date.substring(0,4)+"年"+parseInt(i.date.substring(4,6))+"月"+parseInt(i.date.substring(6,8))+"日"

                    return<div key={i.id} className="article_box">
                        <Link to={"/page/"+i.date} >
                            <div className="article_title">{i.title}</div>
                        </Link>

                        <div className="article_date">{datestr}</div>
                        <ReactMarkdown className="article_content" source={i.detail} />
                        <Link to={"/page/"+i.date} >
                            <span className="detail_button">阅读全文</span>
                        </Link>
                    </div>
                }
            },this);
        }


        if(this.state.pageloading){
            scrollLoading=<Loading> </Loading>;
        }

        return<div className="content" id="content">
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