const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    isHome: true,
    title: "Home. Sweet Home... :)",
  });
});

module.exports = router;
