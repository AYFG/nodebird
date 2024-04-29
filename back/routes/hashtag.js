const express = require("express");
const { Hashtag, Post, Image, Comment, User } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/:hashtag", async (req, res, next) => {
  //HASHTAG_POSTS  // GET hashtag/노드
  try {
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }; //
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Hashtag,
          // 프론트에서 encodeURIComponent 한 한글 해시태그 ex)'%EB%A6%AC%EC%95%A1%ED%8A%B8'를 decodeURIComponent로 한글로 되돌림
          where: { name: decodeURIComponent(req.params.hashtag) },
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
