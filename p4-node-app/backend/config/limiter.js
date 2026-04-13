import rateLimit from "express-rate-limit";

const limiterConfig = rateLimit({
  windowMs: 1000 * 60 * 15, // 15 minutes
  max: 100,
  messsage: "Too many requests from this IP, please try again later!",
});

export default limiterConfig;
