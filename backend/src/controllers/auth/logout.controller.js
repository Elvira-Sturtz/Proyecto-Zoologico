const logout = async (req, res) => {
  // res.cookie("token", "", {
  //   expires: new Date(0),
  // });

  // res.clearCookie("token", {
  //   httpOnly: true,
  //   sameSite: "lax",
  // });
  res.clearCookie("token");
  return res.sendStatus(200);
};

module.exports = logout;
