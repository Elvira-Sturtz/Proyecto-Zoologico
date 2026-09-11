const logout = async (req, res) => {
    res.cookie("token", "", {
      expires: new Date(0),
    });
  
    return res.sendStatus(200);
  };
  
  module.exports = logout;