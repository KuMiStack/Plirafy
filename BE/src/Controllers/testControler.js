export const getTestStartup = (req, res) => {
    res.json({message: "Test connection to backend works!!! Daj guze!!"});
};

export const postTestHello = (req,res) => {
    res.json({
        message: "POST received",
        data: req.body,
    })
}