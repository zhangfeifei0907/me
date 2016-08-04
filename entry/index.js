/**
 * Created by Administrator on 2016/8/3.
 */
var React=require("react");
var ReactDOM=require("react-dom");

var Blog=React.createClass({
    getInitialState(){
        return({
            list:""
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
                let tempObj={id:tempArr[i],tag:temp[2],name:temp[3]};
                sourceArticles.push(tempObj)
            }
            console.log(sourceArticles);

            this.setState({
                list:tempArr,
                sourceArticles:sourceArticles
            });
        }.bind(this));
    },
    render(){
        if(this.state.list==""){
            return<div>
                <h1>Faye's Blog</h1>
            </div>
        }
        let tags=[];
        for(let i=0;i<this.state.sourceArticles.length;i++){
            if(tags.toString().indexOf(this.state.sourceArticles[i].tag)==-1){
                tags.push(this.state.sourceArticles[i].tag);
            }
        }

        let tagNodes=tags.map(function(i){
            return<div key={i}>{i}</div>
        });


        return<div>
            <h1>Faye's Blog</h1>
            {tagNodes}
        </div>
    }
});

ReactDOM.render(<Blog />,document.getElementById('blog'));