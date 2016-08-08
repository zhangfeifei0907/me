/**
 * Created by Administrator on 2016/8/3.
 */
var React=require("react");
var ReactDOM=require("react-dom");
var ReactMarkdown=require("react-markdown");
var Order=require("./sort");
var Loading=require("./loading");


require("./../less/index.less");

let filterArr=[
    {id:"all",name:"全部"},
    {id:"feeling",name:"感悟"},
    {id:"front-end",name:"前端"},
    {id:"book_movie",name:"书&电影"}
    //{id:"works",name:"作品"},
];

var Blog=React.createClass({
    getInitialState(){
        return({
            list:"",
            sourceArticles:null,
            articleOrderByFilter:null,
            filter:"all",
            pageNum:1,
            pageSize:1,
            pageloading:true,
            allLoading:true

        })
    },
    componentDidMount(){
        $.ajax({
            url:"bloglist.txt",
            async:false
        }).done(function(data) {
            console.log( "done" );
            console.log(data);
            let tempArr=data.toString().split('\n');
            if(tempArr[tempArr.length-1]==""){
                tempArr.pop();
            }
            console.log(tempArr);
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
                sourceArticles.push(tempObj)
            }
            let articleOrderByFilter=sourceArticles.sort(Order.by("date"));
            this.setState({
                list:tempArr,
                sourceArticles:sourceArticles,
                articleOrderByFilter:articleOrderByFilter,
                allLoading:false
            });

            this.reload(articleOrderByFilter,this.state.pageNum,this.state.pageSize);

        }.bind(this));
    },
    reload(arrObj,pageNum,pageSize){
        if(arrObj.length<=(pageNum-1)*pageSize){
            return;
        }

        let start,end;
        if(pageNum==1){
            start=0
        }else {
            start=(pageNum-1)*pageSize-1;
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
                    this.state.pageloading=false;
                    this.state.pageNum=pageNum;
                    this.forceUpdate();
                }
            }.bind(this));
        }

    },
    checkLoaded(arrObj,start,end,tagName,value=""){
        let loaded=true;
        for(let i=start;i<end;i++){
            if(arrObj[i][tagName]==value){
                loaded=false;
                break;
            }
        }
        return loaded;

    },
    setFilter(id){
        this.state.filter=id;
        this.forceUpdate();
    },
    testload(){
        console.log("testload");
        this.reload(this.state.articleOrderByFilter,this.state.pageNum+1,this.state.pageSize);
    },
    render(){
        if(this.state.allLoading){
            return<div className="content">
                <div className="blog_title">菲的博客</div>
                <div className="blog_sub_title">Step by step,be the chance I want to be here.</div>
                <Loading> </Loading>
            </div>
        }


        let tags=[];
        for(let i=0;i<this.state.sourceArticles.length;i++){
            if(tags.toString().indexOf(this.state.sourceArticles[i].tag)==-1){
                tags.push(this.state.sourceArticles[i].tag);
            }
        }

        let tagNodes=this.props.filters.map(function(i){
            let active="";
            if(i.id==this.state.filter){
                active="active"
            }
            return<span className={active} key={i.id} onClick={this.setFilter.bind(null,i.id)}>{i.name}</span>
        },this);

        //this.state.sourceArticles.sort(Order.by("date"));
        //console.log(this.state);

        let blogListNode,scrollLoading;
        blogListNode=this.state.articleOrderByFilter.map(function(i){
            if(i.detail!=""){
                return <ReactMarkdown className="article" key={i.id} source={i.detail} />
            }
        },this);
        if(this.state.pageloading){
            scrollLoading=<Loading> </Loading>;
        }

        return<div className="content">
            <div className="blog_title">菲的博客</div>
            <div className="blog_sub_title">Step by step,be the chance I want to be here.</div>
            <div className="tags">
                {tagNodes}
            </div>
            <input type="button" value="pageloading" onClick={this.testload} />
            <hr/>
            <div className="articles">
                {blogListNode}
                {scrollLoading}
            </div>


        </div>
    }
});

ReactDOM.render(<Blog filters={filterArr}/>,document.getElementById('blog'));