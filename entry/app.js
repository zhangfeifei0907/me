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


var Page=require("./page");

var App=require("./index");


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}></Route>
        <Route path="/page" component={Page}></Route>
    </Router>,
    document.getElementById('blog'));