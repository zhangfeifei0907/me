/**
 * Created by feifei on 16/9/28.
 */
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;


const App = React.createClass({
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
});

const About = React.createClass({
    render() {
        return <h3>About</h3>
    }
});

const Inbox = React.createClass({
    render() {
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children}
            </div>
        )
    }
});

const Message = React.createClass({
    render() {
        return <h3>Message {this.props.params.id}</h3>
    }
});

ReactDOM.render((
    <Router  history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={About}/>

            <Route path="inbox" component={Inbox}>
                <Route path="messages/:id" component={Message} />
            </Route>
        </Route>
    </Router>
), document.getElementById('test'));