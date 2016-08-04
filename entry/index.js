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
            this.setState({list:tempArr});
        }.bind(this));
    },
    render(){
        if(this.state.list==""){
            return<div>
                <h1>Faye's Blog</h1>
            </div>
        }

        return<div>
            <h1>Faye's Blog</h1>
            testddd
        </div>
    }
});

ReactDOM.render(<Blog />,document.getElementById('blog'));