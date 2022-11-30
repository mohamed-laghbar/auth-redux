/* A library that allows us to test our endpoints */
const request = require("supertest");
const app = require("../server");


describe("POST /login", () => {
  describe("given a email and a password", () => {
    test("should respond with success message : you are logged in", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "simoghbaar@gmail.com",
        password: "123456",
      });
      expect(res.statusCode).toBe(200);
    });
  });


  describe("given a email and a password", () => {
    test("should respond with err message : wrong password or email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "simoghbaar@gmail.com",
        password: "234",
      });
      expect(res.statusCode).toBe(403);
    });
  });



  describe("given a email and a password", () => {
    test("should respond with err message : Verify your account", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "mama@gmail.com",
        password: "123456",
      });
      expect(res.statusCode).toBe(401);
    });
  });

  describe("given a empty email and a password feilds", () => {
    test("should respond with err message : User name or password feilds are empty", async () => {
      const res = await request(app).post("/api/auth/login").send({
    
      });
      expect(res.body.email).toBeUndefined();
    });
  });
});





// describe("POST /register", () => {
//   describe("given a email and a password", () => {
//     test("should respond with success message : you are logged in", async () => {
//       const res = await request(app).post("/api/auth/login").send({
//         email: "simoghbaar@gmail.com",
//         password: "123456",
//       });
//       expect(res.statusCode).toBe(200);
//     });
//   });


//   describe("given a email and a password", () => {
//     test("should respond with err message : wrong password or email", async () => {
//       const res = await request(app).post("/api/auth/login").send({
//         email: "simoghbaar@gmail.com",
//         password: "234",
//       });
//       expect(res.statusCode).toBe(403);
//     });
//   });



//   describe("given a email and a password", () => {
//     test("should respond with err message : Verify your account", async () => {
//       const res = await request(app).post("/api/auth/login").send({
//         email: "mama@gmail.com",
//         password: "123456",
//       });
//       expect(res.statusCode).toBe(401);
//     });
//   });
// });
