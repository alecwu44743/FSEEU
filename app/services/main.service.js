const home = (req, res) => {
    console.log('[>] [services] Home :)');
    res.send('轟姆，噗呲噗呲，咚噠噠噠');
}

const helloworld = (req, res) => {
    console.log('[>] [services] Hello World :)');
    res.send('Hello World，噗呲噗呲，咚噠噠噠');
}

const mainService = {
    home: home,
    helloworld: helloworld
};

module.exports = mainService;