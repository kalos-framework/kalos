import View from '../src/view';

const view = new View({
    source: require('path').join(__dirname)
});

console.log(view.render("Hello <%=name%>", {name: 'pete'}));
view.renderFile('view', {name: 'pete'}, {},(err, data) => {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
