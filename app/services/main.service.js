const helloworld = (req, res) => {
    res.send('Hello World，噗呲噗呲，咚噠噠噠');
}

const mainService = {
    helloworld: helloworld
};

module.exports = mainService;