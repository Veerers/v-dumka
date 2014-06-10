/*jslint node:true*/
module.exports = {
    mongo: process.env.VDUMKA_MONGO,
    port: process.env.VDUMKA_PORT || process.env.PORT || 3000,
    sessionSecret: process.env.VDUMKA_SESSION_SECRET,
    gh: {
        clientID: process.env.VDUMKA_GITHUB_ID,
        clientSecret: process.env.VDUMKA_GITHUB_SECRET,
        callbackURL: process.env.VDUMKA_GITHUB_CALLBACK
    }
};
