/**
 * Created by Administrator on 2016/8/13.
 */

//var ReactDOM=require("react-dom");
//var React=require("react");
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Index=require("./index");
var Page=require("./page");
var PageCanBack=require("./page_can_back");
//var Page=React.createClass({
//    render(){
//        return<div>
//            hi {this.props.params.id}
//        </div>
//    }
//});

//var Index=React.createClass({
//    render(){
//        return<div>
//            this is index
//        </div>
//    }
//});

var App=React.createClass({
   render(){
       return<div>
           {this.props.children}
       </div>
   }
});


//
//ReactDOM.render((
//    <Router  history={hashHistory}>
//        <Route path="/" component={App}>
//            <Route path="about" component={About} />
//            <Route path="inbox" component={Inbox}>
//                <Route path="messages/:id" component={Message} />
//            </Route>
//        </Route>
//    </Router>
//), document.getElementById('test'));

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="page/:id" component={Page}></Route>
            <Route path="blogs" component={PageCanBack}></Route>
        </Route>

    </Router>,
    document.getElementById('blog'));