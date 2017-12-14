var Search = (props) => (
  <div className="search-bar form-inline">
    <input onKeyPress={(e) => e.charCode === 13 ? props.handleEnter($('input').val()) : ''} className="form-control" type="text" />
    <button onClick={(e) => props.handleClick($('input').val())} className="btn hidden-sm-down">
      <span className="glyphicon glyphicon-search"></span>
    </button>
  </div> 
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
