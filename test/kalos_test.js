import Kalos from '../index';


const route = new Kalos.Router({
    notFoundHandler: function (req, res) {
        res.writeHead(404);
        res.end('Route ' + req.url + ' not found.');
    }
});


route.get('/hello', (req, res) => {
    res.send('Hello World');
});

route.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name);
});


const server = new Kalos.Server();

server.view({
    engine: require('ejs'),
    path: 'views',
    ext: '.ejs'
});

server.configRouter(route);
 server.start((ip, port) => {
     console.log('Server started at: ' + ip + ':' + port);
 });

 
 //test render view
var opts = {defaultEngine:'ejs', dir:'views',ext:'.ejs'};
const view = new Kalos.View(opts);

// route.get('/', (req, res) => {
//     var person = {name:'hau',age:'25',add1:'1000N',add2:'4th',city:'FF',state:'IA'};
//     res.render('home', person);
// });    


route.get('/home', (req, res) => {
    var person = {name:'hau',age:'25',add1:'1000N',add2:'4th',city:'FF',state:'IA'};
    res.end(view.render('home', person));    
});    