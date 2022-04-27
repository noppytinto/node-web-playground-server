// const { v4: uuidv4 } = require('uuid');
// const configManager = require('./utils/config-manager');

function generate(req, res) {
    // const pageUrl = generatePage(req);
    //
    // console.log('PAGE URL GENERATED:', pageUrl);
    // res.json({pageUrl: pageUrl});

    const data = req.body;

    res.render('index' , {
        pageTitle: 'Web Playground - output',
        style: data.cssCode,
        body: data.htmlCode,
        script: data.jsCode,
    });
}

// function generatePage(req, res) {
//     const data = req.body;

//     // set session data
//     console.log('PAYLOAD:', data);
//     req.session.htmlCode = data.htmlCode;
//     req.session.cssCode = data.cssCode;
//     req.session.jsCode = data.jsCode;
//     console.log('GENERATE PAGE FOR SESSION ID:', req.sessionID);

//     // build url
//     // const pageUrl = generatePageUrl(req);
//     //
//     // return pageUrl;

//     res.render('index' , {
//         pageTitle: 'Web Playground - output',
//         style: req.session.cssCode,
//         body: req.session.htmlCode,
//         script: req.session.jsCode,
//     });
// }

// function request(req, res) {
//     console.log('REQUEST PAGE FOR SESSION ID:', req.sessionID);
//     // console.log('css', req.session.cssCode);
//     // console.log('html', req.session.htmlCode);
//     // console.log('js', req.session.jsCode);

//     res.render('index' , {
//         pageTitle: 'Web Playground - output',
//         style: req.session.cssCode,
//         body: req.session.htmlCode,
//         script: req.session.jsCode,
//     });
// }

// function generatePageUrl(req) {
//     // const pageId = uuidv4();
//     // req.session.pageId = pageId;
//     // console.log('PAGE ID:', req.session.pageId);

//     let pageUrl;
//     if (configManager.isModeProduction()) {
//         pageUrl = 'https://noppytinto-web-playground.herokuapp.com/page/request';// TEST url
//     }
//     else if (configManager.isModeDevelopment()) {
//         // const pageUrl = 'http://localhost:3000/page/request?id=' + pageId;
//         pageUrl = 'http://localhost:3000/page/request';// TEST url
//     }
//     // console.log('PAGE URL', pageUrl);

//     return pageUrl;
// }


//
module.exports = {
    generate,
};