// const express = require("express");
// const app = express();
// const path = require("path");

// //Routers
// const serverRouter = require("../../routers/server-router");

// //Global variables
// // app.locals.top5_pts = [];
// // app.locals.top5_ast = [];
// // app.locals.top5_reb = [];
// // app.locals.top5_stl = [];
// // app.locals.top5_blk = [];
// // app.locals.top5_3pt = [];

// //Setup middleware
// // app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //Note sure if necessary but included incase

// // app.use((req, res, next) => {
// //   console.log(`${req.method}: ${req.url}`);
// //   if (Object.keys(req.body).length > 0) {
// //     console.log("Body: ");
// //     console.log(req.body);
// //   }
// //   next();
// // });

// //Server Routes
// // app.use("/", serverRouter);
// app.use("/top5", serverRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
