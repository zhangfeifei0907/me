/**
 * Created by yfhuang on 16/5/18.
 */

/**
 * 加载中样式控件
 * @class loading
 *
 */

var React = require("react");
require("../less/loading.less");
var Loading = React.createClass({
    render:function(){
        return(
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        );
    }
});
module.exports = Loading;