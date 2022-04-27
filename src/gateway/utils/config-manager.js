const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

function setExpressVariables(server) {
    // view engine
    server.set('view engine', 'ejs');
    server.set('views', './src/page-generator/views');// TODO: change when transitioning to microservices

    // trust reverse proxy for express-session 
    // (only when deploying)
    if (isModeProduction()) {
        server.set('trust proxy', 1);
    }
}

function getPort() {
    return process.env.PORT || 3000;
}

function getSessionOptions(data) {
    const options = {
        secret: `${process.env.SESSION_SECRET}`,
        cookie: {
            maxAge: 86400000, // 1 day
            secure: false,
            // httpOnly: true // true by default
        },
        saveUninitialized: false, // 'false' is preferable
        resave: false // 'false' is preferable
    };



    if (isModeProduction()) {
        options.cookie.secure = true;
        options.cookie.sameSite = 'none';

        options.store = new data.pgSession({
            pool : data.pool,                // Connection pool
            tableName : 'session'   // Use another table-name than the default "session" one
            // Insert connect-pg-simple options here
        });
    }

    return options;
}

function getCorsOptions() {
    const options = {
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST'],
        credentials: true
    };

    if (isModeProduction())
        options.origin = ['https://noppytinto-web-playground.netlify.app']

    return options;
}

function isModeProduction() {
    return process.env.NODE_ENV === PRODUCTION;
}

function isModeDevelopment() {
    return process.env.NODE_ENV === DEVELOPMENT;
}

function getDatabaseUrl() {
    return process.env.DATABASE_URL;
}

function getDatabaseOptions() {
    const DATABASE_URL = getDatabaseUrl();
    const options = {
        connectionString: DATABASE_URL,
    }

    if (isModeProduction())
        options.ssl = {rejectUnauthorized: false};

    return options;
}

//
module.exports = {
    getSessionOptions,
    getCorsOptions,
    getPort,
    setExpressVariables,
    isModeProduction,
    isModeDevelopment,
    getDatabaseOptions,
};